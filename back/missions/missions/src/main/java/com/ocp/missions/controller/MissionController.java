package com.ocp.missions.controller;

import com.ocp.missions.model.Mission;
import com.ocp.missions.service.MissionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
