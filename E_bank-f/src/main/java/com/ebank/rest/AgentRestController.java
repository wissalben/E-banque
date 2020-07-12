package com.ebank.rest;

import com.ebank.dao.AgentRepository;
import com.ebank.dao.ClientRepository;
import com.ebank.dao.CompteRepository;
import com.ebank.dao.UserRepository;
import com.ebank.entities.*;
import com.ebank.metier.BankAdminServices;
import com.ebank.metier.BankAgentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/AGENT")
public class AgentRestController {

    @Autowired
    private BankAgentServices bankAgentServices;
    @Autowired
    private BankAdminServices bankAdminServices;
    @Autowired
    private AgentRepository agentRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private CompteRepository compteRepository;
    @Autowired
    private UserRepository userRepository ;

    //exemple      localhost:8050/AGENT/4
    @RequestMapping(value ="/{numeroAgent}")
    public Agent getAgent(
            @PathVariable Long numeroAgent) {
        return bankAdminServices.consulterAgent(numeroAgent);
    }
    // exemple:    localhost:8050/AGENT/currentAgent
    @RequestMapping("/currentAgent")
    public Agent currentSignedInAgent() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return agentRepository.findAgentByNomUtilisateur(username);
    }
    // exemple:    localhost:8050/AGENT/auth
    @RequestMapping("/auth")
    public String authenticationTest() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return "Hello "+username+ ", welcome back!";
    }
    // exemple:    localhost:8050/AGENT/4/clients?page=0&size=5
    @RequestMapping("/{numeroAgent}/clients")
    public Page<Client> clients(
            @PathVariable Long numeroAgent,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size) {
        return  bankAgentServices.listClients(numeroAgent, page, size);
    }
    // exemple:    localhost:8050/AGENT/currentAgent/clients
    @RequestMapping("currentAgent/clients")
    public Page<Client> clientsOfCurrentSignedInAgent(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size) {
        Agent agent = agentRepository.findAgentByNomUtilisateur(
                SecurityContextHolder.getContext().getAuthentication().getName());
        return bankAgentServices.listClients(agent.getNumeroAgent(), page, size);
    }
    // exemple:    localhost:8050/AGENT/client/5
    @RequestMapping("/client/{numeroClient}")
    public Client getClient(
            @PathVariable Long numeroClient){
        if(clientRepository.existsById(numeroClient)) {
            Client client = clientRepository.getClientByNumeroClient(numeroClient);
            if(client.getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                return bankAgentServices.consulterClient(numeroClient);
            else throw new RuntimeException("Vous n'avez pas le droit d'ajouter ce compte!");
        }
        else throw new RuntimeException("Le client n'existe pas!");
    }
    // exemple:    localhost:8050/AGENT/client/5/comptes
    @RequestMapping("/client/{numeroClient}/comptes")
    public Page<Compte> getComptes(
            @PathVariable Long numeroClient,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "20") int size) {

        return bankAgentServices.listComptes(numeroClient, page, size);
    }
    // exemple:    localhost:8050/AGENT/compte/4552000005
    @RequestMapping("/compte/{codeCompte}")
    public Compte getCompte(@PathVariable Long codeCompte) {
        if(compteRepository.existsById(codeCompte)) {
            Compte compte = compteRepository.getCompteByCodeCompte(codeCompte);
            Agent agent = agentRepository.findAgentByNomUtilisateur(SecurityContextHolder.getContext().getAuthentication().getName());
            if(compte.getClient().getAgent().getNomUtilisateur().equals(agent.getNomUtilisateur()))
                return bankAgentServices.consulterCompte(codeCompte);
            else throw new RuntimeException("Vous n'avez pas le droit d'acceder à ce compte");
        }
        else throw new RuntimeException("Ce compte n'existe pas!");

    }
   
    @RequestMapping("/compte/{codeCompte}/operations")
    public Page<Operation> getOperations(@PathVariable Long codeCompte,
                                         @RequestParam(name = "page", defaultValue = "0") int page,
                                         @RequestParam(name = "size", defaultValue = "5") int size) {
        if(compteRepository.existsById(codeCompte)) {
            Compte compte = compteRepository.getCompteByCodeCompte(codeCompte);
            Agent agent = agentRepository.findAgentByNomUtilisateur(SecurityContextHolder.getContext().getAuthentication().getName());
            if(compte.getClient().getAgent().getNomUtilisateur().equals(agent.getNomUtilisateur()))
                return bankAgentServices.listOperations(codeCompte, page, size);
            else throw new RuntimeException("Vous n'avez pas le droit d'acceder à ce compte");
        }
        else throw new RuntimeException("Ce compte n'existe pas!");
    }
    // exemple:    http://localhost:8050/AGENT/saveClient?nom=Ahmed&prenom=Said&dateNaissance=03/03/1985&adresse=ADRESSE&fonction=FONCTION&statusSocial=STATUSSOCIAL&CNI=EE5555555&numeroAgent=2
    @RequestMapping("/saveClient")
    public Client saveClient(@RequestParam(name = "nom") String nom,@RequestParam(name = "prenom") String prenom,
                             @RequestParam(name = "dateNaissance") String dateNaissance,@RequestParam(name = "adresse") String adresse,
                             @RequestParam(name = "fonction") String fonction,@RequestParam(name = "statusSocial") String statusSocial,
                             @RequestParam(name = "CNI") String CNI,@RequestParam(name = "numeroAgent") String numeroAgent) {
        Date date = null;
        try{
            date=new SimpleDateFormat("dd/MM/yyyy").parse(dateNaissance);
        }catch(Exception e) {e.printStackTrace();}
        return bankAgentServices.ajouterClient(nom, prenom, date, adresse, fonction, statusSocial, CNI, Long.parseLong(numeroAgent));
    }

    @RequestMapping("/modifierMotdePasse")
    public Client modifierMotdePasse(@RequestParam(name = "numeroClient") Long numeroClient) {
        if(!clientRepository.existsById(numeroClient))
            throw new RuntimeException("Client introuvable!");
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
        Client client = bankAgentServices.consulterClient(numeroClient);
        if(!client.getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
            throw new RuntimeException("Vous n'avez pas le droit d'acceder à ce client!");
        String password = passwordEncoder.encode(client.getNomUtilisateur());
        password = password.substring(10, 16);
        String password1 = password;
        client.setMotDePasse(passwordEncoder.encode(password));
        clientRepository.save(client);
        Client client1 = new Client();
        client1.setNomUtilisateur(client.getNomUtilisateur());
        client1.setMotDePasse(password1);
        User user = userRepository.findUserByUsername(client.getNomUtilisateur());
        user.setPassword(passwordEncoder.encode(password1));
        userRepository.save(user);
        return client1;
    }
    // exemple:      http://localhost:8050/AGENT/saveCompteCourant?solde=10.0&numeroClient=24&decouvert=200
    @RequestMapping("/saveCompteCourant")
    public Compte saveCompteCourant(@RequestParam(name = "solde") BigDecimal solde,
                                    @RequestParam(name = "numeroClient") String numeroClient,
                                    @RequestParam(name = "decouvert") double decouvert) {
        if(clientRepository.existsById(Long.parseLong(numeroClient))) {
            Client client = clientRepository.getClientByNumeroClient(Long.parseLong(numeroClient));
            if(client.getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                return bankAgentServices.ajouterCompteCourant(solde,true , Long.parseLong(numeroClient), decouvert);
            else throw new RuntimeException("Vous n'avez pas le droit d'ajouter ce compte!");
        }
        else throw new RuntimeException("Le client n'existe pas!");
    }
    // exemple:      http://localhost:8050/AGENT/saveCompteEpargne?solde=10.0&numeroClient=24&taux=2.0
    @RequestMapping("/saveCompteEpargne")
    public Compte saveCompteEpargne(@RequestParam(name = "solde") BigDecimal solde,
                                    @RequestParam(name = "numeroClient") String numeroClient,
                                    @RequestParam(name = "taux") double taux) {
        if(clientRepository.existsById(Long.parseLong(numeroClient))) {
            Client client = clientRepository.getClientByNumeroClient(Long.parseLong(numeroClient));
            if(client.getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                return bankAgentServices.ajouterCompteEpargne(solde,true , Long.parseLong(numeroClient), taux);
            else throw new RuntimeException("Vous n'avez pas le droit d'ajouter ce compte!");
        }
        else throw new RuntimeException("Le client n'existe pas!");
    }
    // exemple:      http://localhost:8050/AGENT/activerClient?numeroClient=5
    @RequestMapping("/activerClient")
    public void activerClient(@RequestParam(name = "numeroClient") Long numeroClient) {
        if(clientRepository.existsById(numeroClient)) {
            Client client = clientRepository.getClientByNumeroClient(numeroClient);
            if(client.getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                bankAgentServices.ActiverClient(numeroClient);
            else throw new RuntimeException("Vous n'avez pas le droit d'activer ce client!");
        }
        else throw new RuntimeException("Le client n'existe pas!");
    }
    // exemple:      http://localhost:8050/AGENT/suspendreClient?numeroClient=7
    @RequestMapping("/suspendreClient")
    public void suspendreClient(@RequestParam(name = "numeroClient") Long numeroClient) {
        if(clientRepository.existsById(numeroClient)) {
            Client client = clientRepository.getClientByNumeroClient(numeroClient);
            if(client.getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                bankAgentServices.SuspendreClient(numeroClient);
            else throw new RuntimeException("Vous n'avez pas le droit de suspendre ce client!");
        }
        else throw new RuntimeException("Le client n'existe pas!");
    }
    // exemple:      http://localhost:8050/AGENT/supprimerClient?numeroClient=7
    @RequestMapping("/supprimerClient")
    public void supprimerClient(@RequestParam(name = "numeroClient") Long numeroClient) {
        if(clientRepository.existsById(numeroClient)) {
            Client client = clientRepository.getClientByNumeroClient(numeroClient);
            if(client.getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                bankAgentServices.supprimerClient(numeroClient);
            else throw new RuntimeException("Vous n'avez pas le droit de supprimer ce client!");
        }
        else throw new RuntimeException("Le client n'existe pas!");
    }
    @RequestMapping("/activerCompte")
    public void activerCompte(@RequestParam(name = "codeCompte") Long codeCompte) {
        if(compteRepository.existsById(codeCompte))
        {
            Compte compte = compteRepository.getCompteByCodeCompte(codeCompte);
            if(compte.getClient().getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
                compte.setActif(true);
                compteRepository.save(compte);
            } else throw new RuntimeException("Vous n'avez pas le droit d'acceder a ce compte!");
        } else throw new RuntimeException("Ce compte n'existe pas!");
    }

    @RequestMapping("/suspendreCompte")
    public void suspendreCompte(@RequestParam(name = "codeCompte") Long codeCompte) {
        if(compteRepository.existsById(codeCompte))
        {
            Compte compte = compteRepository.getCompteByCodeCompte(codeCompte);
            if(compte.getClient().getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
                compte.setActif(false);
                compteRepository.save(compte);
            } else throw new RuntimeException("Vous n'avez pas le droit d'acceder a ce compte!");
        } else throw new RuntimeException("Ce compte n'existe pas!");
    }
    // exemple:      http://localhost:8050/AGENT/supprimerCompte?codeCompte=4586000005
    @RequestMapping("/supprimerCompte")
    public void supprimerCompte(@RequestParam(name = "codeCompte") Long codeCompte) {
        if(compteRepository.existsById(codeCompte)) {
            Compte compte = compteRepository.getCompteByCodeCompte(codeCompte);
            if(compte.getClient().getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                bankAgentServices.supprimerCompte(codeCompte);
            else throw new RuntimeException("Vous n'avez pas le droit de supprimer ce Compte!");
        }
        else throw new RuntimeException("Ce compte n'existe pas!");
    }
    // exemple:      http://localhost:8050/AGENT/Verser?codeCompte=4584000001&montant=500.0
    @RequestMapping("/Verser")
    public void verser(@RequestParam(name = "codeCompte") String codeCompte,
                       @RequestParam(name = "montant") BigDecimal montant) {
        if(compteRepository.existsById(Long.parseLong(codeCompte))) {
            Compte compte = compteRepository.getCompteByCodeCompte(Long.parseLong(codeCompte));
            if(compte.getClient().getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                bankAgentServices.verser(Long.parseLong(codeCompte), montant);
            else throw new RuntimeException("Vous n'avez pas le droit de supprimer ce Compte!");
        }
        else throw new RuntimeException("Ce compte n'existe pas!");
    }
    // exemple:      http://localhost:8050/AGENT/Retirer?codeCompte=4856000001&montant=400.0
    @RequestMapping("/Retirer")
    public void retirer(@RequestParam(name = "codeCompte") String codeCompte,
                        @RequestParam(name = "montant") BigDecimal montant) {
        if(compteRepository.existsById(Long.parseLong(codeCompte))) {
            Compte compte = compteRepository.getCompteByCodeCompte(Long.parseLong(codeCompte));
            if(compte.getClient().getAgent().getNomUtilisateur().equals(SecurityContextHolder.getContext().getAuthentication().getName()))
                bankAgentServices.retirer(Long.parseLong(codeCompte), montant);
            else throw new RuntimeException("Vous n'avez pas le droit de supprimer ce Compte!");
        }
        else throw new RuntimeException("Ce compte n'existe pas!");
    }
}
