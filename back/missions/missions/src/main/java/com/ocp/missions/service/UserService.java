package com.ocp.missions.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ocp.missions.model.User;
import com.ocp.missions.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 🔹 Recherche par email
        User user = repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email : " + email));

        // 🔹 Retourne un UserDetails Spring Security
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail()) // email devient le username pour Spring Security
                .password(user.getPassword())
                .roles(user.getRole().name()) // rôle de l'utilisateur
                .build();
    }
}
