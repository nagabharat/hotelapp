package com.synycs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.synycs.domain.MonthOfYear;

import com.synycs.repository.MonthOfYearRepository;
import com.synycs.web.rest.errors.BadRequestAlertException;
import com.synycs.web.rest.util.HeaderUtil;
import com.synycs.service.dto.MonthOfYearDTO;
import com.synycs.service.mapper.MonthOfYearMapper;
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
 * REST controller for managing MonthOfYear.
 */
@RestController
@RequestMapping("/api")
public class MonthOfYearResource {

    private final Logger log = LoggerFactory.getLogger(MonthOfYearResource.class);

    private static final String ENTITY_NAME = "monthOfYear";

    private final MonthOfYearRepository monthOfYearRepository;

    private final MonthOfYearMapper monthOfYearMapper;

    public MonthOfYearResource(MonthOfYearRepository monthOfYearRepository, MonthOfYearMapper monthOfYearMapper) {
        this.monthOfYearRepository = monthOfYearRepository;
        this.monthOfYearMapper = monthOfYearMapper;
    }

    /**
     * POST  /month-of-years : Create a new monthOfYear.
     *
     * @param monthOfYearDTO the monthOfYearDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new monthOfYearDTO, or with status 400 (Bad Request) if the monthOfYear has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/month-of-years")
    @Timed
    public ResponseEntity<MonthOfYearDTO> createMonthOfYear(@Valid @RequestBody MonthOfYearDTO monthOfYearDTO) throws URISyntaxException {
        log.debug("REST request to save MonthOfYear : {}", monthOfYearDTO);
        if (monthOfYearDTO.getId() != null) {
            throw new BadRequestAlertException("A new monthOfYear cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MonthOfYear monthOfYear = monthOfYearMapper.toEntity(monthOfYearDTO);
        monthOfYear = monthOfYearRepository.save(monthOfYear);
        MonthOfYearDTO result = monthOfYearMapper.toDto(monthOfYear);
        return ResponseEntity.created(new URI("/api/month-of-years/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /month-of-years : Updates an existing monthOfYear.
     *
     * @param monthOfYearDTO the monthOfYearDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated monthOfYearDTO,
     * or with status 400 (Bad Request) if the monthOfYearDTO is not valid,
     * or with status 500 (Internal Server Error) if the monthOfYearDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/month-of-years")
    @Timed
    public ResponseEntity<MonthOfYearDTO> updateMonthOfYear(@Valid @RequestBody MonthOfYearDTO monthOfYearDTO) throws URISyntaxException {
        log.debug("REST request to update MonthOfYear : {}", monthOfYearDTO);
        if (monthOfYearDTO.getId() == null) {
            return createMonthOfYear(monthOfYearDTO);
        }
        MonthOfYear monthOfYear = monthOfYearMapper.toEntity(monthOfYearDTO);
        monthOfYear = monthOfYearRepository.save(monthOfYear);
        MonthOfYearDTO result = monthOfYearMapper.toDto(monthOfYear);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, monthOfYearDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /month-of-years : get all the monthOfYears.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of monthOfYears in body
     */
    @GetMapping("/month-of-years")
    @Timed
    public List<MonthOfYearDTO> getAllMonthOfYears() {
        log.debug("REST request to get all MonthOfYears");
        List<MonthOfYear> monthOfYears = monthOfYearRepository.findAll();
        return monthOfYearMapper.toDto(monthOfYears);
        }

    /**
     * GET  /month-of-years/:id : get the "id" monthOfYear.
     *
     * @param id the id of the monthOfYearDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the monthOfYearDTO, or with status 404 (Not Found)
     */
    @GetMapping("/month-of-years/{id}")
    @Timed
    public ResponseEntity<MonthOfYearDTO> getMonthOfYear(@PathVariable Long id) {
        log.debug("REST request to get MonthOfYear : {}", id);
        MonthOfYear monthOfYear = monthOfYearRepository.findOne(id);
        MonthOfYearDTO monthOfYearDTO = monthOfYearMapper.toDto(monthOfYear);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(monthOfYearDTO));
    }

    /**
     * DELETE  /month-of-years/:id : delete the "id" monthOfYear.
     *
     * @param id the id of the monthOfYearDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/month-of-years/{id}")
    @Timed
    public ResponseEntity<Void> deleteMonthOfYear(@PathVariable Long id) {
        log.debug("REST request to delete MonthOfYear : {}", id);
        monthOfYearRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
