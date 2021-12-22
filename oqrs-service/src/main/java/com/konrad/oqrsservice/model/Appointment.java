package com.konrad.oqrsservice.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Data
public class Appointment extends BaseEntity{

    @NotNull
    private LocalDateTime start;

    @NotNull
    private LocalDateTime end;

    @ManyToOne
    @JoinColumn(name = "resource_id")
    private Resource resource;

    @OneToOne(mappedBy = "appointment")
    private Client client;

    private String reasonOfVisit;
}
