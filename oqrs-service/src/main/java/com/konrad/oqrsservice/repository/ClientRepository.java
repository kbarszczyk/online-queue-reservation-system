package com.konrad.oqrsservice.repository;

import com.konrad.oqrsservice.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
}
