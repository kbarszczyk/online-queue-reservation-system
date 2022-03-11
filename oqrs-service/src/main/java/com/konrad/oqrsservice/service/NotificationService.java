package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.model.Appointment;

import javax.mail.MessagingException;

public interface NotificationService {
    void sendAppointmentConfirmation(Appointment appointment) throws MessagingException;
    void sendReminders() throws MessagingException;
}
