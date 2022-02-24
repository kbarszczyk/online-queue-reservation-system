import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "../models/Appointment";
import {AppointmentCreateDTO} from "../dto/AppointmentCreateDTO";

const API_URL = 'http://localhost:8080/appointment'

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {

  constructor(private http: HttpClient) {
  }

  getAppointments(resourceId: Number): Observable<Array<Appointment>> {
    return this.http.get<Array<Appointment>>(API_URL + '/' + resourceId);
  }

  createAppointment(resourceId: number, appointment: AppointmentCreateDTO) {
    const params = new HttpParams()
      .set("resourceId", resourceId);
    return this.http.post(API_URL, appointment,{params});
  }

}
