package com.ocp.missions.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // COLLABORATEUR ou RESPONSABLE

    // ✅ Lien optionnel avec un collaborateur
    @OneToOne
    @JoinColumn(name = "collaborateur_id", referencedColumnName = "id", nullable = true)
    private Collaborateur collaborateur;
}
