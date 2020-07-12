package com.ebank.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@DiscriminatorValue(value = "Versement")
public class Versement extends Operation {

    public Versement() {
        super();
    }

    public Versement(Date dateOperation, BigDecimal montant, Compte compte) {
        super(dateOperation, montant, compte, "Versement");
    }
}
