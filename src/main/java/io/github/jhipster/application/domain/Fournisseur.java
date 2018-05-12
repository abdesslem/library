package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Fournisseur.
 */
@Entity
@Table(name = "fournisseur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fournisseur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nomfournisseur")
    private String nomfournisseur;

    @Column(name = "adressefournisseur")
    private String adressefournisseur;

    @OneToMany(mappedBy = "fournisseur")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Commande> commandes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomfournisseur() {
        return nomfournisseur;
    }

    public Fournisseur nomfournisseur(String nomfournisseur) {
        this.nomfournisseur = nomfournisseur;
        return this;
    }

    public void setNomfournisseur(String nomfournisseur) {
        this.nomfournisseur = nomfournisseur;
    }

    public String getAdressefournisseur() {
        return adressefournisseur;
    }

    public Fournisseur adressefournisseur(String adressefournisseur) {
        this.adressefournisseur = adressefournisseur;
        return this;
    }

    public void setAdressefournisseur(String adressefournisseur) {
        this.adressefournisseur = adressefournisseur;
    }

    public Set<Commande> getCommandes() {
        return commandes;
    }

    public Fournisseur commandes(Set<Commande> commandes) {
        this.commandes = commandes;
        return this;
    }

    public Fournisseur addCommande(Commande commande) {
        this.commandes.add(commande);
        commande.setFournisseur(this);
        return this;
    }

    public Fournisseur removeCommande(Commande commande) {
        this.commandes.remove(commande);
        commande.setFournisseur(null);
        return this;
    }

    public void setCommandes(Set<Commande> commandes) {
        this.commandes = commandes;
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
        Fournisseur fournisseur = (Fournisseur) o;
        if (fournisseur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fournisseur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fournisseur{" +
            "id=" + getId() +
            ", nomfournisseur='" + getNomfournisseur() + "'" +
            ", adressefournisseur='" + getAdressefournisseur() + "'" +
            "}";
    }
}
