package io.github.jhipster.application.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Livre entity.
 */
public class LivreDTO implements Serializable {

    private Long id;

    private String nomlivre;

    private String auteur;

    private String edition;

    private LocalDate dateedition;

    private Integer nbpages;

    private Long categorieId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomlivre() {
        return nomlivre;
    }

    public void setNomlivre(String nomlivre) {
        this.nomlivre = nomlivre;
    }

    public String getAuteur() {
        return auteur;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public String getEdition() {
        return edition;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public LocalDate getDateedition() {
        return dateedition;
    }

    public void setDateedition(LocalDate dateedition) {
        this.dateedition = dateedition;
    }

    public Integer getNbpages() {
        return nbpages;
    }

    public void setNbpages(Integer nbpages) {
        this.nbpages = nbpages;
    }

    public Long getCategorieId() {
        return categorieId;
    }

    public void setCategorieId(Long categorieId) {
        this.categorieId = categorieId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LivreDTO livreDTO = (LivreDTO) o;
        if(livreDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), livreDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LivreDTO{" +
            "id=" + getId() +
            ", nomlivre='" + getNomlivre() + "'" +
            ", auteur='" + getAuteur() + "'" +
            ", edition='" + getEdition() + "'" +
            ", dateedition='" + getDateedition() + "'" +
            ", nbpages=" + getNbpages() +
            "}";
    }
}
