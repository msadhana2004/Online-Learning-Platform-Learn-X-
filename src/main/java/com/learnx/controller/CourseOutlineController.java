package com.learnx.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.learnx.model.CourseOutline;
import com.learnx.repository.CourseOutlineRepository;

@RestController
@RequestMapping("/api/outline")
@CrossOrigin
public class CourseOutlineController {

 @Autowired
 private CourseOutlineRepository repo;

 @GetMapping
 public List<CourseOutline> getAllOutline(){
  return repo.findAll();
 }

 @PostMapping
 public CourseOutline addOutline(@RequestBody CourseOutline outline){
  return repo.save(outline);
 }

}