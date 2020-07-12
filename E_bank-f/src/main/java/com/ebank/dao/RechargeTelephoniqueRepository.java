package com.ebank.dao;

import com.ebank.entities.RechargeTelephonique;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RechargeTelephoniqueRepository extends JpaRepository<RechargeTelephonique, Long> {

    @Query("select recharge from RechargeTelephonique recharge where recharge.client.numeroClient=:x")
    public Page<RechargeTelephonique> listRecharge(@Param("x") Long numeroClient, Pageable pageable);
}
