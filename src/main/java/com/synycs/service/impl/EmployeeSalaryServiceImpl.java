package com.synycs.service.impl;

import com.synycs.service.EmployeeSalaryService;
import com.synycs.domain.EmployeeSalary;
import com.synycs.repository.EmployeeSalaryRepository;
import com.synycs.service.dto.EmployeeSalaryDTO;
import com.synycs.service.mapper.EmployeeSalaryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing EmployeeSalary.
 */
@Service
@Transactional
public class EmployeeSalaryServiceImpl implements EmployeeSalaryService{

    private final Logger log = LoggerFactory.getLogger(EmployeeSalaryServiceImpl.class);

    private final EmployeeSalaryRepository employeeSalaryRepository;

    private final EmployeeSalaryMapper employeeSalaryMapper;

    public EmployeeSalaryServiceImpl(EmployeeSalaryRepository employeeSalaryRepository, EmployeeSalaryMapper employeeSalaryMapper) {
        this.employeeSalaryRepository = employeeSalaryRepository;
        this.employeeSalaryMapper = employeeSalaryMapper;
    }

    /**
     * Save a employeeSalary.
     *
     * @param employeeSalaryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EmployeeSalaryDTO save(EmployeeSalaryDTO employeeSalaryDTO) {
        log.debug("Request to save EmployeeSalary : {}", employeeSalaryDTO);
        EmployeeSalary employeeSalary = employeeSalaryMapper.toEntity(employeeSalaryDTO);
        employeeSalary = employeeSalaryRepository.save(employeeSalary);
        return employeeSalaryMapper.toDto(employeeSalary);
    }

    /**
     * Get all the employeeSalaries.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeSalaryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EmployeeSalaries");
        return employeeSalaryRepository.findAll(pageable)
            .map(employeeSalaryMapper::toDto);
    }

    /**
     * Get one employeeSalary by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EmployeeSalaryDTO findOne(Long id) {
        log.debug("Request to get EmployeeSalary : {}", id);
        EmployeeSalary employeeSalary = employeeSalaryRepository.findOne(id);
        return employeeSalaryMapper.toDto(employeeSalary);
    }

    /**
     * Delete the employeeSalary by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EmployeeSalary : {}", id);
        employeeSalaryRepository.delete(id);
    }
}
