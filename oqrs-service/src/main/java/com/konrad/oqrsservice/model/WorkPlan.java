package com.konrad.oqrsservice.model;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Data;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.time.LocalTime;

@TypeDef(name = "json",typeClass = JsonType.class)
@Entity
@Data
public class WorkPlan {

    @Id
    @Column(name = "resource_id")
    private Long id;

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

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "saturday")
    private DayPlan saturday;

    @Type(type = "json")
    @Column(columnDefinition = "json", name = "sunday")
    private DayPlan sunday;


    public static WorkPlan generateDefaultWorkPlan() {
        WorkPlan workPlan = new WorkPlan();
        LocalTime startHour = LocalTime.parse("08:00");
        LocalTime endHour = LocalTime.parse("16:00");

        TimePeriod defaultWorkHours = new TimePeriod(startHour, endHour);
        DayPlan defaultDayPlan = new DayPlan(defaultWorkHours);


        workPlan.setMonday(defaultDayPlan);
        workPlan.setTuesday(defaultDayPlan);
        workPlan.setWednesday(defaultDayPlan);
        workPlan.setThursday(defaultDayPlan);
        workPlan.setFriday(defaultDayPlan);

        return workPlan;
    }

    public static WorkPlan generateDefaultWorkPlanWithWeekends() {
        WorkPlan workPlan = new WorkPlan();
        LocalTime startHour = LocalTime.parse("08:00");
        LocalTime endHour = LocalTime.parse("16:00");

        TimePeriod defaultWorkHours = new TimePeriod(startHour, endHour);
        DayPlan defaultDayPlan = new DayPlan(defaultWorkHours);

        LocalTime weekendStartHour = LocalTime.parse("08:00");
        LocalTime weekendEndHour = LocalTime.parse("12:00");

        TimePeriod weekendsWorkHours = new TimePeriod(weekendStartHour, weekendEndHour);
        DayPlan weekendDayPlan = new DayPlan(weekendsWorkHours);

        workPlan.setMonday(defaultDayPlan);
        workPlan.setTuesday(defaultDayPlan);
        workPlan.setWednesday(defaultDayPlan);
        workPlan.setThursday(defaultDayPlan);
        workPlan.setFriday(defaultDayPlan);
        workPlan.setSaturday(weekendDayPlan);
        workPlan.setSunday(weekendDayPlan);

        return workPlan;

    }

    public DayPlan getDay(String day) {
        switch (day) {
            case "monday":
                return monday;

            case "tuesday":
                return tuesday;

            case "wednesday":
                return wednesday;

            case "thursday":
                return thursday;

            case "friday":
                return friday;

            case "saturday":
                return saturday;

            case "sunday":
                return sunday;

            default:
                return null;
        }
    }
}
