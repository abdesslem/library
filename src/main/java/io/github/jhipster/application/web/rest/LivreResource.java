package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Livre;

import io.github.jhipster.application.repository.LivreRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.LivreDTO;
import io.github.jhipster.application.service.mapper.LivreMapper;
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
 * REST controller for managing Livre.
 */
@RestController
@RequestMapping("/api")
public class LivreResource {

    private final Logger log = LoggerFactory.getLogger(LivreResource.class);

    private static final String ENTITY_NAME = "livre";

    private final LivreRepository livreRepository;

    private final LivreMapper livreMapper;

    public LivreResource(LivreRepository livreRepository, LivreMapper livreMapper) {
        this.livreRepository = livreRepository;
        this.livreMapper = livreMapper;
    }

    /**
     * POST  /livres : Create a new livre.
     *
     * @param livreDTO the livreDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new livreDTO, or with status 400 (Bad Request) if the livre has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/livres")
    @Timed
    public ResponseEntity<LivreDTO> createLivre(@RequestBody LivreDTO livreDTO) throws URISyntaxException {
        log.debug("REST request to save Livre : {}", livreDTO);
        if (livreDTO.getId() != null) {
            throw new BadRequestAlertException("A new livre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Livre livre = livreMapper.toEntity(livreDTO);
        livre = livreRepository.save(livre);
        LivreDTO result = livreMapper.toDto(livre);
        return ResponseEntity.created(new URI("/api/livres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /livres : Updates an existing livre.
     *
     * @param livreDTO the livreDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated livreDTO,
     * or with status 400 (Bad Request) if the livreDTO is not valid,
     * or with status 500 (Internal Server Error) if the livreDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/livres")
    @Timed
    public ResponseEntity<LivreDTO> updateLivre(@RequestBody LivreDTO livreDTO) throws URISyntaxException {
        log.debug("REST request to update Livre : {}", livreDTO);
        if (livreDTO.getId() == null) {
            return createLivre(livreDTO);
        }
        Livre livre = livreMapper.toEntity(livreDTO);
        livre = livreRepository.save(livre);
        LivreDTO result = livreMapper.toDto(livre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, livreDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /livres : get all the livres.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of livres in body
     */
    @GetMapping("/livres")
    @Timed
    public List<LivreDTO> getAllLivres() {
        log.debug("REST request to get all Livres");
        List<Livre> livres = livreRepository.findAll();
        return livreMapper.toDto(livres);
        }

    /**
     * GET  /livres/:id : get the "id" livre.
     *
     * @param id the id of the livreDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the livreDTO, or with status 404 (Not Found)
     */
    @GetMapping("/livres/{id}")
    @Timed
    public ResponseEntity<LivreDTO> getLivre(@PathVariable Long id) {
        log.debug("REST request to get Livre : {}", id);
        Livre livre = livreRepository.findOne(id);
        LivreDTO livreDTO = livreMapper.toDto(livre);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(livreDTO));
    }

    /**
     * DELETE  /livres/:id : delete the "id" livre.
     *
     * @param id the id of the livreDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/livres/{id}")
    @Timed
    public ResponseEntity<Void> deleteLivre(@PathVariable Long id) {
        log.debug("REST request to delete Livre : {}", id);
        livreRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
