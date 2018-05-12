package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Abonne;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Abonne entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AbonneRepository extends JpaRepository<Abonne, Long> {

}
