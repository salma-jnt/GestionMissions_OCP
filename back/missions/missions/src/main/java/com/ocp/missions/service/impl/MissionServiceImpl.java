package com.ocp.missions.service.impl;

import java.beans.PropertyDescriptor;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ocp.missions.model.Mission;
import com.ocp.missions.model.Collaborateur;
import com.ocp.missions.model.Vehicule;
import com.ocp.missions.repository.MissionRepository;
import com.ocp.missions.repository.CollaborateurRepository;
import com.ocp.missions.repository.VehiculeRepository;
import com.ocp.missions.service.MissionService;

@Service
public class MissionServiceImpl implements MissionService {

    private final MissionRepository missionRepo;
    private final CollaborateurRepository collaborateurRepo;
    private final VehiculeRepository vehiculeRepo;

    public MissionServiceImpl(MissionRepository missionRepo,
            CollaborateurRepository collaborateurRepo,
            VehiculeRepository vehiculeRepo) {
        this.missionRepo = missionRepo;
        this.collaborateurRepo = collaborateurRepo;
        this.vehiculeRepo = vehiculeRepo;
    }

    @Override
    public List<Mission> getAll() {
        return missionRepo.findAll();
    }

    @Override
    public Mission getById(Long id) {
        return missionRepo.findById(id).orElseThrow(() -> new RuntimeException("Mission non trouvée"));
    }

    @Override
    public Mission save(Mission mission) {
        return missionRepo.save(mission);
    }

    @Override
    public Mission update(Long id, Mission mission) {
        Mission current = getById(id);

        // Champs à ne jamais écraser automatiquement
        String[] alwaysIgnore = {
            "id", "createdAt", "updatedAt",
            "collaborateur", "vehicule" // relations gérées par endpoint dédié
        };

        // On ignore aussi les champs null du payload (pour ne pas écraser par null)
        String[] nulls = getNullPropertyNames(mission);
        String[] ignore = merge(alwaysIgnore, nulls);

        // Copie “best effort” : ne lira que les getters réellement présents
        // et ne plantera pas si certains champs n’existent pas.
        BeanUtils.copyProperties(mission, current, ignore);

        return missionRepo.save(current);
    }

    @Override
    public void delete(Long id) {
        missionRepo.deleteById(id);
    }

    @Override
    @Transactional
    public Mission affecterCollaborateurVehicule(Long missionId, Long collaborateurId, Long vehiculeId) {
        Mission mission = missionRepo.findById(missionId)
                .orElseThrow(() -> new RuntimeException("Mission non trouvée"));

        Collaborateur collaborateur = (collaborateurId == null)
                ? null
                : collaborateurRepo.findById(collaborateurId)
                        .orElseThrow(() -> new RuntimeException("Collaborateur non trouvé"));

        Vehicule vehicule = (vehiculeId == null)
                ? null
                : vehiculeRepo.findById(vehiculeId)
                        .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));

        mission.setCollaborateur(collaborateur);
        mission.setVehicule(vehicule);

        return missionRepo.save(mission);
    }

    // ---------- helpers ----------
    private static String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (PropertyDescriptor pd : pds) {
            String name = pd.getName();
            // ignore "class"
            if ("class".equals(name)) {
                continue;
            }
            Object srcValue = src.getPropertyValue(name);
            if (srcValue == null) {
                emptyNames.add(name);
            }
        }
        return emptyNames.toArray(new String[0]);
    }

    private static String[] merge(String[] a, String[] b) {
        String[] r = new String[a.length + b.length];
        System.arraycopy(a, 0, r, 0, a.length);
        System.arraycopy(b, 0, r, a.length, b.length);
        return r;
    }
}
