package com.ocp.missions.service.impl;

import java.beans.PropertyDescriptor;
import java.util.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ocp.missions.model.*;
import com.ocp.missions.repository.*;
import com.ocp.missions.service.MissionService;

@Service
public class MissionServiceImpl implements MissionService {

    private final MissionRepository missionRepo;
    private final CollaborateurRepository collaborateurRepo;
    private final VehiculeRepository vehiculeRepo;
    private final UserRepository userRepo;

    public MissionServiceImpl(
            MissionRepository missionRepo,
            CollaborateurRepository collaborateurRepo,
            VehiculeRepository vehiculeRepo,
            UserRepository userRepo) {
        this.missionRepo = missionRepo;
        this.collaborateurRepo = collaborateurRepo;
        this.vehiculeRepo = vehiculeRepo;
        this.userRepo = userRepo;
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
        String[] alwaysIgnore = {"id", "createdAt", "updatedAt", "collaborateur", "vehicule"};
        String[] nulls = getNullPropertyNames(mission);
        String[] ignore = merge(alwaysIgnore, nulls);
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

        Collaborateur collaborateur = (collaborateurId == null) ? null
                : collaborateurRepo.findById(collaborateurId)
                        .orElseThrow(() -> new RuntimeException("Collaborateur non trouvé"));

        Vehicule vehicule = (vehiculeId == null) ? null
                : vehiculeRepo.findById(vehiculeId)
                        .orElseThrow(() -> new RuntimeException("Véhicule non trouvé"));

        mission.setCollaborateur(collaborateur);
        mission.setVehicule(vehicule);

        return missionRepo.save(mission);
    }

    // ✅ Nouvelle méthode pour filtrer selon le rôle
    @Override
    public List<Mission> getMissionsByUserEmail(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (user.getRole() == Role.RESPONSABLE) {
            // Un responsable voit toutes les missions
            return missionRepo.findAll();
        } else if (user.getRole() == Role.COLLABORATEUR) {
            // Un collaborateur voit seulement ses missions
            if (user.getCollaborateur() == null) {
                throw new RuntimeException("Aucun collaborateur associé à cet utilisateur");
            }
            return missionRepo.findByCollaborateur(user.getCollaborateur());
        }

        throw new RuntimeException("Rôle inconnu : " + user.getRole());
    }

    // ---------- helpers ----------
    private static String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (PropertyDescriptor pd : pds) {
            String name = pd.getName();
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
