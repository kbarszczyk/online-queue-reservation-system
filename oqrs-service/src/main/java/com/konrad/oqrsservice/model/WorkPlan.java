package com.konrad.oqrsservice.model;

import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.Data;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Data
@TypeDefs(@TypeDef(name = "json", typeClass = JsonStringType.class))
public class WorkPlan extends BaseEntity {

    @OneToOne
    @MapsId
    @JoinColumn(name = "resource_id")
    private Resource resource;


    @Type(type = "json")
    @Column(columnDefinition = "json", name = "monday")
    private DayPlan monday;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "tuesday")
    private DayPlan tuesday;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "wednesday")
    private DayPlan wednesday;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "thursday")
    private DayPlan thursday;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "friday")
    private DayPlan friday;

    public WorkPlan generateDefaultWorkPlan() {
        WorkPlan workPlan = new WorkPlan();
        LocalTime startHour = LocalTime.parse("8.00");
        LocalTime endHour = LocalTime.parse("16.00");

        TimePeriod defaultWorkHours = new TimePeriod(startHour, endHour);
        DayPlan defaultDayPlan = new DayPlan(defaultWorkHours);

        workPlan.setMonday(defaultDayPlan);
        workPlan.setTuesday(defaultDayPlan);
        workPlan.setWednesday(defaultDayPlan);
        workPlan.setThursday(defaultDayPlan);
        workPlan.setFriday(defaultDayPlan);

        return workPlan;
    }
}
