package com.ocp.missions.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.ocp.missions.model.User;
import com.ocp.missions.service.JwtService;
import com.ocp.missions.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;

    // 🔐 Connexion
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String password = request.get("password");

            // Authentification via Spring Security
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Récupération de l’objet UserDetails
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Récupération de l’entité User depuis la BDD (via l’email)
            User user = userService.findByEmail(userDetails.getUsername());

            // Génération du token JWT
            String token = jwtService.generateToken(user);

            // Réponse JSON propre
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", user.getEmail());
            response.put("role", user.getRole());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Email ou mot de passe incorrect");
            return ResponseEntity.status(401).body(error);
        }
    }

    // 🧾 Inscription
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Sauvegarde du nouvel utilisateur
            User savedUser = userService.registerUser(user);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Inscription réussie");
            response.put("email", savedUser.getEmail());
            response.put("role", savedUser.getRole());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Erreur lors de l’inscription : " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
