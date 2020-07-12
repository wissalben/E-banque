package com.ebank.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.Random;

@Entity
public class Agent implements Serializable {
    @Id @GeneratedValue
    private Long numeroAgent;
    @NotNull
    @Length(min = 3, max = 30)
    private String nom;
    @NotNull
    @Length(min = 3, max = 30)
    private String prenom;
    private Date dateNaissance;
    @Length(min = 3, max = 30)
    private String adresse;
    @NotNull
    @Length(min = 5, max = 30)
    private String fonction;
    @Length(min = 5, max = 30)
    private String statusSocial;
    @NotNull
    @Length(min = 8, max = 30)
    private String CNI;
    private Date dateEmbauche;
    @NotNull
    private double salaire;
    @Length(min = 3, max = 30)
    private String description;
    private String nomUtilisateur;
    @JsonIgnore
    private String motDePasse;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "Agence")
    private Agence agence;
    @JsonIgnore
    @OneToMany(mappedBy = "agent")
    private Collection<Client> clients;

    public Agent(String nom, String prenom, Date dateNaissance, String adresse, String fonction, String statusSocial, String CNI, Date dateEmbauche, double salaire, String description, Agence agence) {
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.adresse = adresse;
        this.fonction = fonction;
        this.statusSocial = statusSocial;
        this.CNI = CNI;
        this.dateEmbauche = dateEmbauche;
        this.salaire = salaire;
        this.description = description;
        this.agence = agence;
        Random rand = new Random();
        if(nom != null && prenom != null) nomUtilisateur = nom + "." + prenom + rand.nextInt(1000);
    }

    public Agent() {

    }

    public Long getNumeroAgent() {
        return numeroAgent;
    }

    public void setNumeroAgent(Long numeroAgent) {
        this.numeroAgent = numeroAgent;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getFonction() {
        return fonction;
    }

    public void setFonction(String fonction) {
        this.fonction = fonction;
    }

    public String getStatusSocial() {
        return statusSocial;
    }

    public void setStatusSocial(String statusSocial) {
        this.statusSocial = statusSocial;
    }

    public String getCNI() {
        return CNI;
    }

    public void setCNI(String CNI) {
        this.CNI = CNI;
    }

    public Date getDateEmbauche() {
        return dateEmbauche;
    }

    public void setDateEmbauche(Date dateEmbauche) {
        this.dateEmbauche = dateEmbauche;
    }

    public double getSalaire() {
        return salaire;
    }

    public void setSalaire(double salaire) {
        this.salaire = salaire;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Agence getAgence() {
        return agence;
    }

    public void setAgence(Agence agence) {
        this.agence = agence;
    }

    public Collection<Client> getClients() {
        return clients;
    }

    public void setClients(Collection<Client> clients) {
        this.clients = clients;
    }

    public String getNomUtilisateur() {
        return nomUtilisateur;
    }

    public void setNomUtilisateur(String nomUtilisateur) {
        this.nomUtilisateur = nomUtilisateur;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
}
