package com.ocp.missions.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.missions.model.Mission;
import com.ocp.missions.service.MissionService;

@RestController
@RequestMapping("/api/missions")
@CrossOrigin(origins = "http://localhost:5173")
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

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
