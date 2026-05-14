package com.learnx.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.learnx.model.Course;
import com.learnx.repository.CourseRepository;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173") // React dev port
public class CourseController {

    @Autowired
    private CourseRepository repo;

   
    @GetMapping
    public List<Course> getCourses() {
        return repo.findAll();
    }

    // ================= GET single course by id =================
    @GetMapping("/{id}")
    public Course getCourse(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // ================= POST add course =================
    // Uncomment this after setting up JWT & ADMIN role
    // @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Course addCourse(@RequestBody Course course) {

        if (course.getPrice() == null) course.setPrice(0.0);
        if (course.getRating() == null) course.setRating(0.0);
        if (course.getReviews() == null) course.setReviews(0);
        if (course.getEnrolled() == null) course.setEnrolled(0);

        // Optional: initialize empty lists for skills/tools
        if (course.getSkills() == null) course.setSkills(List.of());
        if (course.getTools() == null) course.setTools(List.of());

        return repo.save(course);
    }
}