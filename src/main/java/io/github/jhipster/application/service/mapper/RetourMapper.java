package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.RetourDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Retour and its DTO RetourDTO.
 */
@Mapper(componentModel = "spring", uses = {LivreMapper.class, AbonneMapper.class})
public interface RetourMapper extends EntityMapper<RetourDTO, Retour> {

    @Mapping(source = "livre.id", target = "livreId")
    @Mapping(source = "abonne.id", target = "abonneId")
    RetourDTO toDto(Retour retour);

    @Mapping(source = "livreId", target = "livre")
    @Mapping(source = "abonneId", target = "abonne")
    Retour toEntity(RetourDTO retourDTO);

    default Retour fromId(Long id) {
        if (id == null) {
            return null;
        }
        Retour retour = new Retour();
        retour.setId(id);
        return retour;
    }
}
