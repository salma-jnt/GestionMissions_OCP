package com.ocp.missions.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.missions.model.Mission;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    // Si tu gardes dateDebut en String, préfère createdAt pour un vrai tri chronologique
    Page<Mission> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
