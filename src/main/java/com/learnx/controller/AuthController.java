package com.learnx.controller;

import com.learnx.model.User;
import com.learnx.repository.UserRepository;
import com.learnx.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (repo.findByEmail(user.getEmail()) != null) {
            // ✅ Return JSON instead of plain text
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Email already registered"));
        }

        user.setRole("USER"); // default role

        User savedUser = repo.save(user);
        savedUser.setPassword(null); // hide password

        return ResponseEntity.ok(savedUser);
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User existing = repo.findByEmail(user.getEmail());

        if (existing == null) {
            return ResponseEntity
                    .status(401)
                    .body(Map.of("message", "User not found"));
        }

        if (!existing.getPassword().equals(user.getPassword())) {
            return ResponseEntity
                    .status(401)
                    .body(Map.of("message", "Invalid password"));
        }

        String token = jwtUtil.generateToken(existing.getEmail(), existing.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", existing.getId());
        response.put("role", existing.getRole());

        return ResponseEntity.ok(response);
    }
}