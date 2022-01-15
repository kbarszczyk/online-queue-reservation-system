package com.konrad.oqrsservice.repository;

import com.konrad.oqrsservice.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    @Query("select a from Appointment a where a.resource.id = :resourceId and  a.start >=:dayStart and  a.start <=:dayEnd")
    List<Appointment> findByResourceWithStartInPeriod(@Param("resourceId") Long resourceId, @Param("dayStart") LocalDateTime startPeriod, @Param("dayEnd") LocalDateTime endPeriod);

    List<Appointment> findAppointmentByResourceId(Long resourceId);

}
