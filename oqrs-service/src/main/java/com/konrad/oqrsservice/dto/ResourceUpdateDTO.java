package com.konrad.oqrsservice.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ResourceUpdateDTO {

    @NotNull
    private String name;

    @NotNull
    private boolean weekendsEnabled;

    @NotNull
    private int lengthOfVisit;

    @NotNull
    private int slots;
}
