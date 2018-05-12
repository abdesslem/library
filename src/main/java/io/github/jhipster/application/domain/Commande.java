package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Commande.
 */
@Entity
@Table(name = "commande")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Commande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "qtecommande")
    private Integer qtecommande;

    @Column(name = "datecommande")
    private LocalDate datecommande;

    @Column(name = "montant")
    private Float montant;

    @ManyToOne
    private Administrateur administrateur;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "commande_livre",
               joinColumns = @JoinColumn(name="commandes_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="livres_id", referencedColumnName="id"))
    private Set<Livre> livres = new HashSet<>();

    @ManyToOne
    private Fournisseur fournisseur;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQtecommande() {
        return qtecommande;
    }

    public Commande qtecommande(Integer qtecommande) {
        this.qtecommande = qtecommande;
        return this;
    }

    public void setQtecommande(Integer qtecommande) {
        this.qtecommande = qtecommande;
    }

    public LocalDate getDatecommande() {
        return datecommande;
    }

    public Commande datecommande(LocalDate datecommande) {
        this.datecommande = datecommande;
        return this;
    }

    public void setDatecommande(LocalDate datecommande) {
        this.datecommande = datecommande;
    }

    public Float getMontant() {
        return montant;
    }

    public Commande montant(Float montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(Float montant) {
        this.montant = montant;
    }

    public Administrateur getAdministrateur() {
        return administrateur;
    }

    public Commande administrateur(Administrateur administrateur) {
        this.administrateur = administrateur;
        return this;
    }

    public void setAdministrateur(Administrateur administrateur) {
        this.administrateur = administrateur;
    }

    public Set<Livre> getLivres() {
        return livres;
    }

    public Commande livres(Set<Livre> livres) {
        this.livres = livres;
        return this;
    }

    public Commande addLivre(Livre livre) {
        this.livres.add(livre);
        livre.getCommandes().add(this);
        return this;
    }

    public Commande removeLivre(Livre livre) {
        this.livres.remove(livre);
        livre.getCommandes().remove(this);
        return this;
    }

    public void setLivres(Set<Livre> livres) {
        this.livres = livres;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public Commande fournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
        return this;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
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
        Commande commande = (Commande) o;
        if (commande.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commande.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Commande{" +
            "id=" + getId() +
            ", qtecommande=" + getQtecommande() +
            ", datecommande='" + getDatecommande() + "'" +
            ", montant=" + getMontant() +
            "}";
    }
}
