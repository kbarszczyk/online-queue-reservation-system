package com.konrad.oqrsservice.dto;

import lombok.Data;

@Data
public class ResourceDTO extends BaseDTO {
    private String name;
    private boolean weekendsEnabled;
    private int lengthOfVisit;
}
