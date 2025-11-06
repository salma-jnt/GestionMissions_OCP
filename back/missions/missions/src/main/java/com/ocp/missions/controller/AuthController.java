package com.ocp.missions.controller;

import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.missions.model.User;
import com.ocp.missions.repository.UserRepository;
import com.ocp.missions.service.JwtService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authManager, UserRepository userRepo,
            PasswordEncoder encoder, JwtService jwtService) {
        this.authManager = authManager;
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    // ➕ Inscription par email
    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        // 🔹 Vérifier si email déjà utilisé
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("❌ Email déjà utilisé !");
        }

        // 🔹 Encoder le mot de passe
        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);

        // 🔹 Générer token JWT basé sur l’email
        String token = jwtService.generateToken(user.getEmail());
        return Map.of("token", token, "role", user.getRole().name());
    }

    // 🔑 Connexion par email
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User creds) {
        // Authentification via email + mot de passe
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getPassword())
        );

        // Récupérer l’utilisateur par email
        User user = userRepo.findByEmail(creds.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé !"));

        String token = jwtService.generateToken(user.getEmail());
        return Map.of("token", token, "role", user.getRole().name());
    }
}
