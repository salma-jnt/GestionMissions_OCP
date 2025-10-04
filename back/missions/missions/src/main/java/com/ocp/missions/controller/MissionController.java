package com.ocp.missions.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ocp.missions.dto.AffectationDTO;
import com.ocp.missions.model.Mission;
import com.ocp.missions.service.MissionService;

@RestController
@RequestMapping("/api/missions")
public class MissionController {

    private final MissionService service;

    public MissionController(MissionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Mission> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Mission getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Mission create(@RequestBody Mission mission) {
        return service.save(mission);
    }

    @PutMapping("/{id}")
    public Mission update(@PathVariable Long id, @RequestBody Mission mission) {
        return service.update(id, mission);
    }

    // ✅ Nouveau endpoint d'affectation
    @PutMapping("/{id}/affectation")
    public Mission affecterCollaborateurVehicule(@PathVariable Long id, @RequestBody AffectationDTO dto) {
        return service.affecterCollaborateurVehicule(id, dto.getCollaborateurId(), dto.getVehiculeId());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
