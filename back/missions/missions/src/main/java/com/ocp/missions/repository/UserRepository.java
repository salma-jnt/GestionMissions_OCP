package com.ocp.missions.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ocp.missions.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    // 🔹 Méthode pour rechercher un utilisateur par email
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
