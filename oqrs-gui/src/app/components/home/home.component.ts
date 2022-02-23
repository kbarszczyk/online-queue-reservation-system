import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from "@fullcalendar/angular";
import {AppointmentService} from "../../services/appointment.service";
import {Resource} from "../../models/Resource";
import {ResourceService} from "../../services/resource.service";
import {HttpClient} from "@angular/common/http";
import {Appointment} from "../../models/Appointment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  appointments: Array<Appointment> = [];
  resources: Array<Resource> = [];
  calendarResourceId: Number = 1;
  events: any = [];

  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 700,
    aspectRatio: 2,
    lazyFetching: true,
    headerToolbar: {
      start: 'prev,next today',
      center: 'title',
      end: 'dayGridMonth,dayGridWeek,listWeek,timeGridWeek'
    },
    buttonText: {
      'dayGridWeek': 'day'
    },
    firstDay: 1,
    selectable: false,
    editable: false,
    eventDisplay: 'block',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false
    },
    eventBackgroundColor: '#f54242',
    eventBorderColor: '#162466',
    eventTextColor: "white"
  }

  constructor(private http: HttpClient, private appointmentService: AppointmentService, private resourceService: ResourceService) {
  }

  ngOnInit(): void {
    this.getAllResources();
  }

  getAppointments(id: Number) {
    this.appointmentService.getAppointments(id).subscribe(data => {
        this.appointments = data;
        this.appointments.forEach(e => {
          let calendarEvent = {
            startEditable: false,
            id: e.id,
            start: e.start,
            end: e.end,
            title: e.reasonOfVisit,
          };
          this.events.push(calendarEvent);
        })
      }
    )
  }

  getAllResources() {
    this.resourceService.getAllResources().subscribe(data => {
      this.resources = data;
    })
  }

  async changeResource(resource: Resource, event: any) {
    if (event.isUserInput) {
      this.calendarComponent?.getApi().removeAllEvents();
      this.events = [];
      this.calendarResourceId = resource.id;
      this.calendarOptions.weekends = resource.weekendsEnabled;
      this.getAppointments(resource.id);
      console.log(this.events);
      setTimeout(() => {
        this.calendarComponent?.getApi().addEventSource(this.events)
      }, 1000);
      setTimeout(() => {
        this.calendarComponent?.getApi().refetchEvents()
      }, 1000);
    }
  }

}