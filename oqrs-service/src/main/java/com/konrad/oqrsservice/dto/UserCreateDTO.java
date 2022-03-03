package com.konrad.oqrsservice.dto;

import lombok.Data;

@Data
public class UserCreateDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
}
