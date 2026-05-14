package com.learnx.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.learnx.model.Certificate;

public interface CertificateRepository extends JpaRepository<Certificate,Long>{

}