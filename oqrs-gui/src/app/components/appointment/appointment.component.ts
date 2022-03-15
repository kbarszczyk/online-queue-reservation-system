import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Resource} from "../../models/Resource";
import {AppointmentCreateDTO} from "../../dto/AppointmentCreateDTO";
import {ResourceService} from "../../services/resource.service";
import {CalendarOptions, FullCalendarComponent} from "@fullcalendar/angular";
import {MatStepper} from "@angular/material/stepper";
import {AppointmentService} from "../../services/appointment.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {


  @ViewChild('bookCalendar', {static: true}) calendarComponent: FullCalendarComponent | undefined;
  @ViewChild('stepper') private myStepper!: MatStepper;

  resourceId: number = 1;
  resource!: Resource;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  selectedResourceName!: String;
  selectedAppointmentDate!: string | null;
  isDateSelect: boolean = false;


  calendarOptions: CalendarOptions = {
    initialView: 'listDay',
    locale: 'pl',
    buttonText: {
      "today": 'dzisiaj'
    },
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'today prev,next'
    },
    validRange: {
      start: Date.now()
    },
    contentHeight: "auto",
    noEventsText: 'Unavailable',
    allDaySlot: false,
    slotMinTime: "06:00:00",
    slotMaxTime: "21:00:00",
    firstDay: 2,
    displayEventEnd: true,
    displayEventTime: true,
    dayMaxEvents: true,
    dayMaxEventRows: true,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: false
    },
    events: {
      url: 'http://localhost:8080/resource/times/available/' + this.getResourceId()
    },
    eventClick: this.handleClick.bind(this),
    eventTextColor: 'black',
    eventBackgroundColor: 'white'
  }

  constructor(private _formBuilder: FormBuilder, private router: Router, private resourceService: ResourceService,
              private appointmentService: AppointmentService, private snackBar: MatSnackBar) {
  }


  ngOnInit() {
    this.resource = this.appointmentService.getPassedResource();
    this.resourceId = this.resource.id.valueOf();

    this.firstFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    })
    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      reason: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })

    this.initCalendar();
  }

  getResourceId() {
    return this.resourceId;
  }

  handleClick(event) {
    this.selectedAppointmentDate = new Date(event.event.start.toString().split('GMT')[0] + ' UTC').toISOString();
    if (new Date(event.event.start).getTime() < Date.now()) {
      this.snackBar.open("Ten termin jest już niedostępny, wybierz inny",'',{
        duration:2000,
        panelClass:['failed']
      })
    } else {
      console.log(this.selectedAppointmentDate);
      this.isDateSelect = true;
      setTimeout(() =>
        this.myStepper.next(), 1);
    }
  }


  initCalendar() {
    this.selectedResourceName = this.resource!.name;
    this.calendarOptions.weekends = this.resource!.weekendsEnabled;
    this.calendarOptions.events = {
      url: 'http://localhost:8080/resource/times/available/' + this.getResourceId()
    }
  }

  bookAppointment() {
    let createDTO: AppointmentCreateDTO = {
      start: String(this.selectedAppointmentDate),
      client: {
        firstName: String(this.secondFormGroup.getRawValue().firstName),
        lastName: String(this.secondFormGroup.getRawValue().lastName),
        email: String(this.secondFormGroup.getRawValue().email)
      },
      reasonOfVisit: String(this.secondFormGroup.getRawValue().reason)
    };

    this.appointmentService.createAppointment(this.resourceId, createDTO).subscribe(response =>
      console.log(response));
    this.router.navigate(['home']);
    this.snackBar.open('Pomyślnie zarezerwowano wizytę, wysłano potwierdzenie rezerwacji na adres e-mail', '', {
      duration: 3000,
      panelClass: ['success']
    });
  }

  backToHome() {
    this.router.navigate(['home']);
  }
}
