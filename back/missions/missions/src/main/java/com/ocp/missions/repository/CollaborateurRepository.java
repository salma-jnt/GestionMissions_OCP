package com.ocp.missions.repository;

import com.ocp.missions.model.Collaborateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollaborateurRepository extends JpaRepository<Collaborateur, Long> {
}
