package com.konrad.oqrsservice.controller;

import com.konrad.oqrsservice.dto.AppointmentTimeDTO;
import com.konrad.oqrsservice.dto.ResourceCreateDTO;
import com.konrad.oqrsservice.dto.ResourceDTO;
import com.konrad.oqrsservice.dto.ResourceUpdateDTO;
import com.konrad.oqrsservice.model.Appointment;
import com.konrad.oqrsservice.model.TimePeriod;
import com.konrad.oqrsservice.service.AppointmentService;
import com.konrad.oqrsservice.service.ResourceService;
import com.konrad.oqrsservice.service.WorkPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/resource")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;
    private final AppointmentService appointmentService;
    private final WorkPlanService workPlanService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResourceDTO createResource(@RequestBody ResourceCreateDTO dto) {
        return resourceService.addResource(dto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ResourceDTO> getAllResources() {
        return resourceService.getAllResources();
    }

    @GetMapping("/booked/{resourceId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Appointment> getBookedAppointmentsByResource(@PathVariable("resourceId") Long resourceId, @RequestParam("date") String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        return appointmentService.getAppointmentsByResourceId(resourceId, parsedDate);
    }

    @GetMapping("/times/available/{resourceId}")
    @ResponseStatus(HttpStatus.OK)
    public List<AppointmentTimeDTO> getAvailableTimes(@PathVariable("resourceId") Long resourceId, @RequestParam("start") String date
            , @RequestParam("end") String end) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
        LocalDateTime dateTime = LocalDateTime.parse(date, formatter);
        LocalDate parsedDate = dateTime.toLocalDate();
        return appointmentService.getAvailableTimes(resourceId, parsedDate)
                .stream()
                .map(timePeriod -> new AppointmentTimeDTO(timePeriod.getStart().atDate(parsedDate), timePeriod.getEnd().atDate(parsedDate)))
                .collect(Collectors.toList());
    }

    @GetMapping("/times/unavailable/{resourceId}")
    @ResponseStatus(HttpStatus.OK)
    public List<LocalTime> getUnavailableTimes(@PathVariable("resourceId") Long resourceId, @RequestParam("date") String date) {
        LocalDate parsedDate = LocalDate.parse(date);
        return appointmentService.getUnavailableTimes(resourceId, parsedDate);
    }

    @DeleteMapping("/{resourceId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteResource(@PathVariable("resourceId") Long resourceId) {
        resourceService.deleteResource(resourceId);
    }

    @PutMapping("/{resourceId}")
    @ResponseStatus(HttpStatus.OK)
    public ResourceDTO updateResource(@RequestBody ResourceUpdateDTO updateDTO, @PathVariable("resourceId") Long resourceId) {
        return resourceService.updateResource(updateDTO, resourceId);
    }

    @PostMapping("/break/{resourceId}")
    @ResponseStatus(HttpStatus.OK)
    public void addBreakToResource(@PathVariable("resourceId") Long resourceId,
                                   @RequestBody TimePeriod breakToAdd,
                                   @RequestParam("dayOfWeek") String dayOfWeek) {

        workPlanService.addBreakToWorkPlan(breakToAdd, resourceId, dayOfWeek);
    }

    @DeleteMapping("/break/{resourceId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void clearResourceBreaks(@PathVariable("resourceId") Long resourceId,
                                    @RequestParam("dayOfWeek") String dayOfWeek) {
        workPlanService.clearBreaks(resourceId, dayOfWeek);
    }
}
