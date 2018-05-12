package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.AbonneDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Abonne and its DTO AbonneDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AbonneMapper extends EntityMapper<AbonneDTO, Abonne> {



    default Abonne fromId(Long id) {
        if (id == null) {
            return null;
        }
        Abonne abonne = new Abonne();
        abonne.setId(id);
        return abonne;
    }
}
