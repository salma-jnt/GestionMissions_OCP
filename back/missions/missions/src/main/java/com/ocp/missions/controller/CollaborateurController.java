package com.ocp.missions.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.missions.model.Collaborateur;
import com.ocp.missions.service.CollaborateurService;

@RestController
@RequestMapping("/api/collaborateurs")
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
