package com.ebank.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
public class RechargeTelephonique implements Serializable {
    @Id @GeneratedValue
    private Long numeroRechargeTelephonique;
    private BigDecimal montant;
    private Long codeCompte;
    @ManyToOne
    @JoinColumn(name = "Client")
    @JsonIgnore
    private Client client;

    public RechargeTelephonique() {
    }

    public RechargeTelephonique(BigDecimal montant, Client client, Long codeCompte) {
        this.montant = montant;
        this.client = client;
        this.codeCompte = codeCompte;
    }

    public Long getNumeroRechargeTelephonique() {
        return numeroRechargeTelephonique;
    }

    public void setNumeroRechargeTelephonique(Long numeroRechargeTelephonique) {
        this.numeroRechargeTelephonique = numeroRechargeTelephonique;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Long getCodeCompte() {
        return codeCompte;
    }

    public void setCodeCompte(Long codeCompte) {
        this.codeCompte = codeCompte;
    }
}
