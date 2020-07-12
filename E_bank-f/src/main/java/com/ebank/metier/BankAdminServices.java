package com.ebank.metier;

import com.ebank.dao.*;
import com.ebank.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Random;

@Service
@Transactional
public class BankAdminServices implements IBankAdminServices {

    @Autowired
    public AdminRepository adminRepository;
    @Autowired
    public AgenceRepository agenceRepository;
    @Autowired
    public AgentRepository agentRepository;
    @Autowired
    public ClientRepository clientRepository;
    @Autowired
    public CompteRepository compteRepository;
    @Autowired
    public ContratRepository contratRepository;
    @Autowired
    public OperationRepository operationRepository;
    @Autowired
    public RechargeTelephoniqueRepository rechargeTelephoniqueRepository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public Agent consulterAgent(Long codeAgent) {
        return agentRepository.getAgentByNumeroAgent(codeAgent);
    }

    @Override
    public Agence consulterAgence(Long codeAgence) {
        return agenceRepository.getAgenceByNumeroAgence(codeAgence);
    }

    @Override
    public Client consulterClient(Long codeClient) {
        return clientRepository.getClientByNumeroClient(codeClient);
    }

    @Override
    public Compte consulterCompte(Long codeCompte) {
        return compteRepository.getCompteByCodeCompte(codeCompte);
    }

    @Override
    public Agent saveAgent(Agent agent, Agence agence) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
        String password = passwordEncoder.encode(agent.getNom() + agent.getPrenom());
        password = password.substring(10, 16);
        Agent agent1 = new Agent(agent.getNom(), agent.getPrenom(), agent.getDateNaissance(), agent.getAdresse(), agent.getFonction(),
                agent.getStatusSocial(), agent.getCNI(), agent.getDateEmbauche(), agent.getSalaire(), agent.getDescription(), agence);
        agent1.setMotDePasse(password);
        agent.setMotDePasse(passwordEncoder.encode(password));
        Random rand = new Random();
        agent.setNomUtilisateur(agent.getNom() + "." + agent.getPrenom() + rand.nextInt(1000));
        agent = agentRepository.save(agent);
        User user = new User(agent.getNumeroAgent(), agent.getNomUtilisateur(), agent.getMotDePasse(), "AGENT");
        user.setId(agent.getNumeroAgent());
        System.out.println(user.getId());
        userRepository.save(user);
        agent1.setNomUtilisateur(user.getUsername());
        System.out.println(agent1.getNomUtilisateur());
        return agent1;
    }

    @Override
    public Agence saveAgence(String nomAgence, String adresse, String email, String fixe,
                             String tele, String description, Date dateCreation, String autorisation) {

        Agence agence = new Agence(nomAgence, adresse, email, fixe, tele, description, dateCreation, autorisation);

        return agenceRepository.save(agence);
    }

    @Override
    public void deleteAgent(Long codeAgent) {
        Agent agent = agentRepository.getAgentByNumeroAgent(codeAgent);
        if ((clientRepository.ClientsByAgent(codeAgent, PageRequest.of(0, 1))).isEmpty())  agentRepository.delete(agent);
        else { throw new RuntimeException("impossible Car l'agent a des clients") ;}
    }

    @Override
    public void deleteAgence(Long codeAgence) {
        Agence agence = agenceRepository.getAgenceByNumeroAgence(codeAgence);
        if (agentRepository.AgentsByAgence(codeAgence, PageRequest.of(0, 1)).isEmpty())  agenceRepository.delete(agence);
        else { throw new RuntimeException("impossible Car l'agence a des agents") ;}
    }

    @Override
    public Page<Agence> listAgence(int page, int size) {
        return agenceRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Page<Agent> listAgents(int page, int size) {
        return agentRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Page<Client> listClients(int page, int size) {
        return clientRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Page<Compte> listComptes(int page, int size) {
        return compteRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public Page<Operation> listOperationSelonCompte(Long codeCompte, int page, int size) {
        return operationRepository.OperationsByCompte(codeCompte, PageRequest.of(page, size));
    }

    @Override
    public Page<Agent> ListAgentSelonAgence(Long codeAgence, int page, int size) {
        return agentRepository.AgentsByAgence(codeAgence, PageRequest.of(page, size));
    }

    @Override
    public Page<Client> listClientSelonAgent(Long codeAgent, int page, int size) {
        return clientRepository.ClientsByAgent(codeAgent, PageRequest.of(page, size));
    }

    @Override
    public Page<Client> listClientSelonAgence(Long codeAgence, int page, int size) {
        return clientRepository.ClientByAgence(codeAgence, PageRequest.of(page, size));
    }

    @Override
    public void ActiverClient(Long codeClient) {
        Client client = clientRepository.getClientByNumeroClient(codeClient);
        client.setActive(true);
        clientRepository.save(client);
    }

    @Override
    public void SuspClient(Long codeClient) {
        Client client = clientRepository.getClientByNumeroClient(codeClient);
        client.setActive(false);
        clientRepository.save(client);
    }
}
