package com.konrad.oqrsservice.repository;

import com.konrad.oqrsservice.model.WorkPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkPlanRepository extends JpaRepository<WorkPlan, Long> {
    WorkPlan getWorkPlanByResourceId(Long resourceId);
}
