package com.ocp.missions.controller;

import java.util.List;

import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.ocp.missions.model.Mission;
import com.ocp.missions.service.MissionService;

@RestController
@RequestMapping("/api/missions")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // adapte si ton front tourne sur 5173
public class MissionController {

    private final MissionService missionService;

    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    // ✅ Récupération des missions selon le rôle
    @GetMapping
    public ResponseEntity<?> getAllMissions() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName(); // email du user connecté

            List<Mission> missions = missionService.getMissionsByUserEmail(email);

            // Nettoyage des infos sensibles
            missions.forEach(this::secureMissionJson);

            return ResponseEntity.ok(missions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // ✅ Mission par ID
    @GetMapping("/{id}")
    public ResponseEntity<Mission> getMissionById(@PathVariable Long id) {
        return ResponseEntity.ok(missionService.getById(id));
    }

    // ✅ Création d'une mission (réservé aux responsables)
    @PostMapping
    public ResponseEntity<?> createMission(@RequestBody Mission mission) {
        try {
            Mission saved = missionService.save(mission);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ✅ Mise à jour
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMission(@PathVariable Long id, @RequestBody Mission mission) {
        try {
            Mission updated = missionService.update(id, mission);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ✅ Suppression
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMission(@PathVariable Long id) {
        try {
            missionService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ✅ Affecter collaborateur et véhicule à une mission
    @PutMapping("/{missionId}/affecter")
    public ResponseEntity<?> affecterCollaborateurVehicule(
            @PathVariable Long missionId,
            @RequestParam(required = false) Long collaborateurId,
            @RequestParam(required = false) Long vehiculeId) {
        try {
            Mission updated = missionService.affecterCollaborateurVehicule(missionId, collaborateurId, vehiculeId);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 🔒 Retirer infos sensibles
    private void secureMissionJson(Mission mission) {
        if (mission.getCollaborateur() != null && mission.getCollaborateur().getUser() != null) {
            mission.getCollaborateur().getUser().setPassword(null);
        }
    }
}
