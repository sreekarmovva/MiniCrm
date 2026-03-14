package com.crm.service;

import com.crm.dto.CustomerRequest;
import com.crm.dto.CustomerResponse;
import com.crm.model.Customer;
import com.crm.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public CustomerResponse createCustomer(CustomerRequest request, Long userId) {
        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setCompany(request.getCompany());
        customer.setOwnerId(userId);

        customer = customerRepository.save(customer);
        return mapToResponse(customer);
    }

    public Page<CustomerResponse> getCustomers(Long userId, int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        
        Page<Customer> customers;
        if (search != null && !search.isEmpty()) {
            customers = customerRepository.findByOwnerIdAndSearch(userId, search, pageable);
        } else {
            customers = customerRepository.findByOwnerId(userId, pageable);
        }
        
        return customers.map(this::mapToResponse);
    }

    public CustomerResponse getCustomerById(Long id, Long userId) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        if (!customer.getOwnerId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }
        
        return mapToResponse(customer);
    }

    public CustomerResponse updateCustomer(Long id, CustomerRequest request, Long userId) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        if (!customer.getOwnerId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setCompany(request.getCompany());

        customer = customerRepository.save(customer);
        return mapToResponse(customer);
    }

    public void deleteCustomer(Long id, Long userId) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        if (!customer.getOwnerId().equals(userId)) {
            throw new RuntimeException("Unauthorized access");
        }

        customerRepository.delete(customer);
    }

    private CustomerResponse mapToResponse(Customer customer) {
        CustomerResponse response = new CustomerResponse();
        response.setId(customer.getId());
        response.setName(customer.getName());
        response.setEmail(customer.getEmail());
        response.setPhone(customer.getPhone());
        response.setCompany(customer.getCompany());
        response.setCreatedAt(customer.getCreatedAt());
        response.setLeadCount(customer.getLeads() != null ? customer.getLeads().size() : 0);
        return response;
    }
}
