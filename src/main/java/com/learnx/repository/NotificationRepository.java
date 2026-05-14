package com.learnx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnx.model.Notification;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // 🔥 MUST for user-specific notifications
    List<Notification> findByUserId(Long userId);

}