import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResourceCreateDTO} from "../dto/ResourceCreateDTO";
import {ResourceUpdateDTO} from "../dto/ResourceUpdateDTO";
import {TimePeriodDTO} from "../dto/TimePeriodDTO";
import {UpdateWorkPlanBackendDTO} from "../dto/UpdateWorkPlanBackendDTO";

const API_URL = 'http://localhost:8080/resource'

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) {
  }

  addResource(createDTO: ResourceCreateDTO) {
    return this.http.post(API_URL, createDTO);
  }

  deleteResource(resourceId: Number) {
    return this.http.delete(API_URL + "/" + resourceId);
  }

  updateResource(updateDTO: ResourceUpdateDTO, resourceId: Number) {
    return this.http.put(API_URL + "/" + resourceId, updateDTO);
  }

  getAllResources(): Observable<any> {
    return this.http.get(API_URL);
  }

  getAvailableTimes(resourceId: Number, date: string): Observable<any> {
    const params = new HttpParams()
      .set('date', date);
    return this.http.get(API_URL + "/times/available/" + resourceId, {params});
  }

  getUnavailableTimes(resourceId: Number, date: string): Observable<any> {
    const params = new HttpParams()
      .set('date', date);
    return this.http.get(API_URL + "/times/unavailable/" + resourceId, {params});
  }

  addBreak(timePeriodDTO: TimePeriodDTO, resourceId: Number, dayOfWeek: string) {
    const params = new HttpParams()
      .set('dayOfWeek', dayOfWeek);
    return this.http.post(API_URL + "/" + "break/" + resourceId, timePeriodDTO, {params});
  }

  clearBreaks(day: string, resourceId: Number) {
    const params = new HttpParams()
      .set("dayOfWeek", day);
    return this.http.delete(API_URL + "/" + "break/" + resourceId, {params});
  }

  updateWorkPlan(updateDTO: UpdateWorkPlanBackendDTO, resourceId: Number) {
    return this.http.put(API_URL + "/" + "workplan/" + resourceId, updateDTO);
  }
}
