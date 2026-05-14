package com.learnx.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import com.learnx.model.*;
import com.learnx.repository.*;

@RestController
@RequestMapping("/api/enroll")
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepo;

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private CourseRepository courseRepo;

    @PostMapping
    public ResponseEntity<?> enroll(@RequestBody Map<String, Object> request) {

        try {

            Long userId = Long.valueOf(request.get("userId").toString());
            Long courseId = Long.valueOf(request.get("courseId").toString());

            Optional<Enrollment> existing =
                    enrollmentRepo.findByUserIdAndCourseId(userId, courseId);

            if (existing.isPresent()) {
                return ResponseEntity.badRequest().body("Already enrolled");
            }

            Course course = courseRepo.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            // ✅ SAVE PAYMENT
            Payment payment = new Payment();
            payment.setUserId(userId);
            payment.setCourseId(courseId);
            payment.setAmount(course.getPrice());
            payment.setStatus("SUCCESS");

            paymentRepo.save(payment);

            // ✅ SAVE ENROLLMENT
            Enrollment enrollment = new Enrollment();
            enrollment.setUserId(userId);
            enrollment.setCourseId(courseId);
            enrollment.setStatus("ENROLLED");

            enrollmentRepo.save(enrollment);

            return ResponseEntity.ok(Map.of(
                    "message", "Payment + Enrollment Successful",
                    "payment", payment
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepo.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Enrollment> getUserEnrollments(@PathVariable Long userId) {
        return enrollmentRepo.findByUserId(userId);
    }
}