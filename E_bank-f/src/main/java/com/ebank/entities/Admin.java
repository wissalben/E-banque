package com.ebank.entities;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Admin implements Serializable {
    @Id @Length(max = 50)
    private String nomUtilisateur;
    private String prenom;
    private String nom;
    @Length(min = 6)
    private String motDePasse;

    public Admin() {
    }

    public Admin(String nomUtilisateur, String prenom, String nom, String motDePasse) {
        this.nomUtilisateur = nomUtilisateur;
        this.prenom = prenom;
        this.nom = nom;
        this.motDePasse = motDePasse;
    }

    public String getNomUtilisateur() {
        return nomUtilisateur;
    }

    public void setNomUtilisateur(String nomUtilisateur) {
        this.nomUtilisateur = nomUtilisateur;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
}
