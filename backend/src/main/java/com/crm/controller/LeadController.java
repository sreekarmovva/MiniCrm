package com.crm.controller;

import com.crm.dto.LeadRequest;
import com.crm.dto.LeadResponse;
import com.crm.service.JwtService;
import com.crm.service.LeadService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leads")
@CrossOrigin(origins = "http://localhost:3000")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/customer/{customerId}")
    public ResponseEntity<LeadResponse> createLead(
            @PathVariable Long customerId,
            @Valid @RequestBody LeadRequest request,
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        LeadResponse response = leadService.createLead(request, customerId, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<LeadResponse>> getLeadsByCustomer(
            @PathVariable Long customerId,
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        List<LeadResponse> leads = leadService.getLeadsByCustomer(customerId, userId);
        return ResponseEntity.ok(leads);
    }

    @GetMapping
    public ResponseEntity<List<LeadResponse>> getAllLeads(
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        List<LeadResponse> leads = leadService.getAllLeads(userId);
        return ResponseEntity.ok(leads);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadResponse> getLeadById(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        LeadResponse response = leadService.getLeadById(id, userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeadResponse> updateLead(
            @PathVariable Long id,
            @Valid @RequestBody LeadRequest request,
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        LeadResponse response = leadService.updateLead(id, request, userId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        leadService.deleteLead(id, userId);
        return ResponseEntity.noContent().build();
    }

    private Long extractUserId(String token) {
        String jwt = token.substring(7);
        return jwtService.extractClaim(jwt, claims -> claims.get("userId", Long.class));
    }
}
