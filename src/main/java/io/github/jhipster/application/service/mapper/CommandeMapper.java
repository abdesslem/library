package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.CommandeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Commande and its DTO CommandeDTO.
 */
@Mapper(componentModel = "spring", uses = {AdministrateurMapper.class, LivreMapper.class, FournisseurMapper.class})
public interface CommandeMapper extends EntityMapper<CommandeDTO, Commande> {

    @Mapping(source = "administrateur.id", target = "administrateurId")
    @Mapping(source = "fournisseur.id", target = "fournisseurId")
    CommandeDTO toDto(Commande commande);

    @Mapping(source = "administrateurId", target = "administrateur")
    @Mapping(source = "fournisseurId", target = "fournisseur")
    Commande toEntity(CommandeDTO commandeDTO);

    default Commande fromId(Long id) {
        if (id == null) {
            return null;
        }
        Commande commande = new Commande();
        commande.setId(id);
        return commande;
    }
}
