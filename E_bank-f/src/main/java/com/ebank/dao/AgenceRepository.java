package com.ebank.dao;

import com.ebank.entities.Agence;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgenceRepository extends JpaRepository<Agence, Long> {

    public Agence getAgenceByNumeroAgence(Long numAgence);
}
