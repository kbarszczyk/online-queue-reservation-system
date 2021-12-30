package com.konrad.oqrsservice.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.konrad.oqrsservice.utils.AppointmentSerializer;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Data
@JsonSerialize(using = AppointmentSerializer.class)
public class Appointment extends BaseEntity implements Comparable<Appointment> {

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime start;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime end;

    @ManyToOne
    @JoinColumn(name = "resource_id")
    private Resource resource;

    @OneToOne(mappedBy = "appointment",cascade = CascadeType.ALL)
    private Client client;

    private String reasonOfVisit;

    @Override
    public int compareTo(Appointment o) {
        return this.getStart().compareTo(o.getStart());
    }
}
