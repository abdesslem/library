package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.LivreDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Livre and its DTO LivreDTO.
 */
@Mapper(componentModel = "spring", uses = {CategorieMapper.class})
public interface LivreMapper extends EntityMapper<LivreDTO, Livre> {

    @Mapping(source = "categorie.id", target = "categorieId")
    LivreDTO toDto(Livre livre);

    @Mapping(source = "categorieId", target = "categorie")
    @Mapping(target = "commandes", ignore = true)
    Livre toEntity(LivreDTO livreDTO);

    default Livre fromId(Long id) {
        if (id == null) {
            return null;
        }
        Livre livre = new Livre();
        livre.setId(id);
        return livre;
    }
}
