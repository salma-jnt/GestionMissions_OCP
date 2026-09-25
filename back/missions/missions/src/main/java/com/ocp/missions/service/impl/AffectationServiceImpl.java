package com.ocp.missions.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ocp.missions.dto.AffectationDTO;
import com.ocp.missions.model.Affectation;
import com.ocp.missions.model.Collaborateur;
import com.ocp.missions.model.Mission;
import com.ocp.missions.model.Vehicule;
import com.ocp.missions.repository.AffectationRepository;
import com.ocp.missions.repository.CollaborateurRepository;
import com.ocp.missions.repository.MissionRepository;
import com.ocp.missions.repository.VehiculeRepository;
import com.ocp.missions.service.AffectationService;

@Service
public class AffectationServiceImpl implements AffectationService {

    private final AffectationRepository affectationRepository;
    private final MissionRepository missionRepo;
    private final CollaborateurRepository collaborateurRepo;
    private final VehiculeRepository vehiculeRepo;

    public AffectationServiceImpl(AffectationRepository affectationRepository,
            MissionRepository missionRepo,
            CollaborateurRepository collaborateurRepo,
            VehiculeRepository vehiculeRepo) {
        this.affectationRepository = affectationRepository;
        this.missionRepo = missionRepo;
        this.collaborateurRepo = collaborateurRepo;
        this.vehiculeRepo = vehiculeRepo;
    }

    @Override
    public Affectation affecterMission(Long missionId, Long collaborateurId, Long vehiculeId) {
        Mission mission = missionRepo.findById(missionId).orElseThrow();
        Collaborateur collaborateur = collaborateurRepo.findById(collaborateurId).orElseThrow();
        Vehicule vehicule = vehiculeRepo.findById(vehiculeId).orElseThrow();

        Affectation affectation = new Affectation();
        affectation.setMission(mission);
        affectation.setCollaborateur(collaborateur);
        affectation.setVehicule(vehicule);
        affectation.setDateAffectation(LocalDate.now());

        return affectationRepository.save(affectation);
    }

    @Override
    public List<AffectationDTO> getAllAffectations() {
        return affectationRepository.findAll().stream()
                .map(aff -> new AffectationDTO(
                aff.getMission().getId(),
                null, aff.getCollaborateur().getId(),
                null, aff.getVehicule().getId(), null
        ))
                .collect(Collectors.toList());
    }

}
