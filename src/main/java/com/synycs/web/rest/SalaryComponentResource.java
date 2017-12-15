package com.synycs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.synycs.service.SalaryComponentService;
import com.synycs.web.rest.errors.BadRequestAlertException;
import com.synycs.web.rest.util.HeaderUtil;
import com.synycs.service.dto.SalaryComponentDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SalaryComponent.
 */
@RestController
@RequestMapping("/api")
public class SalaryComponentResource {

    private final Logger log = LoggerFactory.getLogger(SalaryComponentResource.class);

    private static final String ENTITY_NAME = "salaryComponent";

    private final SalaryComponentService salaryComponentService;

    public SalaryComponentResource(SalaryComponentService salaryComponentService) {
        this.salaryComponentService = salaryComponentService;
    }

    /**
     * POST  /salary-components : Create a new salaryComponent.
     *
     * @param salaryComponentDTO the salaryComponentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new salaryComponentDTO, or with status 400 (Bad Request) if the salaryComponent has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/salary-components")
    @Timed
    public ResponseEntity<SalaryComponentDTO> createSalaryComponent(@Valid @RequestBody SalaryComponentDTO salaryComponentDTO) throws URISyntaxException {
        log.debug("REST request to save SalaryComponent : {}", salaryComponentDTO);
        if (salaryComponentDTO.getId() != null) {
            throw new BadRequestAlertException("A new salaryComponent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SalaryComponentDTO result = salaryComponentService.save(salaryComponentDTO);
        return ResponseEntity.created(new URI("/api/salary-components/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /salary-components : Updates an existing salaryComponent.
     *
     * @param salaryComponentDTO the salaryComponentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated salaryComponentDTO,
     * or with status 400 (Bad Request) if the salaryComponentDTO is not valid,
     * or with status 500 (Internal Server Error) if the salaryComponentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/salary-components")
    @Timed
    public ResponseEntity<SalaryComponentDTO> updateSalaryComponent(@Valid @RequestBody SalaryComponentDTO salaryComponentDTO) throws URISyntaxException {
        log.debug("REST request to update SalaryComponent : {}", salaryComponentDTO);
        if (salaryComponentDTO.getId() == null) {
            return createSalaryComponent(salaryComponentDTO);
        }
        SalaryComponentDTO result = salaryComponentService.save(salaryComponentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, salaryComponentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /salary-components : get all the salaryComponents.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of salaryComponents in body
     */
    @GetMapping("/salary-components")
    @Timed
    public List<SalaryComponentDTO> getAllSalaryComponents() {
        log.debug("REST request to get all SalaryComponents");
        return salaryComponentService.findAll();
        }

    /**
     * GET  /salary-components/:id : get the "id" salaryComponent.
     *
     * @param id the id of the salaryComponentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the salaryComponentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/salary-components/{id}")
    @Timed
    public ResponseEntity<SalaryComponentDTO> getSalaryComponent(@PathVariable Long id) {
        log.debug("REST request to get SalaryComponent : {}", id);
        SalaryComponentDTO salaryComponentDTO = salaryComponentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(salaryComponentDTO));
    }

    /**
     * DELETE  /salary-components/:id : delete the "id" salaryComponent.
     *
     * @param id the id of the salaryComponentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/salary-components/{id}")
    @Timed
    public ResponseEntity<Void> deleteSalaryComponent(@PathVariable Long id) {
        log.debug("REST request to delete SalaryComponent : {}", id);
        salaryComponentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
