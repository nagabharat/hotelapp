package com.synycs.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.synycs.service.PettyCashService;
import com.synycs.web.rest.errors.BadRequestAlertException;
import com.synycs.web.rest.util.HeaderUtil;
import com.synycs.service.dto.PettyCashDTO;
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
 * REST controller for managing PettyCash.
 */
@RestController
@RequestMapping("/api")
public class PettyCashResource {

    private final Logger log = LoggerFactory.getLogger(PettyCashResource.class);

    private static final String ENTITY_NAME = "pettyCash";

    private final PettyCashService pettyCashService;

    public PettyCashResource(PettyCashService pettyCashService) {
        this.pettyCashService = pettyCashService;
    }

    /**
     * POST  /petty-cashes : Create a new pettyCash.
     *
     * @param pettyCashDTO the pettyCashDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pettyCashDTO, or with status 400 (Bad Request) if the pettyCash has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/petty-cashes")
    @Timed
    public ResponseEntity<PettyCashDTO> createPettyCash(@Valid @RequestBody PettyCashDTO pettyCashDTO) throws URISyntaxException {
        log.debug("REST request to save PettyCash : {}", pettyCashDTO);
        if (pettyCashDTO.getId() != null) {
            throw new BadRequestAlertException("A new pettyCash cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PettyCashDTO result = pettyCashService.save(pettyCashDTO);
        return ResponseEntity.created(new URI("/api/petty-cashes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /petty-cashes : Updates an existing pettyCash.
     *
     * @param pettyCashDTO the pettyCashDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pettyCashDTO,
     * or with status 400 (Bad Request) if the pettyCashDTO is not valid,
     * or with status 500 (Internal Server Error) if the pettyCashDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/petty-cashes")
    @Timed
    public ResponseEntity<PettyCashDTO> updatePettyCash(@Valid @RequestBody PettyCashDTO pettyCashDTO) throws URISyntaxException {
        log.debug("REST request to update PettyCash : {}", pettyCashDTO);
        if (pettyCashDTO.getId() == null) {
            return createPettyCash(pettyCashDTO);
        }
        PettyCashDTO result = pettyCashService.save(pettyCashDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pettyCashDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /petty-cashes : get all the pettyCashes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pettyCashes in body
     */
    @GetMapping("/petty-cashes")
    @Timed
    public List<PettyCashDTO> getAllPettyCashes() {
        log.debug("REST request to get all PettyCashes");
        return pettyCashService.findAll();
        }

    /**
     * GET  /petty-cashes/:id : get the "id" pettyCash.
     *
     * @param id the id of the pettyCashDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pettyCashDTO, or with status 404 (Not Found)
     */
    @GetMapping("/petty-cashes/{id}")
    @Timed
    public ResponseEntity<PettyCashDTO> getPettyCash(@PathVariable Long id) {
        log.debug("REST request to get PettyCash : {}", id);
        PettyCashDTO pettyCashDTO = pettyCashService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(pettyCashDTO));
    }

    /**
     * DELETE  /petty-cashes/:id : delete the "id" pettyCash.
     *
     * @param id the id of the pettyCashDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/petty-cashes/{id}")
    @Timed
    public ResponseEntity<Void> deletePettyCash(@PathVariable Long id) {
        log.debug("REST request to delete PettyCash : {}", id);
        pettyCashService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
