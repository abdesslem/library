package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Abonne;

import io.github.jhipster.application.repository.AbonneRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.AbonneDTO;
import io.github.jhipster.application.service.mapper.AbonneMapper;
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
 * REST controller for managing Abonne.
 */
@RestController
@RequestMapping("/api")
public class AbonneResource {

    private final Logger log = LoggerFactory.getLogger(AbonneResource.class);

    private static final String ENTITY_NAME = "abonne";

    private final AbonneRepository abonneRepository;

    private final AbonneMapper abonneMapper;

    public AbonneResource(AbonneRepository abonneRepository, AbonneMapper abonneMapper) {
        this.abonneRepository = abonneRepository;
        this.abonneMapper = abonneMapper;
    }

    /**
     * POST  /abonnes : Create a new abonne.
     *
     * @param abonneDTO the abonneDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new abonneDTO, or with status 400 (Bad Request) if the abonne has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/abonnes")
    @Timed
    public ResponseEntity<AbonneDTO> createAbonne(@RequestBody AbonneDTO abonneDTO) throws URISyntaxException {
        log.debug("REST request to save Abonne : {}", abonneDTO);
        if (abonneDTO.getId() != null) {
            throw new BadRequestAlertException("A new abonne cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Abonne abonne = abonneMapper.toEntity(abonneDTO);
        abonne = abonneRepository.save(abonne);
        AbonneDTO result = abonneMapper.toDto(abonne);
        return ResponseEntity.created(new URI("/api/abonnes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /abonnes : Updates an existing abonne.
     *
     * @param abonneDTO the abonneDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated abonneDTO,
     * or with status 400 (Bad Request) if the abonneDTO is not valid,
     * or with status 500 (Internal Server Error) if the abonneDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/abonnes")
    @Timed
    public ResponseEntity<AbonneDTO> updateAbonne(@RequestBody AbonneDTO abonneDTO) throws URISyntaxException {
        log.debug("REST request to update Abonne : {}", abonneDTO);
        if (abonneDTO.getId() == null) {
            return createAbonne(abonneDTO);
        }
        Abonne abonne = abonneMapper.toEntity(abonneDTO);
        abonne = abonneRepository.save(abonne);
        AbonneDTO result = abonneMapper.toDto(abonne);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, abonneDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /abonnes : get all the abonnes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of abonnes in body
     */
    @GetMapping("/abonnes")
    @Timed
    public List<AbonneDTO> getAllAbonnes() {
        log.debug("REST request to get all Abonnes");
        List<Abonne> abonnes = abonneRepository.findAll();
        return abonneMapper.toDto(abonnes);
        }

    /**
     * GET  /abonnes/:id : get the "id" abonne.
     *
     * @param id the id of the abonneDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the abonneDTO, or with status 404 (Not Found)
     */
    @GetMapping("/abonnes/{id}")
    @Timed
    public ResponseEntity<AbonneDTO> getAbonne(@PathVariable Long id) {
        log.debug("REST request to get Abonne : {}", id);
        Abonne abonne = abonneRepository.findOne(id);
        AbonneDTO abonneDTO = abonneMapper.toDto(abonne);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(abonneDTO));
    }

    /**
     * DELETE  /abonnes/:id : delete the "id" abonne.
     *
     * @param id the id of the abonneDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/abonnes/{id}")
    @Timed
    public ResponseEntity<Void> deleteAbonne(@PathVariable Long id) {
        log.debug("REST request to delete Abonne : {}", id);
        abonneRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
