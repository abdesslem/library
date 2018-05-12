package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.AdministrateurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Administrateur and its DTO AdministrateurDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AdministrateurMapper extends EntityMapper<AdministrateurDTO, Administrateur> {


    @Mapping(target = "commandes", ignore = true)
    Administrateur toEntity(AdministrateurDTO administrateurDTO);

    default Administrateur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Administrateur administrateur = new Administrateur();
        administrateur.setId(id);
        return administrateur;
    }
}
