package com.crm.controller;

import com.crm.dto.CustomerRequest;
import com.crm.dto.CustomerResponse;
import com.crm.service.CustomerService;
import com.crm.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public ResponseEntity<CustomerResponse> createCustomer(
            @Valid @RequestBody CustomerRequest request,
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        CustomerResponse response = customerService.createCustomer(request, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<CustomerResponse>> getCustomers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        Page<CustomerResponse> customers = customerService.getCustomers(userId, page, size, search);
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomerById(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        CustomerResponse response = customerService.getCustomerById(id, userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody CustomerRequest request,
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        CustomerResponse response = customerService.updateCustomer(id, request, userId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token
    ) {
        Long userId = extractUserId(token);
        customerService.deleteCustomer(id, userId);
        return ResponseEntity.noContent().build();
    }

    private Long extractUserId(String token) {
        String jwt = token.substring(7);
        return jwtService.extractClaim(jwt, claims -> claims.get("userId", Long.class));
    }
}
