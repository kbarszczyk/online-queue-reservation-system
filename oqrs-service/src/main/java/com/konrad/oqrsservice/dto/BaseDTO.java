package com.konrad.oqrsservice.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class BaseDTO implements Serializable {

    @NotNull
    private Long id;
}
