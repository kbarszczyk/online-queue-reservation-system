package com.konrad.oqrsservice.utils;

import com.konrad.oqrsservice.dto.*;
import com.konrad.oqrsservice.service.AppointmentService;
import com.konrad.oqrsservice.service.ResourceService;
import com.konrad.oqrsservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final ResourceService resourceService;
    private final AppointmentService appointmentService;
    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {
        addTestData();
    }

    private void addTestData() throws MessagingException {

        ResourceCreateDTO resource = new ResourceCreateDTO();
        resource.setName("Wydział Komunikacji");
        resource.setLengthOfVisit(30);
        resource.setWeekendsEnabled(true);
        resource.setSlots(1);

        ResourceDTO addedResource = resourceService.addResource(resource);


        ClientCreateDTO client = new ClientCreateDTO();
        client.setEmail("mail99222@gmail.com");
        client.setFirstName("Konrad");
        client.setLastName("Barszczyk");

        AppointmentCreateDTO appointment = new AppointmentCreateDTO();
        appointment.setClient(client);
        appointment.setStart(LocalDateTime.of(2022, 1, 14, 8, 0, 0, 0));
        appointment.setReasonOfVisit("Rejestracja pojazdu");

        appointmentService.addAppointment(addedResource.getId(), appointment);


        ResourceCreateDTO resource2 = new ResourceCreateDTO();
        resource2.setName("Gabinet dentystyczny");
        resource2.setLengthOfVisit(60);
        resource2.setWeekendsEnabled(false);
        resource2.setSlots(2);

        ResourceDTO addedResource2 = resourceService.addResource(resource2);


        ClientCreateDTO client2 = new ClientCreateDTO();
        client2.setEmail("mail99222@gmail.com");
        client2.setFirstName("Konrad");
        client2.setLastName("Barszczyk");

        AppointmentCreateDTO appointment2 = new AppointmentCreateDTO();
        appointment2.setClient(client2);
        appointment2.setStart(LocalDateTime.of(2022, 2, 14, 11, 0, 0, 0));
        appointment2.setReasonOfVisit("Ból zęba");

        appointmentService.addAppointment(addedResource2.getId(), appointment2);

        UserCreateDTO admin = new UserCreateDTO();
        admin.setEmail("kbarszczyk@protonmail.com");
        admin.setPassword("admin");
        admin.setUsername("admin");
        admin.setFirstName("Konrad");
        admin.setLastName("Barszczyk");

        userService.registerAdmin(admin);
    }
}
