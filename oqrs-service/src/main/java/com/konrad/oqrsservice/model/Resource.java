package com.konrad.oqrsservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.konrad.oqrsservice.dto.ResourceCreateDTO;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@PrimaryKeyJoinColumn(name = "resource_id")
public class Resource extends BaseEntity {

    @NotNull
    private String name;

    @OneToMany(mappedBy = "resource")
    private List<Appointment> appointments;

    @OneToOne(mappedBy = "resource", cascade = CascadeType.ALL)
    @JsonIgnore
    private WorkPlan workPlan;

    @NotNull
    private boolean weekendsEnabled;

    @NotNull
    private int lengthOfVisit;

    @NotNull
    private int slots;

    public Resource() {
    }

    public Resource(ResourceCreateDTO dto,WorkPlan workPlan) {
        this.name= dto.getName();
        this.setWorkPlan(workPlan);
        workPlan.setResource(this);
        this.weekendsEnabled=dto.isWeekendsEnabled();
        this.lengthOfVisit= dto.getLengthOfVisit();
        this.slots= dto.getSlots();
    }
}
