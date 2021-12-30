package com.konrad.oqrsservice.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class ClientDTO extends BaseDTO{

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @Email
    private String email;

}
