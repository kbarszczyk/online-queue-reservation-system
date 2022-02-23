package com.konrad.oqrsservice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentTimeDTO {

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime start;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime end;


    public AppointmentTimeDTO(LocalDateTime start, LocalDateTime end) {
        this.start = start;
        this.end = end;
    }
}
