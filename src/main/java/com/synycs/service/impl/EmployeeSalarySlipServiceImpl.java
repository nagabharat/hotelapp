package com.synycs.service.impl;

import com.synycs.service.EmployeeSalarySlipService;
import com.synycs.domain.EmployeeSalarySlip;
import com.synycs.repository.EmployeeSalarySlipRepository;
import com.synycs.service.dto.EmployeeSalarySlipDTO;
import com.synycs.service.mapper.EmployeeSalarySlipMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing EmployeeSalarySlip.
 */
@Service
@Transactional
public class EmployeeSalarySlipServiceImpl implements EmployeeSalarySlipService{

    private final Logger log = LoggerFactory.getLogger(EmployeeSalarySlipServiceImpl.class);

    private final EmployeeSalarySlipRepository employeeSalarySlipRepository;

    private final EmployeeSalarySlipMapper employeeSalarySlipMapper;

    public EmployeeSalarySlipServiceImpl(EmployeeSalarySlipRepository employeeSalarySlipRepository, EmployeeSalarySlipMapper employeeSalarySlipMapper) {
        this.employeeSalarySlipRepository = employeeSalarySlipRepository;
        this.employeeSalarySlipMapper = employeeSalarySlipMapper;
    }

    /**
     * Save a employeeSalarySlip.
     *
     * @param employeeSalarySlipDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EmployeeSalarySlipDTO save(EmployeeSalarySlipDTO employeeSalarySlipDTO) {
        log.debug("Request to save EmployeeSalarySlip : {}", employeeSalarySlipDTO);
        EmployeeSalarySlip employeeSalarySlip = employeeSalarySlipMapper.toEntity(employeeSalarySlipDTO);
        employeeSalarySlip = employeeSalarySlipRepository.save(employeeSalarySlip);
        return employeeSalarySlipMapper.toDto(employeeSalarySlip);
    }

    /**
     * Get all the employeeSalarySlips.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeSalarySlipDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EmployeeSalarySlips");
        return employeeSalarySlipRepository.findAll(pageable)
            .map(employeeSalarySlipMapper::toDto);
    }

    /**
     * Get one employeeSalarySlip by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EmployeeSalarySlipDTO findOne(Long id) {
        log.debug("Request to get EmployeeSalarySlip : {}", id);
        EmployeeSalarySlip employeeSalarySlip = employeeSalarySlipRepository.findOne(id);
        return employeeSalarySlipMapper.toDto(employeeSalarySlip);
    }

    /**
     * Delete the employeeSalarySlip by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EmployeeSalarySlip : {}", id);
        employeeSalarySlipRepository.delete(id);
    }
}
