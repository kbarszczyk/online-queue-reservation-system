package com.konrad.oqrsservice.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class Client extends BaseEntity {

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @Email
    private String email;

    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
}
