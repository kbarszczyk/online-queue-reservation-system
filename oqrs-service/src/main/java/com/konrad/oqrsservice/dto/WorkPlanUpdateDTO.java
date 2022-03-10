package com.konrad.oqrsservice.dto;

import com.konrad.oqrsservice.model.TimePeriod;
import lombok.Data;

@Data
public class WorkPlanUpdateDTO {
    private TimePeriod monday;
    private TimePeriod tuesday;
    private TimePeriod wednesday;
    private TimePeriod thursday;
    private TimePeriod friday;
    private TimePeriod saturday;
    private TimePeriod sunday;
}
