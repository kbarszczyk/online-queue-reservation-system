import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {JwtHelperService} from "@auth0/angular-jwt";

const API_URL = "http://localhost:8080/user"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token!: string | null;
  private loggedInUsername!: string | null;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    return this.http.post(API_URL + "/login", user, {observe: 'response'});
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URL + "/register", user);
  }

  logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  saveToken(token: string | null): void {
    this.token = token;
    localStorage.setItem('token', <string>token);
  }

  addUserToLocalStorage(user: User | null): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('user'));
  }

  loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  getToken(): string | null {
    return this.token;
  }


  // @ts-ignore
  isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }
}
