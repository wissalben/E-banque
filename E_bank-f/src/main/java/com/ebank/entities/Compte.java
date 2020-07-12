package com.ebank.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import java.util.Random;

@Entity
@SequenceGenerator(name = "creditCard", sequenceName = "creditCardSequence", initialValue = 465800000, allocationSize = 1)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TypeCompte", discriminatorType = DiscriminatorType.STRING, length = 2)
public abstract class Compte implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "creditCard")
    private Long codeCompte;
    private Date dateCreation;
    @NotNull
    private BigDecimal solde;
    private boolean actif;
    @Length(min = 4, max = 4)
    private String pin;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "Client")
    private Client client;
    @JsonIgnore
    @OneToMany(mappedBy = "compte")
    private Collection<Operation> operations;

    public Compte() {
    }

    public Compte(Date dateCreation, BigDecimal solde, boolean actif, Client client) {
        this.dateCreation = dateCreation;
        this.solde = solde;
        this.actif = actif;
        this.client = client;
        Random random = new Random();
        this.pin = String.format("%04d", random.nextInt(10000));
    }

    public Long getCodeCompte() {
        return codeCompte;
    }

    public void setCodeCompte(Long codeCompte) {
        this.codeCompte = codeCompte;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public BigDecimal getSolde() {
        return solde;
    }

    public void setSolde(BigDecimal solde) {
        this.solde = solde;
    }

    public boolean isActif() {
        return actif;
    }

    public void setActif(boolean actif) {
        this.actif = actif;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Collection<Operation> getOperations() {
        return operations;
    }

    public void setOperations(Collection<Operation> operations) {
        this.operations = operations;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}
