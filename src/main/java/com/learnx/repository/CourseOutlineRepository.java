package com.learnx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnx.model.CourseOutline;

public interface CourseOutlineRepository extends JpaRepository<CourseOutline, Long> {

}