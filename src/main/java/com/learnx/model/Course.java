package com.learnx.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String instructor;
    private String category;

    private Double price = 0.0;

    private String video;
    private String image;
    private String about;
    private String level;
    private String duration;
    private String language;

    private Double rating = 0.0;
    private Integer reviews = 0;
    private Integer enrolled = 0;

    @ElementCollection
    @CollectionTable(name = "course_skills", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "skill")
    private List<String> skills = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "course_tools", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "tool")
    private List<String> tools = new ArrayList<>();

    // ===== GETTERS & SETTERS =====

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getInstructor() { return instructor; }

    public void setInstructor(String instructor) { this.instructor = instructor; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }

    public void setPrice(Double price) {
        this.price = (price != null) ? price : 0.0;
    }

    public String getVideo() { return video; }

    public void setVideo(String video) { this.video = video; }

    public String getImage() { return image; }

    public void setImage(String image) { this.image = image; }

    public String getAbout() { return about; }

    public void setAbout(String about) { this.about = about; }

    public String getLevel() { return level; }

    public void setLevel(String level) { this.level = level; }

    public String getDuration() { return duration; }

    public void setDuration(String duration) { this.duration = duration; }

    public String getLanguage() { return language; }

    public void setLanguage(String language) { this.language = language; }

    public Double getRating() { return rating; }

    public void setRating(Double rating) {
        this.rating = (rating != null) ? rating : 0.0;
    }

    public Integer getReviews() { return reviews; }

    public void setReviews(Integer reviews) {
        this.reviews = (reviews != null) ? reviews : 0;
    }

    public Integer getEnrolled() { return enrolled; }

    public void setEnrolled(Integer enrolled) {
        this.enrolled = (enrolled != null) ? enrolled : 0;
    }

    public List<String> getSkills() { return skills; }

    public void setSkills(List<String> skills) {
        this.skills = (skills != null) ? skills : new ArrayList<>();
    }

    public List<String> getTools() { return tools; }

    public void setTools(List<String> tools) {
        this.tools = (tools != null) ? tools : new ArrayList<>();
    }
}