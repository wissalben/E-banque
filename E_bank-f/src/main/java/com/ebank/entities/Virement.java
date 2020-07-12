package com.ebank.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@DiscriminatorValue(value = "Virement")
public class Virement extends Operation {

    private Long codeCompteDestinataire;

    public Virement() {
        super();
    }

    public Virement(Date dateOperation, BigDecimal montant, Compte compte, Long codeCompteDestinataire) {
        super(dateOperation, montant, compte, "Virement");
        this.codeCompteDestinataire = codeCompteDestinataire;
    }

    public Long getCodeCompteDestinataire() {
        return codeCompteDestinataire;
    }

    public void setCodeCompteDestinataire(Long codeCompteDestinataire) {
        this.codeCompteDestinataire = codeCompteDestinataire;
    }
}
