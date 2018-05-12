package io.github.jhipster.application.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Retour entity.
 */
public class RetourDTO implements Serializable {

    private Long id;

    private LocalDate dateretour;

    private Long livreId;

    private Long abonneId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateretour() {
        return dateretour;
    }

    public void setDateretour(LocalDate dateretour) {
        this.dateretour = dateretour;
    }

    public Long getLivreId() {
        return livreId;
    }

    public void setLivreId(Long livreId) {
        this.livreId = livreId;
    }

    public Long getAbonneId() {
        return abonneId;
    }

    public void setAbonneId(Long abonneId) {
        this.abonneId = abonneId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RetourDTO retourDTO = (RetourDTO) o;
        if(retourDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), retourDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RetourDTO{" +
            "id=" + getId() +
            ", dateretour='" + getDateretour() + "'" +
            "}";
    }
}
