package com.ebank.dao;

import com.ebank.entities.Operation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OperationRepository extends JpaRepository<Operation, Long> {

    @Query("select operation from Operation operation where operation.compte.codeCompte=:x order by operation.dateOperation desc")
    public Page<Operation> OperationsByCompte(@Param("x") Long codeCompte, Pageable pageable);
}
