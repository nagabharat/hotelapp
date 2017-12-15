package com.synycs.service.impl;

import com.synycs.service.PettyCashService;
import com.synycs.domain.PettyCash;
import com.synycs.repository.PettyCashRepository;
import com.synycs.service.dto.PettyCashDTO;
import com.synycs.service.mapper.PettyCashMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing PettyCash.
 */
@Service
@Transactional
public class PettyCashServiceImpl implements PettyCashService{

    private final Logger log = LoggerFactory.getLogger(PettyCashServiceImpl.class);

    private final PettyCashRepository pettyCashRepository;

    private final PettyCashMapper pettyCashMapper;

    public PettyCashServiceImpl(PettyCashRepository pettyCashRepository, PettyCashMapper pettyCashMapper) {
        this.pettyCashRepository = pettyCashRepository;
        this.pettyCashMapper = pettyCashMapper;
    }

    /**
     * Save a pettyCash.
     *
     * @param pettyCashDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PettyCashDTO save(PettyCashDTO pettyCashDTO) {
        log.debug("Request to save PettyCash : {}", pettyCashDTO);
        PettyCash pettyCash = pettyCashMapper.toEntity(pettyCashDTO);
        pettyCash = pettyCashRepository.save(pettyCash);
        return pettyCashMapper.toDto(pettyCash);
    }

    /**
     * Get all the pettyCashes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PettyCashDTO> findAll() {
        log.debug("Request to get all PettyCashes");
        return pettyCashRepository.findAll().stream()
            .map(pettyCashMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one pettyCash by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PettyCashDTO findOne(Long id) {
        log.debug("Request to get PettyCash : {}", id);
        PettyCash pettyCash = pettyCashRepository.findOne(id);
        return pettyCashMapper.toDto(pettyCash);
    }

    /**
     * Delete the pettyCash by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PettyCash : {}", id);
        pettyCashRepository.delete(id);
    }
}
