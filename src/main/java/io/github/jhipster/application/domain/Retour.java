package io.github.jhipster.application.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Task entity.
 * @author The JHipster team.
 */
@ApiModel(description = "Task entity. @author The JHipster team.")
@Entity
@Table(name = "retour")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Retour implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dateretour")
    private LocalDate dateretour;

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

    public LocalDate getDateretour() {
        return dateretour;
    }

    public Retour dateretour(LocalDate dateretour) {
        this.dateretour = dateretour;
        return this;
    }

    public void setDateretour(LocalDate dateretour) {
        this.dateretour = dateretour;
    }

    public Livre getLivre() {
        return livre;
    }

    public Retour livre(Livre livre) {
        this.livre = livre;
        return this;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }

    public Abonne getAbonne() {
        return abonne;
    }

    public Retour abonne(Abonne abonne) {
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
        Retour retour = (Retour) o;
        if (retour.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), retour.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Retour{" +
            "id=" + getId() +
            ", dateretour='" + getDateretour() + "'" +
            "}";
    }
}
