package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.dto.AppointmentCreateDTO;
import com.konrad.oqrsservice.dto.AppointmentDTO;
import com.konrad.oqrsservice.mappers.AppointmentMapper;
import com.konrad.oqrsservice.mappers.ClientMapper;
import com.konrad.oqrsservice.model.*;
import com.konrad.oqrsservice.repository.AppointmentRepository;
import com.konrad.oqrsservice.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ResourceRepository resourceRepository;

    @Override
    public AppointmentDTO addAppointment(Long resourceId, AppointmentCreateDTO createDTO) {
        if (isBookAvailable(resourceId, createDTO)) {
            Resource resourceToBook = resourceRepository.findById(resourceId)
                    .orElseThrow(() -> new RuntimeException("Resource with " + resourceId + " not found!"));
            Appointment toSave = AppointmentMapper.INSTANCE.createToDbo(createDTO);
            Client client = ClientMapper.INSTANCE.createToDbo(createDTO.getClient());
            client.setAppointment(toSave);
            toSave.setClient(client);
            toSave.setResource(resourceToBook);
            toSave.setEnd(createDTO.getStart().plusMinutes(resourceToBook.getLengthOfVisit()));
            Appointment createdAppointment = appointmentRepository.save(toSave);
            return AppointmentMapper.INSTANCE.dboToDto(createdAppointment);
        } else {
            throw new RuntimeException("Something goes wrong with book your appointment");
        }
    }

    @Override
    public boolean isBookAvailable(Long resourceId, AppointmentCreateDTO createDTO) {
        Resource resourceToBook = resourceRepository.findById(resourceId)
                .orElseThrow(() -> new RuntimeException("Resource with " + resourceId + " not found!"));

        WorkPlan workPlan = resourceToBook.getWorkPlan();

        LocalDate dateToBook = createDTO.getStart().toLocalDate();

        TimePeriod timePeriodToBook = new TimePeriod(createDTO.getStart().toLocalTime(),
                createDTO.getStart().toLocalTime().plusMinutes(resourceToBook.getLengthOfVisit()));

        DayPlan selectedDay = workPlan.getDay(createDTO.getStart().getDayOfWeek().toString().toLowerCase());

        List<Appointment> resourceAppointments = getAppointmentsByResourceId(resourceId, dateToBook);

        List<TimePeriod> availablePeriods = selectedDay.getTimePeriodsWithBreaks();

        availablePeriods = getAvailableTimePeriods(availablePeriods, resourceAppointments);

        List<TimePeriod> calculatedAvailableHours = calculateAvailableHours(availablePeriods, resourceToBook);

        return calculatedAvailableHours.contains(timePeriodToBook);

    }


    @Override
    public List<Appointment> getAppointmentsByResourceId(Long resourceId, LocalDate day) {
        return appointmentRepository.findByResourceWithStartInPeriod(resourceId, day.atStartOfDay(), day.atStartOfDay().plusDays(1));
    }


    @Override
    public List<TimePeriod> getAvailableTimePeriods(List<TimePeriod> periods, List<Appointment> appointments) {
        List<TimePeriod> toAdd = new ArrayList();
        Collections.sort(appointments);
        for (Appointment appointment : appointments) {
            for (TimePeriod period : periods) {
                if ((appointment.getStart().toLocalTime().isBefore(period.getStart()) || appointment.getStart().toLocalTime().equals(period.getStart()))
                        && appointment.getEnd().toLocalTime().isAfter(period.getStart()) && appointment.getEnd().toLocalTime().isBefore(period.getEnd())) {
                    period.setStart(appointment.getEnd().toLocalTime());
                }
                if (appointment.getStart().toLocalTime().isAfter(period.getStart()) && appointment.getStart().toLocalTime().isBefore(period.getEnd())
                        && appointment.getEnd().toLocalTime().isAfter(period.getEnd()) || appointment.getEnd().toLocalTime().equals(period.getEnd())) {
                    period.setEnd(appointment.getStart().toLocalTime());
                }
                if (appointment.getStart().toLocalTime().isAfter(period.getStart()) && appointment.getEnd().toLocalTime().isBefore(period.getEnd())) {
                    toAdd.add(new TimePeriod(period.getStart(), appointment.getStart().toLocalTime()));
                    period.setStart(appointment.getEnd().toLocalTime());
                }
            }
        }
        periods.addAll(toAdd);
        Collections.sort(periods);
        return periods;
    }

    @Override
    public List<TimePeriod> calculateAvailableHours(List<TimePeriod> availableTimePeriods, Resource resource) {
        ArrayList<TimePeriod> availableHours = new ArrayList();
        for (TimePeriod period : availableTimePeriods) {
            TimePeriod appointmentPeriod = new TimePeriod(period.getStart(), period.getStart().plusMinutes(resource.getLengthOfVisit()));
            while (appointmentPeriod.getEnd().isBefore(period.getEnd()) || appointmentPeriod.getEnd().equals(period.getEnd())) {
                availableHours.add(new TimePeriod(appointmentPeriod.getStart(), appointmentPeriod.getStart().plusMinutes(resource.getLengthOfVisit())));
                appointmentPeriod.setStart(appointmentPeriod.getStart().plusMinutes(resource.getLengthOfVisit()));
                appointmentPeriod.setEnd(appointmentPeriod.getEnd().plusMinutes(resource.getLengthOfVisit()));
            }
        }
        return availableHours;
    }
}
