package com.synycs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.synycs.service.BillsService;
import com.synycs.web.rest.errors.BadRequestAlertException;
import com.synycs.web.rest.util.HeaderUtil;
import com.synycs.service.dto.BillsDTO;
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
 * REST controller for managing Bills.
 */
@RestController
@RequestMapping("/api")
public class BillsResource {

    private final Logger log = LoggerFactory.getLogger(BillsResource.class);

    private static final String ENTITY_NAME = "bills";

    private final BillsService billsService;

    public BillsResource(BillsService billsService) {
        this.billsService = billsService;
    }

    /**
     * POST  /bills : Create a new bills.
     *
     * @param billsDTO the billsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new billsDTO, or with status 400 (Bad Request) if the bills has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bills")
    @Timed
    public ResponseEntity<BillsDTO> createBills(@Valid @RequestBody BillsDTO billsDTO) throws URISyntaxException {
        log.debug("REST request to save Bills : {}", billsDTO);
        if (billsDTO.getId() != null) {
            throw new BadRequestAlertException("A new bills cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BillsDTO result = billsService.save(billsDTO);
        return ResponseEntity.created(new URI("/api/bills/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bills : Updates an existing bills.
     *
     * @param billsDTO the billsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated billsDTO,
     * or with status 400 (Bad Request) if the billsDTO is not valid,
     * or with status 500 (Internal Server Error) if the billsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bills")
    @Timed
    public ResponseEntity<BillsDTO> updateBills(@Valid @RequestBody BillsDTO billsDTO) throws URISyntaxException {
        log.debug("REST request to update Bills : {}", billsDTO);
        if (billsDTO.getId() == null) {
            return createBills(billsDTO);
        }
        BillsDTO result = billsService.save(billsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, billsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bills : get all the bills.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bills in body
     */
    @GetMapping("/bills")
    @Timed
    public List<BillsDTO> getAllBills() {
        log.debug("REST request to get all Bills");
        return billsService.findAll();
        }

    /**
     * GET  /bills/:id : get the "id" bills.
     *
     * @param id the id of the billsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the billsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/bills/{id}")
    @Timed
    public ResponseEntity<BillsDTO> getBills(@PathVariable Long id) {
        log.debug("REST request to get Bills : {}", id);
        BillsDTO billsDTO = billsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(billsDTO));
    }

    /**
     * DELETE  /bills/:id : delete the "id" bills.
     *
     * @param id the id of the billsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bills/{id}")
    @Timed
    public ResponseEntity<Void> deleteBills(@PathVariable Long id) {
        log.debug("REST request to delete Bills : {}", id);
        billsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
