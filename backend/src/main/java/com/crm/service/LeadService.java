package com.crm.service;

import com.crm.dto.LeadRequest;
import com.crm.dto.LeadResponse;
import com.crm.model.Customer;
import com.crm.model.Lead;
import com.crm.repository.CustomerRepository;
import com.crm.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeadService {

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public LeadResponse createLead(LeadRequest request, Long customerId, Long userId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        if (!customer.getOwnerId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        Lead lead = new Lead();
        lead.setCustomer(customer);
        lead.setTitle(request.getTitle());
        lead.setDescription(request.getDescription());
        lead.setStatus(Lead.LeadStatus.valueOf(request.getStatus()));
        lead.setValue(request.getValue());

        lead = leadRepository.save(lead);
        return mapToResponse(lead);
    }

    public List<LeadResponse> getLeadsByCustomer(Long customerId, Long userId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        if (!customer.getOwnerId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        List<Lead> leads = leadRepository.findByCustomerId(customerId);
        return leads.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public LeadResponse getLeadById(Long id, Long userId) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        
        if (!lead.getCustomer().getOwnerId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }
        
        return mapToResponse(lead);
    }

    public LeadResponse updateLead(Long id, LeadRequest request, Long userId) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        
        if (!lead.getCustomer().getOwnerId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        lead.setTitle(request.getTitle());
        lead.setDescription(request.getDescription());
        lead.setStatus(Lead.LeadStatus.valueOf(request.getStatus()));
        lead.setValue(request.getValue());

        lead = leadRepository.save(lead);
        return mapToResponse(lead);
    }

    public void deleteLead(Long id, Long userId) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        
        if (!lead.getCustomer().getOwnerId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        leadRepository.delete(lead);
    }

    public List<LeadResponse> getAllLeads(Long userId) {
        List<Customer> customers = customerRepository.findAll()
                .stream()
                .filter(c -> c.getOwnerId().equals(userId))
                .collect(Collectors.toList());
        
        return customers.stream()
                .flatMap(c -> c.getLeads().stream())
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private LeadResponse mapToResponse(Lead lead) {
        LeadResponse response = new LeadResponse();
        response.setId(lead.getId());
        response.setCustomerId(lead.getCustomer().getId());
        response.setCustomerName(lead.getCustomer().getName());
        response.setTitle(lead.getTitle());
        response.setDescription(lead.getDescription());
        response.setStatus(lead.getStatus().name());
        response.setValue(lead.getValue());
        response.setCreatedAt(lead.getCreatedAt());
        return response;
    }
}
