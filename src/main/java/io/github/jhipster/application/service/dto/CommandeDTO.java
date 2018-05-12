package io.github.jhipster.application.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Commande entity.
 */
public class CommandeDTO implements Serializable {

    private Long id;

    private Integer qtecommande;

    private LocalDate datecommande;

    private Float montant;

    private Long administrateurId;

    private Set<LivreDTO> livres = new HashSet<>();

    private Long fournisseurId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQtecommande() {
        return qtecommande;
    }

    public void setQtecommande(Integer qtecommande) {
        this.qtecommande = qtecommande;
    }

    public LocalDate getDatecommande() {
        return datecommande;
    }

    public void setDatecommande(LocalDate datecommande) {
        this.datecommande = datecommande;
    }

    public Float getMontant() {
        return montant;
    }

    public void setMontant(Float montant) {
        this.montant = montant;
    }

    public Long getAdministrateurId() {
        return administrateurId;
    }

    public void setAdministrateurId(Long administrateurId) {
        this.administrateurId = administrateurId;
    }

    public Set<LivreDTO> getLivres() {
        return livres;
    }

    public void setLivres(Set<LivreDTO> livres) {
        this.livres = livres;
    }

    public Long getFournisseurId() {
        return fournisseurId;
    }

    public void setFournisseurId(Long fournisseurId) {
        this.fournisseurId = fournisseurId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CommandeDTO commandeDTO = (CommandeDTO) o;
        if(commandeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commandeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommandeDTO{" +
            "id=" + getId() +
            ", qtecommande=" + getQtecommande() +
            ", datecommande='" + getDatecommande() + "'" +
            ", montant=" + getMontant() +
            "}";
    }
}
