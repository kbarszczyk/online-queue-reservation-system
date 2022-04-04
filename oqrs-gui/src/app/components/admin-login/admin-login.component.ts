import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/User";
import {Subscription} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {HeaderType} from "../../enums/header-type.enum";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  public loginValid = true;
  public username = '';
  public password = '';
  private subscription: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['login']);
    }
  }

  onSubmit(user: User): void {
    this.subscription.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalStorage(response.body);
          this.router.navigate(['admin']);
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open('Niepoprawne dane logowania.Spróbuj ponownie', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['failed']
          });
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
