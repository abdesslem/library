package io.github.jhipster.application.service.dto;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Categorie entity.
 */
public class CategorieDTO implements Serializable {

    private Long id;

    private String nomcategorie;

    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomcategorie() {
        return nomcategorie;
    }

    public void setNomcategorie(String nomcategorie) {
        this.nomcategorie = nomcategorie;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CategorieDTO categorieDTO = (CategorieDTO) o;
        if(categorieDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), categorieDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CategorieDTO{" +
            "id=" + getId() +
            ", nomcategorie='" + getNomcategorie() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
