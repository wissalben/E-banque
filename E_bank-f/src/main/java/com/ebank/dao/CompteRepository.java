package com.ebank.dao;

import com.ebank.entities.Compte;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompteRepository extends JpaRepository<Compte, Long> {

    public Compte getCompteByCodeCompte(Long codeCompte);

    @Query("select compte from Compte compte where compte.client.numeroClient=:x")
    public Page<Compte> getCompteBynumeroClient(@Param("x") Long codeClient, Pageable pageable);
}
