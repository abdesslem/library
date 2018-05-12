package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Fournisseur entity.
 */
public class FournisseurDTO implements Serializable {

    private Long id;

    private String nomfournisseur;

    private String adressefournisseur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomfournisseur() {
        return nomfournisseur;
    }

    public void setNomfournisseur(String nomfournisseur) {
        this.nomfournisseur = nomfournisseur;
    }

    public String getAdressefournisseur() {
        return adressefournisseur;
    }

    public void setAdressefournisseur(String adressefournisseur) {
        this.adressefournisseur = adressefournisseur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FournisseurDTO fournisseurDTO = (FournisseurDTO) o;
        if(fournisseurDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fournisseurDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FournisseurDTO{" +
            "id=" + getId() +
            ", nomfournisseur='" + getNomfournisseur() + "'" +
            ", adressefournisseur='" + getAdressefournisseur() + "'" +
            "}";
    }
}
