package com.ebank.metier;

import com.ebank.entities.Compte;
import com.ebank.entities.Operation;
import com.ebank.entities.RechargeTelephonique;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;

public interface IBankClientServices {
    public Page<Compte> listComptes(Long numeroClient, int page, int size);
    public Page<Operation> listOperations(Long codeCompte, int page, int size);
    public  void  virment ( long codeCompte1,long codeCompte , BigDecimal montant ) ;
    public Compte consulterCompte (Long codeCompte) ;
    public  void  verser ( Long codeCompte , BigDecimal montant ) ;
    public  void  retirer ( Long codeCompte, BigDecimal montant ) ;
    public void  Recharger (Long numeroClient ,Long codeCompte , BigDecimal montant) ;
    public  String  monAgent (long numeroClient);
    public Page<RechargeTelephonique> getRecharges(Long numeroClient, int page, int size);
}