package com.konrad.oqrsservice.controller;

import com.konrad.oqrsservice.dto.AppointmentCreateDTO;
import com.konrad.oqrsservice.dto.AppointmentDTO;
import com.konrad.oqrsservice.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@RequestMapping("/appointment")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentDTO createAppointment(@RequestParam("resourceId") Long resourceId, @RequestBody AppointmentCreateDTO createDTO) throws MessagingException {
        return appointmentService.addAppointment(resourceId, createDTO);
    }

    @GetMapping("/{resourceId}")
    @ResponseStatus(HttpStatus.OK)
    public List<AppointmentDTO> getAppointmentsByResourceId(@PathVariable("resourceId") Long resourceId) {
        return appointmentService.getAppointmentsByResourceId(resourceId);
    }

    @DeleteMapping("/{uniqueId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAppointment(@PathVariable("uniqueId") String uniqueId) {
        appointmentService.deleteAppointment(uniqueId);
    }
}
