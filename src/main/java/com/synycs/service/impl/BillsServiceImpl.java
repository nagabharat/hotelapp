package com.synycs.service.impl;

import com.synycs.service.BillsService;
import com.synycs.domain.Bills;
import com.synycs.repository.BillsRepository;
import com.synycs.service.dto.BillsDTO;
import com.synycs.service.mapper.BillsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Bills.
 */
@Service
@Transactional
public class BillsServiceImpl implements BillsService{

    private final Logger log = LoggerFactory.getLogger(BillsServiceImpl.class);

    private final BillsRepository billsRepository;

    private final BillsMapper billsMapper;

    public BillsServiceImpl(BillsRepository billsRepository, BillsMapper billsMapper) {
        this.billsRepository = billsRepository;
        this.billsMapper = billsMapper;
    }

    /**
     * Save a bills.
     *
     * @param billsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BillsDTO save(BillsDTO billsDTO) {
        log.debug("Request to save Bills : {}", billsDTO);
        Bills bills = billsMapper.toEntity(billsDTO);
        bills = billsRepository.save(bills);
        return billsMapper.toDto(bills);
    }

    /**
     * Get all the bills.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<BillsDTO> findAll() {
        log.debug("Request to get all Bills");
        return billsRepository.findAll().stream()
            .map(billsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one bills by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BillsDTO findOne(Long id) {
        log.debug("Request to get Bills : {}", id);
        Bills bills = billsRepository.findOne(id);
        return billsMapper.toDto(bills);
    }

    /**
     * Delete the bills by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bills : {}", id);
        billsRepository.delete(id);
    }
}
