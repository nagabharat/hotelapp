package com.synycs.service;

import com.synycs.service.dto.EmployeeSalarySlipDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing EmployeeSalarySlip.
 */
public interface EmployeeSalarySlipService {

    /**
     * Save a employeeSalarySlip.
     *
     * @param employeeSalarySlipDTO the entity to save
     * @return the persisted entity
     */
    EmployeeSalarySlipDTO save(EmployeeSalarySlipDTO employeeSalarySlipDTO);

    /**
     * Get all the employeeSalarySlips.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<EmployeeSalarySlipDTO> findAll(Pageable pageable);

    /**
     * Get the "id" employeeSalarySlip.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EmployeeSalarySlipDTO findOne(Long id);

    /**
     * Delete the "id" employeeSalarySlip.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
