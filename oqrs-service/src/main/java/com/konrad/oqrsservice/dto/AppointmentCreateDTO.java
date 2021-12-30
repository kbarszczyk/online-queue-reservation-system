package com.konrad.oqrsservice.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
public class AppointmentCreateDTO {

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime start;

    @NotNull
    private ClientCreateDTO client;

    @NotNull
    private String reasonOfVisit;
}
