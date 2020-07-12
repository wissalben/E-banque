package com.ebank.metier;

import com.ebank.dao.*;
import com.ebank.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;

@Service
@Transactional
public class BankAgentServices implements IBankAgentServices {
    @Autowired
    private ClientRepository clientRepository ;
    @Autowired
    private CompteRepository compteRepository ;
    @Autowired
    private OperationRepository operationRepository ;
    @Autowired
    private ContratRepository contratRepository ;
    @Autowired
    private AgentRepository agentRepository;
    @Autowired
    private RechargeTelephoniqueRepository rechargeTelephoniqueRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public Page<Client> listClients(Long numeroAgent, int p, int s) {
        PageRequest pageable = PageRequest.of(p,s)  ;
        return clientRepository.ClientsByAgent(numeroAgent,pageable)  ;
    }
    @Override
    public Page<Compte> listComptes(Long numeroClient, int p, int s) {
        PageRequest pageable = PageRequest.of(p,s)  ;
        return compteRepository.getCompteBynumeroClient(numeroClient,pageable)  ;
    }
    @Override
    public Page<Operation> listOperations(Long codeCompte, int p, int s) {
        PageRequest pageable = PageRequest.of(p,s)  ;
        return operationRepository.OperationsByCompte(codeCompte,pageable)  ;
    }
    @Override
    public void verser(Long codeCompte, BigDecimal montant) {
        Compte cp = consulterCompte(codeCompte);
        Versement v= new Versement(new Date(),montant, cp ) ;
        operationRepository.save(v);
        BigDecimal nouveausolde = (cp.getSolde()).add(montant);
        cp.setSolde(nouveausolde)  ;
    }
    @Override
    public void retirer(Long codeCompte, BigDecimal montant) {
        Compte cp = consulterCompte(codeCompte);
        Retrait r = new Retrait(new Date(), montant, cp);
        if ((cp.getSolde()).compareTo(montant) != 1) throw new RuntimeException("Operation impossible ");
        operationRepository.save(r);
        BigDecimal nouveausolde = (cp.getSolde()).subtract(montant);
        cp.setSolde(nouveausolde);
    }

    @Override
    public Client ajouterClient(String nom, String prenom, Date dateNaissance, String adresse, String fonction, String statusSocial, String CNI, Long numeroAgent) {
        Contrat contrat = new Contrat(new Date());
        Agent agent = agentRepository.getAgentByNumeroAgent(numeroAgent);
        Client client = new Client(nom,prenom,dateNaissance,adresse,fonction,statusSocial, CNI, agent,true,contrat) ;
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
        String password = passwordEncoder.encode(client.getNomUtilisateur());
        password = password.substring(10, 16);
        System.out.println(password);
        Client client1 = new Client(client.getNom(), client.getPrenom(), client.getDateNaissance(),
                client.getAdresse(), client.getFonction(), client.getStatusSocial(),
                client.getCNI(), client.getAgent(), true, client.getContrat());
        client1.setMotDePasse(password);
        client.setMotDePasse(passwordEncoder.encode(password));
        contratRepository.save(contrat);
        client = clientRepository.save(client);
        userRepository.save(new User(client.getNumeroClient(), client.getNomUtilisateur(), client.getMotDePasse(), "CLIENT"));
        client1.setNomUtilisateur(client.getNomUtilisateur());
        return client1;
    }

    @Override
    public void supprimerClient(Long numeroClient) {

        Client client = clientRepository.getClientByNumeroClient(numeroClient);
        clientRepository.delete(client);
        contratRepository.delete(client.getContrat());
    }

    @Override
    public Compte ajouterCompteCourant(BigDecimal solde, boolean actif, Long numeroClient, double decouvert) {
        Client client = clientRepository.getClientByNumeroClient(numeroClient);
        Compte compte = new CompteCourant(new Date(), solde , actif , client , decouvert);
        return compteRepository.save(compte);
    }

    @Override
    public Compte ajouterCompteEpargne(BigDecimal solde, boolean actif, Long numeroClient, double taux) {
        Client client = clientRepository.getClientByNumeroClient(numeroClient);
        Compte compte = new CompteEpargne(new Date(), solde , actif , client , taux);
        return compteRepository.save(compte);
    }

    @Override
    public void supprimerCompte(Long codeCompte) {
        Compte compte = compteRepository.getCompteByCodeCompte(codeCompte);
        compteRepository.delete(compte);
    }
    @Override
    public Contrat creerContrat() {
        return  new Contrat(new Date()) ;
    }

    @Override
    public Compte consulterCompte(Long codeCompte) {
        Compte cp = compteRepository.getCompteByCodeCompte(codeCompte);
        if (cp==null) throw  new RuntimeException("compte introuvable") ;
        return cp ;
    }
    @Override
    public Client consulterClient(Long numeroClient) {
        Client client = clientRepository.getClientByNumeroClient(numeroClient);
        if (client==null) throw  new RuntimeException("client introuvable") ;
        return client ;
    }

    @Override
    public void ActiverClient(Long numeroClient) {
        Client client = clientRepository.getClientByNumeroClient(numeroClient);
        client.setActive(true);
    }

    @Override
    public void SuspendreClient(Long numeroClient) {
        Client client = clientRepository.getClientByNumeroClient(numeroClient);
        client.setActive(false);
    }
}
