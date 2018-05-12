package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Administrateur;

import io.github.jhipster.application.repository.AdministrateurRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.AdministrateurDTO;
import io.github.jhipster.application.service.mapper.AdministrateurMapper;
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
 * REST controller for managing Administrateur.
 */
@RestController
@RequestMapping("/api")
public class AdministrateurResource {

    private final Logger log = LoggerFactory.getLogger(AdministrateurResource.class);

    private static final String ENTITY_NAME = "administrateur";

    private final AdministrateurRepository administrateurRepository;

    private final AdministrateurMapper administrateurMapper;

    public AdministrateurResource(AdministrateurRepository administrateurRepository, AdministrateurMapper administrateurMapper) {
        this.administrateurRepository = administrateurRepository;
        this.administrateurMapper = administrateurMapper;
    }

    /**
     * POST  /administrateurs : Create a new administrateur.
     *
     * @param administrateurDTO the administrateurDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new administrateurDTO, or with status 400 (Bad Request) if the administrateur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/administrateurs")
    @Timed
    public ResponseEntity<AdministrateurDTO> createAdministrateur(@RequestBody AdministrateurDTO administrateurDTO) throws URISyntaxException {
        log.debug("REST request to save Administrateur : {}", administrateurDTO);
        if (administrateurDTO.getId() != null) {
            throw new BadRequestAlertException("A new administrateur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Administrateur administrateur = administrateurMapper.toEntity(administrateurDTO);
        administrateur = administrateurRepository.save(administrateur);
        AdministrateurDTO result = administrateurMapper.toDto(administrateur);
        return ResponseEntity.created(new URI("/api/administrateurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /administrateurs : Updates an existing administrateur.
     *
     * @param administrateurDTO the administrateurDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated administrateurDTO,
     * or with status 400 (Bad Request) if the administrateurDTO is not valid,
     * or with status 500 (Internal Server Error) if the administrateurDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/administrateurs")
    @Timed
    public ResponseEntity<AdministrateurDTO> updateAdministrateur(@RequestBody AdministrateurDTO administrateurDTO) throws URISyntaxException {
        log.debug("REST request to update Administrateur : {}", administrateurDTO);
        if (administrateurDTO.getId() == null) {
            return createAdministrateur(administrateurDTO);
        }
        Administrateur administrateur = administrateurMapper.toEntity(administrateurDTO);
        administrateur = administrateurRepository.save(administrateur);
        AdministrateurDTO result = administrateurMapper.toDto(administrateur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, administrateurDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /administrateurs : get all the administrateurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of administrateurs in body
     */
    @GetMapping("/administrateurs")
    @Timed
    public List<AdministrateurDTO> getAllAdministrateurs() {
        log.debug("REST request to get all Administrateurs");
        List<Administrateur> administrateurs = administrateurRepository.findAll();
        return administrateurMapper.toDto(administrateurs);
        }

    /**
     * GET  /administrateurs/:id : get the "id" administrateur.
     *
     * @param id the id of the administrateurDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the administrateurDTO, or with status 404 (Not Found)
     */
    @GetMapping("/administrateurs/{id}")
    @Timed
    public ResponseEntity<AdministrateurDTO> getAdministrateur(@PathVariable Long id) {
        log.debug("REST request to get Administrateur : {}", id);
        Administrateur administrateur = administrateurRepository.findOne(id);
        AdministrateurDTO administrateurDTO = administrateurMapper.toDto(administrateur);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(administrateurDTO));
    }

    /**
     * DELETE  /administrateurs/:id : delete the "id" administrateur.
     *
     * @param id the id of the administrateurDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/administrateurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteAdministrateur(@PathVariable Long id) {
        log.debug("REST request to delete Administrateur : {}", id);
        administrateurRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
