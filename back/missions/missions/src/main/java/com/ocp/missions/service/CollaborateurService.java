package com.ocp.missions.service;

import java.util.List;

import com.ocp.missions.model.Collaborateur;

public interface CollaborateurService {

    List<Collaborateur> getAll();

    Collaborateur getById(Long id);

    Collaborateur save(Collaborateur collaborateur);

    Collaborateur update(Long id, Collaborateur collaborateur);

    void delete(Long id);
}
