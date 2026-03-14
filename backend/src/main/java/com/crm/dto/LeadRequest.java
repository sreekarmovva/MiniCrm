package com.crm.dto;

import jakarta.validation.constraints.NotBlank;

public class LeadRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotBlank(message = "Status is required")
    private String status;

    private Double value;

    public LeadRequest() {}

    public LeadRequest(String title, String description, String status, Double value) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.value = value;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }
}
