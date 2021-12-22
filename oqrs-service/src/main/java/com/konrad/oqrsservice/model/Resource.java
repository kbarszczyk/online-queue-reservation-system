package com.konrad.oqrsservice.model;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
public class Resource extends BaseEntity {

    @NotNull
    private String name;

    @OneToMany(mappedBy = "resource")
    private List<Appointment> appointments;

    @OneToOne(mappedBy = "resource", cascade = CascadeType.ALL)
    private WorkPlan workPlan;
}
