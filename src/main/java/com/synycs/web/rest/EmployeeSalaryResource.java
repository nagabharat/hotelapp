package com.synycs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.synycs.service.EmployeeSalaryService;
import com.synycs.web.rest.errors.BadRequestAlertException;
import com.synycs.web.rest.util.HeaderUtil;
import com.synycs.web.rest.util.PaginationUtil;
import com.synycs.service.dto.EmployeeSalaryDTO;
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
 * REST controller for managing EmployeeSalary.
 */
@RestController
@RequestMapping("/api")
public class EmployeeSalaryResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeSalaryResource.class);

    private static final String ENTITY_NAME = "employeeSalary";

    private final EmployeeSalaryService employeeSalaryService;

    public EmployeeSalaryResource(EmployeeSalaryService employeeSalaryService) {
        this.employeeSalaryService = employeeSalaryService;
    }

    /**
     * POST  /employee-salaries : Create a new employeeSalary.
     *
     * @param employeeSalaryDTO the employeeSalaryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new employeeSalaryDTO, or with status 400 (Bad Request) if the employeeSalary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/employee-salaries")
    @Timed
    public ResponseEntity<EmployeeSalaryDTO> createEmployeeSalary(@Valid @RequestBody EmployeeSalaryDTO employeeSalaryDTO) throws URISyntaxException {
        log.debug("REST request to save EmployeeSalary : {}", employeeSalaryDTO);
        if (employeeSalaryDTO.getId() != null) {
            throw new BadRequestAlertException("A new employeeSalary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmployeeSalaryDTO result = employeeSalaryService.save(employeeSalaryDTO);
        return ResponseEntity.created(new URI("/api/employee-salaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /employee-salaries : Updates an existing employeeSalary.
     *
     * @param employeeSalaryDTO the employeeSalaryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated employeeSalaryDTO,
     * or with status 400 (Bad Request) if the employeeSalaryDTO is not valid,
     * or with status 500 (Internal Server Error) if the employeeSalaryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/employee-salaries")
    @Timed
    public ResponseEntity<EmployeeSalaryDTO> updateEmployeeSalary(@Valid @RequestBody EmployeeSalaryDTO employeeSalaryDTO) throws URISyntaxException {
        log.debug("REST request to update EmployeeSalary : {}", employeeSalaryDTO);
        if (employeeSalaryDTO.getId() == null) {
            return createEmployeeSalary(employeeSalaryDTO);
        }
        EmployeeSalaryDTO result = employeeSalaryService.save(employeeSalaryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, employeeSalaryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /employee-salaries : get all the employeeSalaries.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of employeeSalaries in body
     */
    @GetMapping("/employee-salaries")
    @Timed
    public ResponseEntity<List<EmployeeSalaryDTO>> getAllEmployeeSalaries(Pageable pageable) {
        log.debug("REST request to get a page of EmployeeSalaries");
        Page<EmployeeSalaryDTO> page = employeeSalaryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/employee-salaries");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /employee-salaries/:id : get the "id" employeeSalary.
     *
     * @param id the id of the employeeSalaryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the employeeSalaryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/employee-salaries/{id}")
    @Timed
    public ResponseEntity<EmployeeSalaryDTO> getEmployeeSalary(@PathVariable Long id) {
        log.debug("REST request to get EmployeeSalary : {}", id);
        EmployeeSalaryDTO employeeSalaryDTO = employeeSalaryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(employeeSalaryDTO));
    }

    /**
     * DELETE  /employee-salaries/:id : delete the "id" employeeSalary.
     *
     * @param id the id of the employeeSalaryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/employee-salaries/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmployeeSalary(@PathVariable Long id) {
        log.debug("REST request to delete EmployeeSalary : {}", id);
        employeeSalaryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
