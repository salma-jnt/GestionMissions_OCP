package com.ocp.missions.controller;

import com.ocp.missions.model.Collaborateur;
import com.ocp.missions.service.CollaborateurService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/collaborateurs")
@CrossOrigin(origins = "http://localhost:5173")
public class CollaborateurController {

    private final CollaborateurService service;

    public CollaborateurController(CollaborateurService service) {
        this.service = service;
    }

    @GetMapping
    public List<Collaborateur> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Collaborateur getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Collaborateur create(@RequestBody Collaborateur c) {
        return service.save(c);
    }

    @PutMapping("/{id}")
    public Collaborateur update(@PathVariable Long id, @RequestBody Collaborateur c) {
        return service.update(id, c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
