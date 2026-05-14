package com.learnx.controller;

import com.learnx.model.Notification;
import com.learnx.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private NotificationRepository notificationRepository;

    // 🔔 Get all notifications for logged user
    @GetMapping("/notifications/{userId}")
    public ResponseEntity<?> getUserNotifications(@PathVariable Long userId) {

        List<Notification> notifications = notificationRepository.findByUserId(userId);

        return ResponseEntity.ok(notifications);
    }

    // ✅ Mark notification as read
    @PutMapping("/notifications/read/{id}")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {

        Notification notification = notificationRepository.findById(id)
                .orElse(null);

        if (notification == null) {
            return ResponseEntity.badRequest().body("Notification not found");
        }

        notification.setIsRead(true);

        Notification updated = notificationRepository.save(notification);

        return ResponseEntity.ok(updated);
    }
}