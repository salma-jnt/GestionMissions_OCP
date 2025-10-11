package com.ocp.missions.controller;

import com.ocp.missions.dto.AffectationDTO;
import com.ocp.missions.service.AffectationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/affectations")
@CrossOrigin(origins = "http://localhost:5173") // pour autoriser le frontend
public class AffectationController {

    private final AffectationService affectationService;

    public AffectationController(AffectationService affectationService) {
        this.affectationService = affectationService;
    }

    @GetMapping
    public List<AffectationDTO> getAllAffectations() {
        return affectationService.getAllAffectations();
    }

    @PostMapping
    public void createAffectation(@RequestBody AffectationDTO dto) {
        affectationService.affecterMission(dto.getMissionId(), dto.getCollaborateurId(), dto.getVehiculeId());
    }
}
