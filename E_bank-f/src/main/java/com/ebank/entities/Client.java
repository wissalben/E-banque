package com.ebank.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import java.util.Random;

@Entity
public class Client implements Serializable {
    @Id @GeneratedValue
    private Long numeroClient;
    private String nom;
    private String prenom;
    private Date dateNaissance;
    private String adresse;
    private String fonction;
    private String statusSocial;
    private String CNI;
    private String nomUtilisateur;
    private String motDePasse;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "Agent")
    private Agent agent;
    @JsonIgnore
    @OneToMany(mappedBy = "client")
    private Collection<Compte> comptes;
    private boolean active;
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "NumeroContrat", referencedColumnName = "numeroContrat")
    private Contrat contrat;
    @JsonIgnore
    @OneToMany(mappedBy = "client")
    private Collection<RechargeTelephonique> rechargeTelephonique;

    public Client() {
    }

    public Client(String nom, String prenom, Date dateNaissance, String adresse, String fonction, String statusSocial, String CNI, Agent agent, boolean active, Contrat contrat) {
        this.nom = nom;
        this.prenom = prenom;
        this.dateNaissance = dateNaissance;
        this.adresse = adresse;
        this.fonction = fonction;
        this.statusSocial = statusSocial;
        this.CNI = CNI;
        this.agent = agent;
        this.active = active;
        this.contrat = contrat;
        Random rand = new Random();
        if(nom != null && prenom != null) nomUtilisateur = nom + "." + prenom + rand.nextInt(1000);
    }

    public Long getNumeroClient() {
        return numeroClient;
    }

    public void setNumeroClient(Long numeroClient) {
        this.numeroClient = numeroClient;
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

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    public Collection<Compte> getComptes() {
        return comptes;
    }

    public void setComptes(Collection<Compte> comptes) {
        this.comptes = comptes;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Contrat getContrat() {
        return contrat;
    }

    public void setContrat(Contrat contrat) {
        this.contrat = contrat;
    }

    public Collection<RechargeTelephonique> getRechargeTelephonique() {
        return rechargeTelephonique;
    }

    public void setRechargeTelephonique(Collection<RechargeTelephonique> rechargeTelephonique) {
        this.rechargeTelephonique = rechargeTelephonique;
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
