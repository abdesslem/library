package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Retour;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Retour entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RetourRepository extends JpaRepository<Retour, Long> {

}
