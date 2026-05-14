package com.learnx.config;

import com.learnx.security.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http

            // ❌ Disable CSRF (JWT use pannrom)
            .csrf(csrf -> csrf.disable())

            // ✅ Enable CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // ✅ Stateless session (JWT)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // ✅ Authorization rules
            .authorizeHttpRequests(auth -> auth

                // 🔓 PUBLIC APIs
                .requestMatchers(
                    "/api/auth/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**",
                    "/swagger-resources/**",
                    "/webjars/**"
                ).permitAll()

                // 🔓 Public course APIs
                .requestMatchers(HttpMethod.GET, "/api/courses/**").permitAll()

                // 🔒 ADMIN மட்டும் access
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // 🔒 மற்ற எல்லா APIs → login required
                .anyRequest().authenticated()
            )

            // ❌ Disable default login
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        // ✅ JWT Filter (VERY IMPORTANT 🔥)
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ✅ CORS CONFIG (FRONTEND CONNECT FIX 🔥)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // 👉 React frontend URL
        config.setAllowedOrigins(List.of("http://localhost:5173"));

        // 👉 Allowed methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 👉 Allow all headers (Authorization included)
        config.setAllowedHeaders(List.of("*"));

        // 👉 Expose Authorization header to frontend
        config.setExposedHeaders(List.of("Authorization"));

        // 👉 Allow cookies / credentials (optional but safe)
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}