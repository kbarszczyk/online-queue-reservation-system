import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height:700,
    aspectRatio:2,
    headerToolbar: {
      start: 'prev,next today',
      center: 'title',
      end: 'dayGridMonth,dayGridWeek,listWeek,timeGridWeek'
    },
    firstDay:1
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
