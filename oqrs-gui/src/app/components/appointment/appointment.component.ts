import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Resource} from "../../models/Resource";
import {ResourceService} from "../../services/resource.service";
import {CalendarOptions, FullCalendarComponent} from "@fullcalendar/angular";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {


  @ViewChild('bookCalendar', {static: true}) calendarComponent: FullCalendarComponent | undefined;
  @ViewChild('stepper') private myStepper!: MatStepper;

  resources: Array<Resource> = [];
  resourceId: Number = 1;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  selectedAppointmentDate!: string;
  isDateSelect: boolean = false;
  selectedResourceName!:String;


  calendarOptions: CalendarOptions = {
    initialView: 'listDay',
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

  constructor(private _formBuilder: FormBuilder, private resourceService: ResourceService) {
  }


  ngOnInit() {
    this.getAllResources();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    })
    this.thirdFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      reason: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  getAllResources() {
    this.resourceService.getAllResources().subscribe(data => {
      this.resources = data;
    })
  }

  getResourceId() {
    return this.resourceId;
  }

  initCalendar() {
    let resource = this.resources.find(x => x.id === this.resourceId);
    this.selectedResourceName = resource!.name;
    this.calendarOptions.weekends = resource!.weekendsEnabled;
    this.calendarOptions.events = {
      url: 'http://localhost:8080/resource/times/available/' + this.getResourceId()
    }
  }

  handleClick(event) {
    this.selectedAppointmentDate = event.event.start.toUTCString().substring(event.event.start.length,25);
    console.log(this.selectedAppointmentDate);
    this.isDateSelect = true;
    setTimeout(() =>
      this.myStepper.next(), 1);
  }

  bookAppointment(){

  }

}
