package com.ebank.metier;

import com.ebank.entities.*;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;

public interface IBankAdminServices {

    public Agent consulterAgent(Long codeAgent);

    public Agence consulterAgence(Long codeAgence);

    public Client consulterClient(Long codeClient);

    public Compte consulterCompte(Long codeCompte);

    public Agent saveAgent(Agent agent, Agence agence);

    public Agence saveAgence(String nomAgence, String adresse, String email, String fixe,
                      String tele, String description, Date dateCreation,
                      String autorisation);

    public void deleteAgent(Long codeAgent);

    public void deleteAgence(Long codeAgence);

    public Page<Agence> listAgence(int page, int size);

    public Page<Agent> listAgents(int page, int size);

    public Page<Client> listClients(int page, int size);

    public Page<Compte> listComptes(int page, int size);

    public Page<Operation> listOperationSelonCompte(Long codeCompte, int page, int size);

    public Page<Agent> ListAgentSelonAgence(Long codeAgence, int page, int size);

    public Page<Client> listClientSelonAgent(Long codeAgent, int page, int size);

    public Page<Client> listClientSelonAgence(Long codeAgence, int page, int size);

    public void ActiverClient(Long codeClient);

    public void SuspClient(Long codeClient);

}
