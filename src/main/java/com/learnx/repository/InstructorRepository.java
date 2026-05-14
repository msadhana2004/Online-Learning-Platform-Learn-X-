package com.learnx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnx.model.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {

}
