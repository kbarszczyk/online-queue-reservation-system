package com.konrad.oqrsservice.dto;

import com.konrad.oqrsservice.model.WorkPlan;
import lombok.Data;

@Data
public class ResourceDTO extends BaseDTO {
    private String name;
    private WorkPlan workPlan;
    private boolean weekendsEnabled;
    private int lengthOfVisit;
}
