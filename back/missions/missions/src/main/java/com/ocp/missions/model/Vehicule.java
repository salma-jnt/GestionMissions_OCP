package com.ocp.missions.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private boolean actif;       // indique si le véhicule est disponible

    // 🔗 Relation : un véhicule peut avoir plusieurs missions
    @OneToMany(mappedBy = "vehicule")
    @JsonIgnore
    private List<Mission> missions;

    @Transient
    private String disponibilite;
}
