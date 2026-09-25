package com.ocp.missions.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.missions.model.Mission;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    // ⚠️ Surcharge de findAll() avec EntityGraph pour charger collaborateur & vehicule
    @Override
    @EntityGraph(attributePaths = {"collaborateur", "vehicule"})
    List<Mission> findAll();

    // Liste paginée triée par createdAt DESC + relations chargées
    @EntityGraph(attributePaths = {"collaborateur", "vehicule"})
    Page<Mission> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
