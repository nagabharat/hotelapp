package com.synycs.service.impl;

import com.synycs.service.SalaryComponentService;
import com.synycs.domain.SalaryComponent;
import com.synycs.repository.SalaryComponentRepository;
import com.synycs.service.dto.SalaryComponentDTO;
import com.synycs.service.mapper.SalaryComponentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing SalaryComponent.
 */
@Service
@Transactional
public class SalaryComponentServiceImpl implements SalaryComponentService{

    private final Logger log = LoggerFactory.getLogger(SalaryComponentServiceImpl.class);

    private final SalaryComponentRepository salaryComponentRepository;

    private final SalaryComponentMapper salaryComponentMapper;

    public SalaryComponentServiceImpl(SalaryComponentRepository salaryComponentRepository, SalaryComponentMapper salaryComponentMapper) {
        this.salaryComponentRepository = salaryComponentRepository;
        this.salaryComponentMapper = salaryComponentMapper;
    }

    /**
     * Save a salaryComponent.
     *
     * @param salaryComponentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SalaryComponentDTO save(SalaryComponentDTO salaryComponentDTO) {
        log.debug("Request to save SalaryComponent : {}", salaryComponentDTO);
        SalaryComponent salaryComponent = salaryComponentMapper.toEntity(salaryComponentDTO);
        salaryComponent = salaryComponentRepository.save(salaryComponent);
        return salaryComponentMapper.toDto(salaryComponent);
    }

    /**
     * Get all the salaryComponents.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SalaryComponentDTO> findAll() {
        log.debug("Request to get all SalaryComponents");
        return salaryComponentRepository.findAll().stream()
            .map(salaryComponentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one salaryComponent by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SalaryComponentDTO findOne(Long id) {
        log.debug("Request to get SalaryComponent : {}", id);
        SalaryComponent salaryComponent = salaryComponentRepository.findOne(id);
        return salaryComponentMapper.toDto(salaryComponent);
    }

    /**
     * Delete the salaryComponent by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SalaryComponent : {}", id);
        salaryComponentRepository.delete(id);
    }
}
