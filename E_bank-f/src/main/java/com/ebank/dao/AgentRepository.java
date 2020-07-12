package com.ebank.dao;

import com.ebank.entities.Agent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AgentRepository extends JpaRepository<Agent, Long> {

    public Agent getAgentByNumeroAgent(Long numAgent);

    @Query("select agent from Agent agent where agent.agence.numeroAgence=:x")
    public Page<Agent> AgentsByAgence(@Param("x") Long numAgence, Pageable pageable);

    public Agent findAgentByNomUtilisateur(String username);
}
