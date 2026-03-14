package com.crm.repository;

import com.crm.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Page<Customer> findByOwnerId(Long ownerId, Pageable pageable);
    
    @Query("SELECT c FROM Customer c WHERE c.ownerId = :ownerId AND (LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Customer> findByOwnerIdAndSearch(@Param("ownerId") Long ownerId, @Param("search") String search, Pageable pageable);
}
