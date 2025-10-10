package com.ocp.missions.controller;

import com.ocp.missions.model.Mission;
import com.ocp.missions.model.Vehicule;
import com.ocp.missions.repository.MissionRepository;
import com.ocp.missions.repository.VehiculeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
@CrossOrigin(origins = "http://localhost:5173")
public class MissionController {

    private final MissionRepository missionRepository;
    private final VehiculeRepository vehiculeRepository;

    public MissionController(MissionRepository missionRepository, VehiculeRepository vehiculeRepository) {
        this.missionRepository = missionRepository;
        this.vehiculeRepository = vehiculeRepository;
    }

    // 📋 Liste de toutes les missions
    @GetMapping
    public List<Mission> getAllMissions() {
        return missionRepository.findAll();
    }

    // 🔍 Récupérer une mission par ID
    @GetMapping("/{id}")
    public ResponseEntity<Mission> getMissionById(@PathVariable Long id) {
        Mission mission = missionRepository.findById(id).orElse(null);
        if (mission == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mission);
    }

    // ➕ Création d’une nouvelle mission avec vérification de disponibilité du véhicule
    @PostMapping
    public ResponseEntity<?> createMission(@RequestBody Mission mission) {
        try {
            // ✅ Vérifier si un véhicule est associé
            if (mission.getVehicule() != null) {
                Vehicule vehicule = vehiculeRepository.findById(mission.getVehicule().getId())
                        .orElseThrow(() -> new RuntimeException("Véhicule introuvable"));

                // 🔍 Vérifier si le véhicule est déjà occupé
                List<Mission> missionsVehicule = missionRepository.findByVehiculeId(vehicule.getId());

                for (Mission m : missionsVehicule) {
                    // Cas 1 : mission en cours
                    if ("En cours".equalsIgnoreCase(m.getStatut())) {
                        return ResponseEntity.badRequest()
                                .body("❌ Ce véhicule est actuellement en mission !");
                    }

                    // Cas 2 : mission à venir le même jour
                    if ("À venir".equalsIgnoreCase(m.getStatut())
                            && m.getDateDebut() != null
                            && m.getDateDebut().equals(mission.getDateDebut())) {
                        return ResponseEntity.badRequest()
                                .body("⚠️ Ce véhicule est déjà réservé pour cette date !");
                    }
                }
            }

            // ✅ Enregistrer la mission si tout est bon
            Mission saved = missionRepository.save(mission);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur : " + e.getMessage());
        }
    }

    // ✏️ Mise à jour d’une mission
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMission(@PathVariable Long id, @RequestBody Mission updatedMission) {
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
    }

    // 🗑️ Suppression d’une mission
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMission(@PathVariable Long id) {
        if (!missionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        missionRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
