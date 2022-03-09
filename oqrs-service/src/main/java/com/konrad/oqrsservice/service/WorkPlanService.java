package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.model.TimePeriod;
import com.konrad.oqrsservice.model.WorkPlan;

public interface WorkPlanService {
    void addBreakToWorkPlan(TimePeriod breakToAdd, Long resourceId, String dayOfWeek);

    WorkPlan getWorkPlanByResourceId(Long resourceId);

    void clearBreaks(Long resourceId, String dayOfWeek);
}
