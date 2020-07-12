package com.ebank.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@DiscriminatorValue(value = "Retrait")
public class Retrait extends Operation {

    public Retrait() {
        super();
    }

    public Retrait(Date dateOperation, BigDecimal montant, Compte compte) {
        super(dateOperation, montant, compte, "Retrait");
    }
}
