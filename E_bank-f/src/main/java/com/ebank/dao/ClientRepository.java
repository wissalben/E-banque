package com.ebank.dao;

import com.ebank.entities.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ClientRepository extends JpaRepository<Client, Long> {

    public Client getClientByNumeroClient(Long numClient);

    @Query("select client from Client client where client.agent.numeroAgent=:x")
    public Page<Client> ClientsByAgent(@Param("x") Long numAgent, Pageable pageable);

    @Query("select client from Client client where client.agent.agence.numeroAgence=:x")
    public Page<Client> ClientByAgence(@Param("x") Long numAgence, Pageable pageable);

    public Client findClientByNomUtilisateur(String username);
}
