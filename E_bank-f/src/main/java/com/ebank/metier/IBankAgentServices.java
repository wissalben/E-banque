package com.ebank.metier;

import com.ebank.entities.*;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.Date;

public interface IBankAgentServices {
    public Page<Client> listClients (Long numeroAgent , int page , int size);
    public Page<Compte> listComptes (Long numeroClient , int page , int size);
    public Page<Operation> listOperations (Long codeCompte , int page , int size);
    public  void  verser ( Long codeCompte , BigDecimal montant ) ;
    public  void  retirer ( Long codeCompte, BigDecimal montant ) ;
    public Client  ajouterClient (String nom, String prenom, Date dateNaissance, String adresse,
                                String fonction, String statusSocial, String CNI,
                                Long numeroAgent) ;
    public void  supprimerClient(Long numeroClient) ;
    public Compte  ajouterCompteCourant (BigDecimal solde, boolean actif, Long numeroClient , double decouvert) ;
    public Compte  ajouterCompteEpargne (BigDecimal solde, boolean actif, Long numeroClient , double taux) ;
    public void  supprimerCompte(Long codeCompte) ;
    public Contrat creerContrat();
    public Compte consulterCompte  (Long codeCompte) ;
    public Client consulterClient  (Long numeroClient) ;
    public void ActiverClient(Long numeroClient);
    public void SuspendreClient(Long numeroClient);
}
