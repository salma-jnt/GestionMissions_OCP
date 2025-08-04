package com.ocp.missions.service.impl;

import com.ocp.missions.model.Collaborateur;
import com.ocp.missions.repository.CollaborateurRepository;
import com.ocp.missions.service.CollaborateurService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollaborateurServiceImpl implements CollaborateurService {

    private final CollaborateurRepository repo;

    public CollaborateurServiceImpl(CollaborateurRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Collaborateur> getAll() {
        return repo.findAll();
    }

    @Override
    public Collaborateur getById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    @Override
    public Collaborateur save(Collaborateur c) {
        return repo.save(c);
    }

    @Override
    public Collaborateur update(Long id, Collaborateur c) {
        Collaborateur existing = repo.findById(id).orElseThrow();
        existing.setNom(c.getNom());
        existing.setPrenom(c.getPrenom());
        existing.setEmail(c.getEmail());
        existing.setRole(c.getRole());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
