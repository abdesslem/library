package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.EmpruntDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Emprunt and its DTO EmpruntDTO.
 */
@Mapper(componentModel = "spring", uses = {LivreMapper.class, AbonneMapper.class})
public interface EmpruntMapper extends EntityMapper<EmpruntDTO, Emprunt> {

    @Mapping(source = "livre.id", target = "livreId")
    @Mapping(source = "abonne.id", target = "abonneId")
    EmpruntDTO toDto(Emprunt emprunt);

    @Mapping(source = "livreId", target = "livre")
    @Mapping(source = "abonneId", target = "abonne")
    Emprunt toEntity(EmpruntDTO empruntDTO);

    default Emprunt fromId(Long id) {
        if (id == null) {
            return null;
        }
        Emprunt emprunt = new Emprunt();
        emprunt.setId(id);
        return emprunt;
    }
}
