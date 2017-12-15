package com.synycs.service;

import com.synycs.service.dto.SalaryComponentDTO;
import java.util.List;

/**
 * Service Interface for managing SalaryComponent.
 */
public interface SalaryComponentService {

    /**
     * Save a salaryComponent.
     *
     * @param salaryComponentDTO the entity to save
     * @return the persisted entity
     */
    SalaryComponentDTO save(SalaryComponentDTO salaryComponentDTO);

    /**
     * Get all the salaryComponents.
     *
     * @return the list of entities
     */
    List<SalaryComponentDTO> findAll();

    /**
     * Get the "id" salaryComponent.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SalaryComponentDTO findOne(Long id);

    /**
     * Delete the "id" salaryComponent.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
