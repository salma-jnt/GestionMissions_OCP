package com.ocp.missions.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Collaborateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private String departement; // Exemple : "Maintenance Industrielle"
    private String service;     // Exemple : "Mécanique lourde"
    private String poste;
    private String role;        // Exemple : "Technicien de maintenance"

    // 🔹 Relation avec les missions
    @OneToMany(mappedBy = "collaborateur", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore // évite les boucles Mission → Collaborateur → Mission
    private List<Mission> missions;

    // 🔹 Lien bidirectionnel avec User
    @OneToOne(mappedBy = "collaborateur")
    @JsonIgnore
    private User user;
}
