package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.model.TimePeriod;
import com.konrad.oqrsservice.model.WorkPlan;
import com.konrad.oqrsservice.repository.WorkPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkPlanServiceImpl implements WorkPlanService {

    private final WorkPlanRepository workPlanRepository;

    @Override
    public void addBreakToWorkPlan(TimePeriod breakToAdd, Long resourceId, String dayOfWeek) {
        WorkPlan workPlan = getWorkPlanByResourceId(resourceId);
        workPlan.getDay(dayOfWeek).getBreaks().add(breakToAdd);
        workPlanRepository.save(workPlan);
    }

    @Override
    public WorkPlan getWorkPlanByResourceId(Long resourceId) {
        return workPlanRepository.getWorkPlanByResourceId(resourceId);
    }

    @Override
    public void clearBreaks(Long resourceId, String dayOfWeek) {
        WorkPlan workPlan = getWorkPlanByResourceId(resourceId);
        workPlan.getDay(dayOfWeek).clearBreaks();
        workPlanRepository.save(workPlan);
    }
}
