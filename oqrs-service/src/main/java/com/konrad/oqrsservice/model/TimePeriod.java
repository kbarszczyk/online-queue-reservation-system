package com.konrad.oqrsservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalTime;

@Data
@AllArgsConstructor
public class TimePeriod implements Comparable<TimePeriod>{
    private LocalTime start;
    private LocalTime end;

    @Override
    public int compareTo(TimePeriod o) {
        return this.getStart().compareTo(o.getStart());
    }
}
