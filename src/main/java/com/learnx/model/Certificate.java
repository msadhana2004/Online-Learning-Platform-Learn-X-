 package com.learnx.model;

import jakarta.persistence.*;

@Entity
@Table(name="certificate")
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long courseId;

    private String certificateCode;

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }

    public Long getUserId(){
        return userId;
    }

    public void setUserId(Long userId){
        this.userId=userId;
    }

    public Long getCourseId(){
        return courseId;
    }

    public void setCourseId(Long courseId){
        this.courseId=courseId;
    }

    public String getCertificateCode(){
        return certificateCode;
    }

    public void setCertificateCode(String certificateCode){
        this.certificateCode=certificateCode;
    }
}