package com.ebank.entities;

import com.sun.istack.NotNull;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;

@Entity
@DiscriminatorValue(value = "CE")
public class CompteEpargne extends Compte {
    @NotNull
    private double taux;

    public CompteEpargne() {
        super();
    }

    public CompteEpargne(Date dateCreation, BigDecimal solde, boolean actif, Client client, double taux) {
        super(dateCreation, solde, actif, client);
        this.taux = taux;
    }

    public double getTaux() {
        return taux;
    }

    public void setTaux(double taux) {
        this.taux = taux;
    }
}
