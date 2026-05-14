package com.learnx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnx.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}