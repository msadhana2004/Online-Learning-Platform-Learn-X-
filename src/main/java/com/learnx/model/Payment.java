package com.learnx.model;

import jakarta.persistence.*;

@Entity
public class Payment {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private Long userId;
 private Long courseId;

 private double amount;
 private String status;

 public Long getId() {
  return id;
 }

 public void setId(Long id) {
  this.id = id;
 }

 public Long getUserId() {
  return userId;
 }

 public void setUserId(Long userId) {
  this.userId = userId;
 }

 public Long getCourseId() {
  return courseId;
 }

 public void setCourseId(Long courseId) {
  this.courseId = courseId;
 }

 public double getAmount() {
  return amount;
 }

 public void setAmount(double amount) {
  this.amount = amount;
 }

 public String getStatus() {
  return status;
 }

 public void setStatus(String status) {
  this.status = status;
 }
}