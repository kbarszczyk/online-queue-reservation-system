import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/resource'

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) {
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
}
