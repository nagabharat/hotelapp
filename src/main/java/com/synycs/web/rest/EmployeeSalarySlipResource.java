package com.synycs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.synycs.service.EmployeeSalarySlipService;
import com.synycs.web.rest.errors.BadRequestAlertException;
import com.synycs.web.rest.util.HeaderUtil;
import com.synycs.web.rest.util.PaginationUtil;
import com.synycs.service.dto.EmployeeSalarySlipDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EmployeeSalarySlip.
 */
@RestController
@RequestMapping("/api")
public class EmployeeSalarySlipResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeSalarySlipResource.class);

    private static final String ENTITY_NAME = "employeeSalarySlip";

    private final EmployeeSalarySlipService employeeSalarySlipService;

    public EmployeeSalarySlipResource(EmployeeSalarySlipService employeeSalarySlipService) {
        this.employeeSalarySlipService = employeeSalarySlipService;
    }

    /**
     * POST  /employee-salary-slips : Create a new employeeSalarySlip.
     *
     * @param employeeSalarySlipDTO the employeeSalarySlipDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new employeeSalarySlipDTO, or with status 400 (Bad Request) if the employeeSalarySlip has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/employee-salary-slips")
    @Timed
    public ResponseEntity<EmployeeSalarySlipDTO> createEmployeeSalarySlip(@Valid @RequestBody EmployeeSalarySlipDTO employeeSalarySlipDTO) throws URISyntaxException {
        log.debug("REST request to save EmployeeSalarySlip : {}", employeeSalarySlipDTO);
        if (employeeSalarySlipDTO.getId() != null) {
            throw new BadRequestAlertException("A new employeeSalarySlip cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmployeeSalarySlipDTO result = employeeSalarySlipService.save(employeeSalarySlipDTO);
        return ResponseEntity.created(new URI("/api/employee-salary-slips/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /employee-salary-slips : Updates an existing employeeSalarySlip.
     *
     * @param employeeSalarySlipDTO the employeeSalarySlipDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated employeeSalarySlipDTO,
     * or with status 400 (Bad Request) if the employeeSalarySlipDTO is not valid,
     * or with status 500 (Internal Server Error) if the employeeSalarySlipDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/employee-salary-slips")
    @Timed
    public ResponseEntity<EmployeeSalarySlipDTO> updateEmployeeSalarySlip(@Valid @RequestBody EmployeeSalarySlipDTO employeeSalarySlipDTO) throws URISyntaxException {
        log.debug("REST request to update EmployeeSalarySlip : {}", employeeSalarySlipDTO);
        if (employeeSalarySlipDTO.getId() == null) {
            return createEmployeeSalarySlip(employeeSalarySlipDTO);
        }
        EmployeeSalarySlipDTO result = employeeSalarySlipService.save(employeeSalarySlipDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, employeeSalarySlipDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /employee-salary-slips : get all the employeeSalarySlips.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of employeeSalarySlips in body
     */
    @GetMapping("/employee-salary-slips")
    @Timed
    public ResponseEntity<List<EmployeeSalarySlipDTO>> getAllEmployeeSalarySlips(Pageable pageable) {
        log.debug("REST request to get a page of EmployeeSalarySlips");
        Page<EmployeeSalarySlipDTO> page = employeeSalarySlipService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/employee-salary-slips");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /employee-salary-slips/:id : get the "id" employeeSalarySlip.
     *
     * @param id the id of the employeeSalarySlipDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the employeeSalarySlipDTO, or with status 404 (Not Found)
     */
    @GetMapping("/employee-salary-slips/{id}")
    @Timed
    public ResponseEntity<EmployeeSalarySlipDTO> getEmployeeSalarySlip(@PathVariable Long id) {
        log.debug("REST request to get EmployeeSalarySlip : {}", id);
        EmployeeSalarySlipDTO employeeSalarySlipDTO = employeeSalarySlipService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(employeeSalarySlipDTO));
    }

    /**
     * DELETE  /employee-salary-slips/:id : delete the "id" employeeSalarySlip.
     *
     * @param id the id of the employeeSalarySlipDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/employee-salary-slips/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmployeeSalarySlip(@PathVariable Long id) {
        log.debug("REST request to delete EmployeeSalarySlip : {}", id);
        employeeSalarySlipService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
