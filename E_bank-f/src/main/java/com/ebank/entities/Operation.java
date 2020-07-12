package com.ebank.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TypeOperation", discriminatorType = DiscriminatorType.STRING, length = 10)
public abstract class Operation implements Serializable {
    @Id @GeneratedValue
    private Long numeroOperation;
    private Date dateOperation;
    private BigDecimal montant;
    private String typeOp;
    @ManyToOne
    @JoinColumn(name = "Compte")
    @JsonIgnore
    private Compte compte;

    public Operation() {
    }

    public Operation(Date dateOperation, BigDecimal montant, Compte compte, String typeOp) {
        this.dateOperation = dateOperation;
        this.montant = montant;
        this.compte = compte;
        this.typeOp = typeOp;
    }

    public Long getNumeroOperation() {
        return numeroOperation;
    }

    public void setNumeroOperation(Long numeroOperation) {
        this.numeroOperation = numeroOperation;
    }

    public Date getDateOperation() {
        return dateOperation;
    }

    public void setDateOperation(Date dateOperation) {
        this.dateOperation = dateOperation;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public Compte getCompte() {
        return compte;
    }

    public void setCompte(Compte compte) {
        this.compte = compte;
    }

    public String getTypeOp() {
        return typeOp;
    }

    public void setTypeOp(String typeOp) {
        this.typeOp = typeOp;
    }
}
