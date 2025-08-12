package com.ocp.missions.service;

import java.util.List;

import com.ocp.missions.dto.AffectationDTO;
import com.ocp.missions.model.Affectation;

public interface AffectationService {

    Affectation affecterMission(Long missionId, Long collaborateurId, Long vehiculeId);

    List<AffectationDTO> getAllAffectations();

}
