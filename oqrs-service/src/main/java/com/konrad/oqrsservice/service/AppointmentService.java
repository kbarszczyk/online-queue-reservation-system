package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.dto.AppointmentCreateDTO;
import com.konrad.oqrsservice.dto.AppointmentDTO;
import com.konrad.oqrsservice.model.Appointment;
import com.konrad.oqrsservice.model.Resource;
import com.konrad.oqrsservice.model.TimePeriod;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentService {

    AppointmentDTO addAppointment(Long resourceId, AppointmentCreateDTO createDTO);

    boolean isBookAvailable(Long resourceId, AppointmentCreateDTO createDTO);

    List<Appointment> getAppointmentsByResourceId(Long resourceId, LocalDate day);

    List<TimePeriod> getAvailableTimePeriods(List<TimePeriod> periods, List<Appointment> appointments,Long resourceId);

    List<TimePeriod> calculateAvailableHours(List<TimePeriod> availableTimePeriods, Resource resource);

    List<AppointmentDTO> getAppointmentsByResourceId(Long resourceId);

    List<LocalTime> getUnavailableTimes(Long resourceId, LocalDate dateToBook);

    List<TimePeriod> getAvailableTimes(Long resourceId, LocalDate dateToBook);
}
