package com.ocp.missions.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.missions.model.Collaborateur;

public interface CollaborateurRepository extends JpaRepository<Collaborateur, Long> {

    Optional<Collaborateur> findByEmail(String email); // ✅ pour trouver un collaborateur par email
}
