package com.ocp.missions.repository;

import com.ocp.missions.model.Affectation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AffectationRepository extends JpaRepository<Affectation, Long> {

    List<Affectation> findByCollaborateurId(Long collaborateurId);

    List<Affectation> findByMissionId(Long missionId);
}
