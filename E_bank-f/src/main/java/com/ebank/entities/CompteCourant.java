package com.ebank.entities;

import com.sun.istack.NotNull;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;

@Entity
@DiscriminatorValue(value = "CC")
public class CompteCourant extends Compte {
    @NotNull
    private double decouvert;

    public CompteCourant() {
        super();
    }

    public CompteCourant(Date dateCreation, BigDecimal solde, boolean actif, Client client, double decouvert) {
        super(dateCreation, solde, actif, client);
        this.decouvert = decouvert;
    }

    public double getDecouvert() {
        return decouvert;
    }

    public void setDecouvert(double decouvert) {
        this.decouvert = decouvert;
    }
}
