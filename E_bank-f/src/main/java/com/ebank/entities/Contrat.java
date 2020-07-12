package com.ebank.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Contrat implements Serializable {
    @Id @GeneratedValue
    private Long numeroContrat;
    private Date dateCreation;

    public Contrat() {
    }

    public Contrat(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Long getNumeroContrat() {
        return numeroContrat;
    }

    public void setNumeroContrat(Long numeroContrat) {
        this.numeroContrat = numeroContrat;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }
}
