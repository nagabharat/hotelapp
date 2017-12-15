package com.synycs.service;

import com.synycs.service.dto.BillsDTO;
import java.util.List;

/**
 * Service Interface for managing Bills.
 */
public interface BillsService {

    /**
     * Save a bills.
     *
     * @param billsDTO the entity to save
     * @return the persisted entity
     */
    BillsDTO save(BillsDTO billsDTO);

    /**
     * Get all the bills.
     *
     * @return the list of entities
     */
    List<BillsDTO> findAll();

    /**
     * Get the "id" bills.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BillsDTO findOne(Long id);

    /**
     * Delete the "id" bills.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
