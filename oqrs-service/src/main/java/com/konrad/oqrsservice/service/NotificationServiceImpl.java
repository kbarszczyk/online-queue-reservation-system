package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.model.Appointment;
import com.konrad.oqrsservice.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private final AppointmentRepository appointmentRepository;


    @Override
    public void sendAppointmentConfirmation(Appointment appointment) throws MailException, MessagingException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd 'o' HH:mm");
        MimeMessage msg = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, true);
        helper.setTo(appointment.getClient().getEmail());
        helper.setSubject("Potwierdzenie rezerwacji - Internetowy System Rezerwacji Kolejki");
        Context context = new Context();
        context.setVariable("firstName", appointment.getClient().getFirstName());
        context.setVariable("lastName", appointment.getClient().getLastName());
        context.setVariable("resource", appointment.getResource().getName());
        context.setVariable("date", appointment.getStart().format(formatter));
        context.setVariable("appealLink", "http://localhost:4200/cancel/" + appointment.getUniqueId());
        String emailContent = templateEngine.process("AppointmentConfirmation", context);
        helper.setText(emailContent, true);
        helper.setFrom("oqrs-support");
        javaMailSender.send(msg);
    }

    @Override
    @Scheduled(cron = "0 0 6 * * *")
    public void sendReminders() throws MessagingException {
        List<Appointment> appointments = appointmentRepository.findAll().stream()
                .filter(appointment -> appointment.getStart().toLocalDate().isEqual(LocalDate.now())).toList();

        for (Appointment appointment : appointments) {
            MimeMessage msg = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);
            helper.setTo(appointment.getClient().getEmail());
            helper.setSubject("Przypomnienie o wizycie - Internetowy System Rezerwacji Kolejki");
            Context context = new Context();
            context.setVariable("firstName", appointment.getClient().getFirstName());
            context.setVariable("lastName", appointment.getClient().getLastName());
            context.setVariable("resource", appointment.getResource().getName());
            context.setVariable("time", appointment.getStart().toLocalTime());
            String emailContent = templateEngine.process("AppointmentReminder", context);
            helper.setText(emailContent, true);
            helper.setFrom("orqs-support");
            javaMailSender.send(msg);
        }

    }
}
