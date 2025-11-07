package com.ocp.missions.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ocp.missions.service.JwtService;
import com.ocp.missions.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserService userService;

    public JwtAuthFilter(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // LOG: incoming request path + header presence
        System.out.println(">>> Request URI: " + request.getRequestURI());
        System.out.println(">>> Authorization header present: " + (authHeader != null));

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);
        System.out.println(">>> JWT (first 40 chars): " + (jwt.length() > 40 ? jwt.substring(0, 40) + "..." : jwt));

        String username = null;
        try {
            username = jwtService.extractUsername(jwt);
            System.out.println(">>> Username extracted from token: " + username);
        } catch (Exception ex) {
            System.out.println("!!! Error extracting username from JWT: " + ex.getMessage());
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails user = userService.loadUserByUsername(username);
                boolean valid = jwtService.isTokenValid(jwt, username);
                System.out.println(">>> isTokenValid: " + valid);

                if (valid) {
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());
                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                    System.out.println(">>> Authentication set for: " + username + " with authorities: " + user.getAuthorities());
                } else {
                    System.out.println("!!! Token invalid or expired for user: " + username);
                }
            } catch (Exception e) {
                System.out.println("!!! Exception loading user or setting authentication: " + e.getMessage());
            }
        }

        chain.doFilter(request, response);
    }
}
