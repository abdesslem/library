package io.github.jhipster.application.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * The Employee entity.
 */
@ApiModel(description = "The Employee entity.")
@Entity
@Table(name = "emprunt")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Emprunt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The firstname attribute.
     */
    @ApiModelProperty(value = "The firstname attribute.")
    @Column(name = "dateemprunt")
    private LocalDate dateemprunt;

    @Column(name = "dateretourlimite")
    private LocalDate dateretourlimite;

    @ManyToOne
    private Livre livre;

    @ManyToOne
    private Abonne abonne;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateemprunt() {
        return dateemprunt;
    }

    public Emprunt dateemprunt(LocalDate dateemprunt) {
        this.dateemprunt = dateemprunt;
        return this;
    }

    public void setDateemprunt(LocalDate dateemprunt) {
        this.dateemprunt = dateemprunt;
    }

    public LocalDate getDateretourlimite() {
        return dateretourlimite;
    }

    public Emprunt dateretourlimite(LocalDate dateretourlimite) {
        this.dateretourlimite = dateretourlimite;
        return this;
    }

    public void setDateretourlimite(LocalDate dateretourlimite) {
        this.dateretourlimite = dateretourlimite;
    }

    public Livre getLivre() {
        return livre;
    }

    public Emprunt livre(Livre livre) {
        this.livre = livre;
        return this;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }

    public Abonne getAbonne() {
        return abonne;
    }

    public Emprunt abonne(Abonne abonne) {
        this.abonne = abonne;
        return this;
    }

    public void setAbonne(Abonne abonne) {
        this.abonne = abonne;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Emprunt emprunt = (Emprunt) o;
        if (emprunt.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emprunt.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Emprunt{" +
            "id=" + getId() +
            ", dateemprunt='" + getDateemprunt() + "'" +
            ", dateretourlimite='" + getDateretourlimite() + "'" +
            "}";
    }
}
