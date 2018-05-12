package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "livre")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Livre implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nomlivre")
    private String nomlivre;

    @Column(name = "auteur")
    private String auteur;

    @Column(name = "edition")
    private String edition;

    @Column(name = "dateedition")
    private LocalDate dateedition;

    @Column(name = "nbpages")
    private Integer nbpages;

    @ManyToOne
    private Categorie categorie;

    @ManyToMany(mappedBy = "livres")
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

    public String getNomlivre() {
        return nomlivre;
    }

    public Livre nomlivre(String nomlivre) {
        this.nomlivre = nomlivre;
        return this;
    }

    public void setNomlivre(String nomlivre) {
        this.nomlivre = nomlivre;
    }

    public String getAuteur() {
        return auteur;
    }

    public Livre auteur(String auteur) {
        this.auteur = auteur;
        return this;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public String getEdition() {
        return edition;
    }

    public Livre edition(String edition) {
        this.edition = edition;
        return this;
    }

    public void setEdition(String edition) {
        this.edition = edition;
    }

    public LocalDate getDateedition() {
        return dateedition;
    }

    public Livre dateedition(LocalDate dateedition) {
        this.dateedition = dateedition;
        return this;
    }

    public void setDateedition(LocalDate dateedition) {
        this.dateedition = dateedition;
    }

    public Integer getNbpages() {
        return nbpages;
    }

    public Livre nbpages(Integer nbpages) {
        this.nbpages = nbpages;
        return this;
    }

    public void setNbpages(Integer nbpages) {
        this.nbpages = nbpages;
    }

    public Categorie getCategorie() {
        return categorie;
    }

    public Livre categorie(Categorie categorie) {
        this.categorie = categorie;
        return this;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Set<Commande> getCommandes() {
        return commandes;
    }

    public Livre commandes(Set<Commande> commandes) {
        this.commandes = commandes;
        return this;
    }

    public Livre addCommande(Commande commande) {
        this.commandes.add(commande);
        commande.getLivres().add(this);
        return this;
    }

    public Livre removeCommande(Commande commande) {
        this.commandes.remove(commande);
        commande.getLivres().remove(this);
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
        Livre livre = (Livre) o;
        if (livre.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), livre.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Livre{" +
            "id=" + getId() +
            ", nomlivre='" + getNomlivre() + "'" +
            ", auteur='" + getAuteur() + "'" +
            ", edition='" + getEdition() + "'" +
            ", dateedition='" + getDateedition() + "'" +
            ", nbpages=" + getNbpages() +
            "}";
    }
}
