package com.learnx.controller;

import com.learnx.model.*;
import com.learnx.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // ================= USERS =================

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // ================= COURSES =================

    @PostMapping("/courses")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {

        if (course.getTitle() == null || course.getTitle().isEmpty()) {
            return ResponseEntity.badRequest().body("Course title is required");
        }

        return ResponseEntity.ok(courseRepository.save(course));
    }

    @GetMapping("/courses")
    public ResponseEntity<?> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {

        Optional<Course> course = courseRepository.findById(id);

        if (course.isPresent()) {
            return ResponseEntity.ok(course.get());
        } else {
            return ResponseEntity.badRequest().body("Course Not Found");
        }
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<?> updateCourse(
            @PathVariable Long id,
            @RequestBody Course updatedCourse) {

        Optional<Course> optionalCourse = courseRepository.findById(id);

        if (optionalCourse.isEmpty()) {
            return ResponseEntity.badRequest().body("Course Not Found");
        }

        Course course = optionalCourse.get();

        if (updatedCourse.getTitle() != null)
            course.setTitle(updatedCourse.getTitle());

        if (updatedCourse.getInstructor() != null)
            course.setInstructor(updatedCourse.getInstructor());

        if (updatedCourse.getCategory() != null)
            course.setCategory(updatedCourse.getCategory());

        if (updatedCourse.getPrice() != null)
            course.setPrice(updatedCourse.getPrice());

        if (updatedCourse.getImage() != null)
            course.setImage(updatedCourse.getImage());

        if (updatedCourse.getVideo() != null)
            course.setVideo(updatedCourse.getVideo());

        if (updatedCourse.getAbout() != null)
            course.setAbout(updatedCourse.getAbout());

        if (updatedCourse.getLevel() != null)
            course.setLevel(updatedCourse.getLevel());

        if (updatedCourse.getDuration() != null)
            course.setDuration(updatedCourse.getDuration());

        if (updatedCourse.getLanguage() != null)
            course.setLanguage(updatedCourse.getLanguage());

        if (updatedCourse.getRating() != null)
            course.setRating(updatedCourse.getRating());

        if (updatedCourse.getReviews() != null)
            course.setReviews(updatedCourse.getReviews());

        if (updatedCourse.getEnrolled() != null)
            course.setEnrolled(updatedCourse.getEnrolled());

        if (updatedCourse.getSkills() != null)
            course.setSkills(updatedCourse.getSkills());

        if (updatedCourse.getTools() != null)
            course.setTools(updatedCourse.getTools());

        return ResponseEntity.ok(courseRepository.save(course));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {

        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return ResponseEntity.ok("Course Deleted Successfully");
        } else {
            return ResponseEntity.badRequest().body("Course Not Found");
        }
    }

    // ================= PAYMENTS =================

    @GetMapping("/payments")
    public ResponseEntity<?> getAllPayments() {
        return ResponseEntity.ok(paymentRepository.findAll());
    }

    // ================= INSTRUCTORS =================

    @GetMapping("/instructors")
    public ResponseEntity<?> getAllInstructors() {
        return ResponseEntity.ok(instructorRepository.findAll());
    }

    @PostMapping("/instructors")
    public ResponseEntity<?> addInstructor(@RequestBody Instructor instructor) {

        if (instructor.getName() == null || instructor.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Instructor name is required");
        }

        return ResponseEntity.ok(instructorRepository.save(instructor));
    }

    @DeleteMapping("/instructors/{id}")
    public ResponseEntity<?> deleteInstructor(@PathVariable Long id) {

        if (instructorRepository.existsById(id)) {
            instructorRepository.deleteById(id);
            return ResponseEntity.ok("Instructor Deleted Successfully");
        } else {
            return ResponseEntity.badRequest().body("Instructor Not Found");
        }
    }

    // ================= NOTIFICATIONS =================

    @PostMapping("/notifications")
    public ResponseEntity<?> sendNotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(notificationRepository.save(notification));
    }

    @GetMapping("/notifications")
    public ResponseEntity<?> getNotifications() {
        return ResponseEntity.ok(notificationRepository.findAll());
    }

    // ================= REPORTS (🔥 UPDATED) =================

    @GetMapping("/reports")
    public ResponseEntity<?> getReports() {

        long totalUsers = userRepository.count();
        long totalCourses = courseRepository.count();
        long totalPayments = paymentRepository.count();

        // 🔥 Completion Rate (simple logic)
        double completionRate = 0;

        if (totalUsers > 0) {
            completionRate = (totalPayments * 100.0) / totalUsers;
        }

        // 🔥 Revenue Data (temporary - graph use)
        List<Map<String, Object>> revenueData = List.of(
                Map.of("month", "Jan", "revenue", 4000),
                Map.of("month", "Feb", "revenue", 3000),
                Map.of("month", "Mar", "revenue", 5000)
        );

        return ResponseEntity.ok(Map.of(
                "totalUsers", totalUsers,
                "totalCourses", totalCourses,
                "totalPayments", totalPayments,
                "completionRate", Math.round(completionRate),
                "revenueData", revenueData
        ));
    }
}