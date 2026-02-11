package com.slife.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String fullName;

    private String phoneNumber;

    @Column(nullable = false)
    private String role = "USER";

    @Column(nullable = false)
    private String status = "ACTIVE";

    @Column(nullable = false)
    private Float reputationScore = 5.0f;

    // ── Getters & Setters ──────────────────────────────────────────────────
    public Long getUserId()                        { return userId; }
    public void setUserId(Long userId)             { this.userId = userId; }

    public String getEmail()                       { return email; }
    public void setEmail(String email)             { this.email = email; }

    public String getFullName()                    { return fullName; }
    public void setFullName(String fullName)       { this.fullName = fullName; }

    public String getPhoneNumber()                 { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getRole()                        { return role; }
    public void setRole(String role)               { this.role = role; }

    public String getStatus()                      { return status; }
    public void setStatus(String status)           { this.status = status; }

    public Float getReputationScore()                      { return reputationScore; }
    public void setReputationScore(Float reputationScore)  { this.reputationScore = reputationScore; }
}
