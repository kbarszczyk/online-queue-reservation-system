import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {NavComponent} from './components/nav/nav.component';
import {AppointmentComponent} from './components/appointment/appointment.component';
import {AdminLoginComponent} from './components/admin-login/admin-login.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user.service";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {MatTableModule} from "@angular/material/table";
import { DialogAddResourceComponent } from './components/dialogs/dialog-add-resource/dialog-add-resource.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DialogUpdateResourceComponent } from './components/dialogs/dialog-update-resource/dialog-update-resource.component';
import { DialogAddBreakComponent } from './components/dialogs/dialog-add-break/dialog-add-break.component';
import { DialogClearBreaksComponent } from './components/dialogs/dialog-clear-breaks/dialog-clear-breaks.component';
import { DialogUpdateWorkplanWithWeekendsComponent } from './components/dialogs/dialog-update-workplan-with-weekends/dialog-update-workplan-with-weekends.component';
import { DialogUpdateWorkplanWithoutWeekendsComponent } from './components/dialogs/dialog-update-workplan-without-weekends/dialog-update-workplan-without-weekends.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  listPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    AppointmentComponent,
    AdminLoginComponent,
    AdminPanelComponent,
    DialogAddResourceComponent,
    DialogUpdateResourceComponent,
    DialogAddBreakComponent,
    DialogClearBreaksComponent,
    DialogUpdateWorkplanWithWeekendsComponent,
    DialogUpdateWorkplanWithoutWeekendsComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        FullCalendarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        MatTableModule,
        MatDialogModule
    ],
  providers: [MatDatepickerModule, MatSnackBar, AuthenticationGuard, AuthenticationService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
