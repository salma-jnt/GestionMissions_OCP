package com.ocp.missions.service;

import com.ocp.missions.model.Mission;
import com.ocp.missions.model.Vehicule;
import com.ocp.missions.repository.VehiculeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class VehiculeService {

    private final VehiculeRepository vehiculeRepository;

    public VehiculeService(VehiculeRepository vehiculeRepository) {
        this.vehiculeRepository = vehiculeRepository;
    }

    public List<Vehicule> getAllWithDisponibilite() {
        List<Vehicule> vehicules = vehiculeRepository.findAll();
        LocalDate today = LocalDate.now();

        for (Vehicule v : vehicules) {
            String disponibilite = "Disponible";

            if (v.getMissions() != null) {
                for (Mission m : v.getMissions()) {
                    if ("En cours".equalsIgnoreCase(m.getStatut())) {
                        disponibilite = "Occupé";
                        break;
                    }

                    if ("À venir".equalsIgnoreCase(m.getStatut())
                            && m.getDateDebut() != null
                            && m.getDateDebut().equals(today)) {
                        disponibilite = "Réservé aujourd’hui";
                        break;
                    }
                }
            }

            // Utilisation du champ 'actif' pour stocker l'état dispo simple
            v.setDisponibilite(disponibilite);

        }

        return vehicules;
    }
}
