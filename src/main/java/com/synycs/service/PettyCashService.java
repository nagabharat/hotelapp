package com.synycs.service;

import com.synycs.service.dto.PettyCashDTO;
import java.util.List;

/**
 * Service Interface for managing PettyCash.
 */
public interface PettyCashService {

    /**
     * Save a pettyCash.
     *
     * @param pettyCashDTO the entity to save
     * @return the persisted entity
     */
    PettyCashDTO save(PettyCashDTO pettyCashDTO);

    /**
     * Get all the pettyCashes.
     *
     * @return the list of entities
     */
    List<PettyCashDTO> findAll();

    /**
     * Get the "id" pettyCash.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PettyCashDTO findOne(Long id);

    /**
     * Delete the "id" pettyCash.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
