package io.github.jhipster.application.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Emprunt entity.
 */
public class EmpruntDTO implements Serializable {

    private Long id;

    private LocalDate dateemprunt;

    private LocalDate dateretourlimite;

    private Long livreId;

    private Long abonneId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateemprunt() {
        return dateemprunt;
    }

    public void setDateemprunt(LocalDate dateemprunt) {
        this.dateemprunt = dateemprunt;
    }

    public LocalDate getDateretourlimite() {
        return dateretourlimite;
    }

    public void setDateretourlimite(LocalDate dateretourlimite) {
        this.dateretourlimite = dateretourlimite;
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

        EmpruntDTO empruntDTO = (EmpruntDTO) o;
        if(empruntDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), empruntDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmpruntDTO{" +
            "id=" + getId() +
            ", dateemprunt='" + getDateemprunt() + "'" +
            ", dateretourlimite='" + getDateretourlimite() + "'" +
            "}";
    }
}
