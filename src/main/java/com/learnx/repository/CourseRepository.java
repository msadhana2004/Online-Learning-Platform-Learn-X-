package com.learnx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnx.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> { }