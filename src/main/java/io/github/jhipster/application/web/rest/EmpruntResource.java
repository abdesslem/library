package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Emprunt;

import io.github.jhipster.application.repository.EmpruntRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.EmpruntDTO;
import io.github.jhipster.application.service.mapper.EmpruntMapper;
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
 * REST controller for managing Emprunt.
 */
@RestController
@RequestMapping("/api")
public class EmpruntResource {

    private final Logger log = LoggerFactory.getLogger(EmpruntResource.class);

    private static final String ENTITY_NAME = "emprunt";

    private final EmpruntRepository empruntRepository;

    private final EmpruntMapper empruntMapper;

    public EmpruntResource(EmpruntRepository empruntRepository, EmpruntMapper empruntMapper) {
        this.empruntRepository = empruntRepository;
        this.empruntMapper = empruntMapper;
    }

    /**
     * POST  /emprunts : Create a new emprunt.
     *
     * @param empruntDTO the empruntDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new empruntDTO, or with status 400 (Bad Request) if the emprunt has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/emprunts")
    @Timed
    public ResponseEntity<EmpruntDTO> createEmprunt(@RequestBody EmpruntDTO empruntDTO) throws URISyntaxException {
        log.debug("REST request to save Emprunt : {}", empruntDTO);
        if (empruntDTO.getId() != null) {
            throw new BadRequestAlertException("A new emprunt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Emprunt emprunt = empruntMapper.toEntity(empruntDTO);
        emprunt = empruntRepository.save(emprunt);
        EmpruntDTO result = empruntMapper.toDto(emprunt);
        return ResponseEntity.created(new URI("/api/emprunts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /emprunts : Updates an existing emprunt.
     *
     * @param empruntDTO the empruntDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated empruntDTO,
     * or with status 400 (Bad Request) if the empruntDTO is not valid,
     * or with status 500 (Internal Server Error) if the empruntDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/emprunts")
    @Timed
    public ResponseEntity<EmpruntDTO> updateEmprunt(@RequestBody EmpruntDTO empruntDTO) throws URISyntaxException {
        log.debug("REST request to update Emprunt : {}", empruntDTO);
        if (empruntDTO.getId() == null) {
            return createEmprunt(empruntDTO);
        }
        Emprunt emprunt = empruntMapper.toEntity(empruntDTO);
        emprunt = empruntRepository.save(emprunt);
        EmpruntDTO result = empruntMapper.toDto(emprunt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, empruntDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /emprunts : get all the emprunts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emprunts in body
     */
    @GetMapping("/emprunts")
    @Timed
    public List<EmpruntDTO> getAllEmprunts() {
        log.debug("REST request to get all Emprunts");
        List<Emprunt> emprunts = empruntRepository.findAll();
        return empruntMapper.toDto(emprunts);
        }

    /**
     * GET  /emprunts/:id : get the "id" emprunt.
     *
     * @param id the id of the empruntDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the empruntDTO, or with status 404 (Not Found)
     */
    @GetMapping("/emprunts/{id}")
    @Timed
    public ResponseEntity<EmpruntDTO> getEmprunt(@PathVariable Long id) {
        log.debug("REST request to get Emprunt : {}", id);
        Emprunt emprunt = empruntRepository.findOne(id);
        EmpruntDTO empruntDTO = empruntMapper.toDto(emprunt);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(empruntDTO));
    }

    /**
     * DELETE  /emprunts/:id : delete the "id" emprunt.
     *
     * @param id the id of the empruntDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/emprunts/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmprunt(@PathVariable Long id) {
        log.debug("REST request to delete Emprunt : {}", id);
        empruntRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
