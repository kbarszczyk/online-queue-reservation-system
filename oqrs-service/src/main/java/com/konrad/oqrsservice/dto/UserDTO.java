package com.konrad.oqrsservice.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
}
