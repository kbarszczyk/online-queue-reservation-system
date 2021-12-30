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
        List<TimePeriod> timePeriodWithBreaks = new ArrayList<>();
        timePeriodWithBreaks.add(getWorkingHours());
        List<TimePeriod> breaks = getBreaks();

        if (!breaks.isEmpty()) {
            ArrayList<TimePeriod> toAdd = new ArrayList();
            for (TimePeriod breakItem : breaks) {
                if (breakItem.getStart().isBefore(workingHours.getStart())) {
                    breakItem.setStart(workingHours.getStart());
                }
                if (breakItem.getEnd().isAfter(workingHours.getEnd())) {
                    breakItem.setEnd(workingHours.getEnd());
                }
                for (TimePeriod period : timePeriodWithBreaks) {
                    if (breakItem.getStart().equals(period.getStart()) && breakItem.getEnd().isAfter(period.getStart()) && breakItem.getEnd().isBefore(period.getEnd())) {
                        period.setStart(breakItem.getEnd());
                    }
                    if (breakItem.getStart().isAfter(period.getStart()) && breakItem.getStart().isBefore(period.getEnd()) && breakItem.getEnd().equals(period.getEnd())) {
                        period.setEnd(breakItem.getStart());
                    }
                    if (breakItem.getStart().isAfter(period.getStart()) && breakItem.getEnd().isBefore(period.getEnd())) {
                        toAdd.add(new TimePeriod(period.getStart(), breakItem.getStart()));
                        period.setStart(breakItem.getEnd());
                    }
                }
            }
            timePeriodWithBreaks.addAll(toAdd);
            Collections.sort(timePeriodWithBreaks);
        }
        return timePeriodWithBreaks;
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
}
