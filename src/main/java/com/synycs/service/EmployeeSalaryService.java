package com.synycs.service;

import com.synycs.service.dto.EmployeeSalaryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing EmployeeSalary.
 */
public interface EmployeeSalaryService {

    /**
     * Save a employeeSalary.
     *
     * @param employeeSalaryDTO the entity to save
     * @return the persisted entity
     */
    EmployeeSalaryDTO save(EmployeeSalaryDTO employeeSalaryDTO);

    /**
     * Get all the employeeSalaries.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EmployeeSalaryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" employeeSalary.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EmployeeSalaryDTO findOne(Long id);

    /**
     * Delete the "id" employeeSalary.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
