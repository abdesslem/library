package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Commande;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Commande entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {
    @Query("select distinct commande from Commande commande left join fetch commande.livres")
    List<Commande> findAllWithEagerRelationships();

    @Query("select commande from Commande commande left join fetch commande.livres where commande.id =:id")
    Commande findOneWithEagerRelationships(@Param("id") Long id);

}
