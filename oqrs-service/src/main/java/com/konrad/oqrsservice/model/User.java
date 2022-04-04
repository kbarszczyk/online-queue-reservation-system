package com.konrad.oqrsservice.model;

import lombok.Data;

import javax.persistence.Entity;
import java.io.Serializable;

@Data
@Entity
public class User extends BaseEntity implements Serializable {

    private String userId;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
    private String role;
    private String[] authorities;
    private boolean isActive;
    private boolean isNotLocked;
}
