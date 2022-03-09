package com.konrad.oqrsservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@AllArgsConstructor
public class DayPlan {

    private TimePeriod workingHours;

    private List<TimePeriod> breaks;

    public DayPlan() {
        breaks = new ArrayList();
    }

    public DayPlan(TimePeriod workingHours) {
        this.workingHours = workingHours;
        this.breaks = new ArrayList();
    }

    public List<TimePeriod> getTimePeriodsWithBreaks() {
        List<TimePeriod> timePeriodsWithBreaks = new ArrayList<>();
        List<TimePeriod> breaks = getBreaks();

        if (!breaks.isEmpty()) {
            for (TimePeriod break1 : breaks) {
                TimePeriod periodFirst = new TimePeriod(break1.getEnd(), workingHours.getEnd());
                TimePeriod periodSecond = new TimePeriod(workingHours.getStart(), break1.getStart());
                timePeriodsWithBreaks.add(periodFirst);
                timePeriodsWithBreaks.add(periodSecond);
                Collections.sort(timePeriodsWithBreaks);
            }
        } else {
            timePeriodsWithBreaks.add(workingHours);
            Collections.sort(timePeriodsWithBreaks);
        }
        return timePeriodsWithBreaks;
    }


    public TimePeriod getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(TimePeriod workingHours) {
        this.workingHours = workingHours;
    }

    public List<TimePeriod> getBreaks() {
        return breaks;
    }

    public void setBreaks(List<TimePeriod> breaks) {
        this.breaks = breaks;
    }

    public void removeBreak(TimePeriod breakToRemove) {
        breaks.remove(breakToRemove);
    }

    public void addBreak(TimePeriod breakToAdd) {
        breaks.add(breakToAdd);
    }

    public void clearBreaks() {
        breaks.clear();
    }
}
