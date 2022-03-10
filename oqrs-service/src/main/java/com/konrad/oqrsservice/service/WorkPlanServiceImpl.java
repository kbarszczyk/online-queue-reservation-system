package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.dto.WorkPlanUpdateDTO;
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

    @Override
    public void updateWorkPlan(Long resourceId, WorkPlanUpdateDTO workPlanUpdateDTO) {
        WorkPlan workPlan = getWorkPlanByResourceId(resourceId);
        workPlan.getMonday().setWorkingHours(workPlanUpdateDTO.getMonday());
        workPlan.getTuesday().setWorkingHours(workPlanUpdateDTO.getTuesday());
        workPlan.getThursday().setWorkingHours(workPlanUpdateDTO.getThursday());
        workPlan.getFriday().setWorkingHours(workPlanUpdateDTO.getFriday());
        if (workPlanUpdateDTO.getSaturday() != null && workPlanUpdateDTO.getSunday() != null) {
            workPlan.getSaturday().setWorkingHours(workPlanUpdateDTO.getSaturday());
            workPlan.getSunday().setWorkingHours(workPlanUpdateDTO.getSunday());
        }
        workPlanRepository.save(workPlan);
    }
}
