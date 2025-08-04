package com.ocp.missions.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String matricule;    // ex : 1234-A-75
    private String type;         // ex : Camion, Voiture, Bus...
    private String marque;       // ex : Renault, Dacia...
    private boolean actif;       // pour indiquer si disponible
}
