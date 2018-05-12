package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Retour;

import io.github.jhipster.application.repository.RetourRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.RetourDTO;
import io.github.jhipster.application.service.mapper.RetourMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Retour.
 */
@RestController
@RequestMapping("/api")
public class RetourResource {

    private final Logger log = LoggerFactory.getLogger(RetourResource.class);

    private static final String ENTITY_NAME = "retour";

    private final RetourRepository retourRepository;

    private final RetourMapper retourMapper;

    public RetourResource(RetourRepository retourRepository, RetourMapper retourMapper) {
        this.retourRepository = retourRepository;
        this.retourMapper = retourMapper;
    }

    /**
     * POST  /retours : Create a new retour.
     *
     * @param retourDTO the retourDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new retourDTO, or with status 400 (Bad Request) if the retour has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/retours")
    @Timed
    public ResponseEntity<RetourDTO> createRetour(@RequestBody RetourDTO retourDTO) throws URISyntaxException {
        log.debug("REST request to save Retour : {}", retourDTO);
        if (retourDTO.getId() != null) {
            throw new BadRequestAlertException("A new retour cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Retour retour = retourMapper.toEntity(retourDTO);
        retour = retourRepository.save(retour);
        RetourDTO result = retourMapper.toDto(retour);
        return ResponseEntity.created(new URI("/api/retours/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /retours : Updates an existing retour.
     *
     * @param retourDTO the retourDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated retourDTO,
     * or with status 400 (Bad Request) if the retourDTO is not valid,
     * or with status 500 (Internal Server Error) if the retourDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/retours")
    @Timed
    public ResponseEntity<RetourDTO> updateRetour(@RequestBody RetourDTO retourDTO) throws URISyntaxException {
        log.debug("REST request to update Retour : {}", retourDTO);
        if (retourDTO.getId() == null) {
            return createRetour(retourDTO);
        }
        Retour retour = retourMapper.toEntity(retourDTO);
        retour = retourRepository.save(retour);
        RetourDTO result = retourMapper.toDto(retour);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, retourDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /retours : get all the retours.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of retours in body
     */
    @GetMapping("/retours")
    @Timed
    public List<RetourDTO> getAllRetours() {
        log.debug("REST request to get all Retours");
        List<Retour> retours = retourRepository.findAll();
        return retourMapper.toDto(retours);
        }

    /**
     * GET  /retours/:id : get the "id" retour.
     *
     * @param id the id of the retourDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the retourDTO, or with status 404 (Not Found)
     */
    @GetMapping("/retours/{id}")
    @Timed
    public ResponseEntity<RetourDTO> getRetour(@PathVariable Long id) {
        log.debug("REST request to get Retour : {}", id);
        Retour retour = retourRepository.findOne(id);
        RetourDTO retourDTO = retourMapper.toDto(retour);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(retourDTO));
    }

    /**
     * DELETE  /retours/:id : delete the "id" retour.
     *
     * @param id the id of the retourDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/retours/{id}")
    @Timed
    public ResponseEntity<Void> deleteRetour(@PathVariable Long id) {
        log.debug("REST request to delete Retour : {}", id);
        retourRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
