package com.ebank.metier;

import com.ebank.dao.ClientRepository;
import com.ebank.dao.CompteRepository;
import com.ebank.dao.OperationRepository;
import com.ebank.dao.RechargeTelephoniqueRepository;
import com.ebank.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;

@Transactional
@Service
public class BankClientServices implements  IBankClientServices {
    @Autowired
    private ClientRepository clientRepository ;
    @Autowired
    private CompteRepository compteRepository ;
    @Autowired
    private OperationRepository  operationRepository ;
    @Autowired
    private RechargeTelephoniqueRepository rechargeTelephoniqueRepository ;
    @Override
    public Page<Compte> listComptes(Long numeroClient, int p, int s) {
        PageRequest pageable = PageRequest.of(p,s)  ;
        return compteRepository.getCompteBynumeroClient(numeroClient,pageable)  ;
    }
    @Override
    public Page<Operation> listOperations(Long codeCompte, int p, int s)
    {
        PageRequest pageable = PageRequest.of(p,s)  ;
        return operationRepository.OperationsByCompte(codeCompte,pageable)  ;
    }
    @Override
    public void virment(long codeCompte1, long codeCompte2, BigDecimal montant) {
        if(compteRepository.existsById(codeCompte2)) {
            Compte compte2 = consulterCompte(codeCompte2);
            Compte compte = consulterCompte(codeCompte1);
            if (compte instanceof CompteCourant) {
                double decouvert = ((CompteCourant) compte).getDecouvert();
                if(compte.getSolde().compareTo(montant.add(BigDecimal.valueOf(decouvert))) != 1)
                    throw new RuntimeException("Operation impossible");
            }
            if(compte instanceof CompteEpargne)
                if ((compte.getSolde()).compareTo(montant) != 1) throw new RuntimeException("Operation impossible ");
            BigDecimal nouveausolde = (compte.getSolde()).subtract(montant);
            compte.setSolde(nouveausolde);
            compteRepository.save(compte);
            BigDecimal nouveausolde2 = (compte2.getSolde()).add(montant);
            compte2.setSolde(nouveausolde2)  ;
            compteRepository.save(compte2);
            Operation virement = new Virement(new Date(), montant, compte, codeCompte2);
            operationRepository.save(virement);
        }
        else throw new RuntimeException("Compte de destinataire introuvable!");
    }

    @Override
    public void verser(Long codeCompte, BigDecimal montant) {
        Compte cp = consulterCompte(codeCompte);
        Versement v= new Versement(new Date(),montant, cp ) ;
        operationRepository.save(v);
        BigDecimal nouveausolde = (cp.getSolde()).add(montant);
        cp.setSolde(nouveausolde)  ;
        compteRepository.save(cp);
    }
    @Override
    public void retirer(Long codeCompte, BigDecimal montant) {
        Compte cp = consulterCompte(codeCompte);
        Retrait r = new Retrait(new Date(), montant, cp);
        if(cp instanceof CompteCourant) {
            double decouvert = ((CompteCourant)cp).getDecouvert();
            if(cp.getSolde().compareTo(montant.add(BigDecimal.valueOf(decouvert))) != 1)
                throw new RuntimeException("Operation impossible");
        }
        if(cp instanceof CompteEpargne)
            if ((cp.getSolde()).compareTo(montant) != 1) throw new RuntimeException("Operation impossible ");
        operationRepository.save(r);
        BigDecimal nouveausolde = (cp.getSolde()).subtract(montant);
        cp.setSolde(nouveausolde);
        compteRepository.save(cp);
    }
    @Override
    public void Recharger(Long numeroClient ,Long codeCompte, BigDecimal montant) {
        Compte compte = consulterCompte(codeCompte);
        Client client = clientRepository.getClientByNumeroClient(numeroClient);
        retirer(codeCompte, montant);
        RechargeTelephonique rechargeTelephonique = new RechargeTelephonique(montant, client, codeCompte);
        rechargeTelephoniqueRepository.save(rechargeTelephonique);
    }
    @Override
    public String monAgent(long numeroClient) {
        String nom = ((clientRepository.getClientByNumeroClient(numeroClient)).getAgent()).getNom();
        String prenom = ((clientRepository.getClientByNumeroClient(numeroClient)).getAgent()).getPrenom();
        String fullName = "Nom :"+nom+"Prenom :"+prenom ;
        return fullName ;
    }

    @Override
    public Page<RechargeTelephonique> getRecharges(Long numeroClient, int page, int size) {
        return rechargeTelephoniqueRepository.listRecharge(numeroClient, PageRequest.of(page, size));
    }

    @Override
    public Compte consulterCompte(Long codeCompte) {
        Compte cp = compteRepository.getCompteByCodeCompte(codeCompte);
        if (cp==null) throw  new RuntimeException("compte introuvable") ;
        return cp ;
    }


}
