import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "../models/Appointment";

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
}
