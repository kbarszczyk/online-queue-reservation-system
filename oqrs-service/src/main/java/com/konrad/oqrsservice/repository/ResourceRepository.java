package com.konrad.oqrsservice.repository;

import com.konrad.oqrsservice.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
}
