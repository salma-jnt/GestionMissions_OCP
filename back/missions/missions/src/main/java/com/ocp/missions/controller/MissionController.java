package com.ocp.missions.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.missions.model.Collaborateur;
import com.ocp.missions.model.Mission;
import com.ocp.missions.model.Vehicule;
import com.ocp.missions.repository.CollaborateurRepository;
import com.ocp.missions.repository.MissionRepository;
import com.ocp.missions.repository.VehiculeRepository;

@RestController
@RequestMapping("/api/missions")
@CrossOrigin(origins = "http://localhost:5173")
public class MissionController {

    private final MissionRepository missionRepository;
    private final VehiculeRepository vehiculeRepository;
    private final CollaborateurRepository collaborateurRepository;

    public MissionController(MissionRepository missionRepository, VehiculeRepository vehiculeRepository,
            CollaborateurRepository collaborateurRepository) {
        this.missionRepository = missionRepository;
        this.vehiculeRepository = vehiculeRepository;
        this.collaborateurRepository = collaborateurRepository;
    }

    // 📋 Liste des missions filtrée selon le rôle
    @GetMapping
    public ResponseEntity<?> getMissionsPourUtilisateurConnecte() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();

            Collaborateur collaborateur = collaborateurRepository.findByEmail(email).orElse(null);

            if (collaborateur == null) {
                return ResponseEntity.status(403).body("Collaborateur non trouvé pour l'email : " + email);
            }

            if ("RESPONSABLE".equalsIgnoreCase(collaborateur.getRole())) {
                return ResponseEntity.ok(missionRepository.findAll());
            } else {
                return ResponseEntity.ok(missionRepository.findByCollaborateur(collaborateur));
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur serveur : " + e.getMessage());
        }
    }

    // 🔍 Récupérer une mission par ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getMissionById(@PathVariable Long id) {
        try {
            return missionRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur lors de la récupération de la mission : " + e.getMessage());
        }
    }

    // ➕ Création d’une nouvelle mission avec vérification de disponibilité du véhicule
    @PostMapping
    public ResponseEntity<?> createMission(@RequestBody Mission mission) {
        try {
            if (mission.getVehicule() != null) {
                Vehicule vehicule = vehiculeRepository.findById(mission.getVehicule().getId())
                        .orElseThrow(() -> new RuntimeException("Véhicule introuvable"));

                List<Mission> missionsVehicule = missionRepository.findByVehiculeId(vehicule.getId());
                for (Mission m : missionsVehicule) {
                    if ("En cours".equalsIgnoreCase(m.getStatut())) {
                        return ResponseEntity.badRequest().body("❌ Ce véhicule est actuellement en mission !");
                    }
                    if ("À venir".equalsIgnoreCase(m.getStatut())
                            && m.getDateDebut() != null
                            && m.getDateDebut().equals(mission.getDateDebut())) {
                        return ResponseEntity.badRequest().body("⚠️ Ce véhicule est déjà réservé pour cette date !");
                    }
                }
            }

            Mission saved = missionRepository.save(mission);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur lors de la création de la mission : " + e.getMessage());
        }
    }

    // ✏️ Mise à jour d’une mission
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMission(@PathVariable Long id, @RequestBody Mission updatedMission) {
        try {
            return missionRepository.findById(id)
                    .map(mission -> {
                        mission.setTitre(updatedMission.getTitre());
                        mission.setDescription(updatedMission.getDescription());
                        mission.setLieu(updatedMission.getLieu());
                        mission.setStatut(updatedMission.getStatut());
                        mission.setDateDebut(updatedMission.getDateDebut());
                        mission.setDateFin(updatedMission.getDateFin());
                        mission.setVehicule(updatedMission.getVehicule());
                        mission.setCollaborateur(updatedMission.getCollaborateur());
                        missionRepository.save(mission);
                        return ResponseEntity.ok(mission);
                    })
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur lors de la mise à jour : " + e.getMessage());
        }
    }

    // 🗑️ Suppression d’une mission
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMission(@PathVariable Long id) {
        try {
            if (!missionRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            missionRepository.deleteById(id);
            return ResponseEntity.ok("Mission supprimée avec succès.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur lors de la suppression : " + e.getMessage());
        }
    }
}
