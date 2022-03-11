import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AppointmentService} from "../../services/appointment.service";

@Component({
  selector: 'app-appointment-appeal',
  templateUrl: './appointment-appeal.component.html',
  styleUrls: ['./appointment-appeal.component.css']
})
export class AppointmentAppealComponent implements OnInit, OnDestroy {

  private routeSub!: Subscription;
  private uniqueId!: String;


  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.uniqueId = params['id'];
      this.appointmentService.deleteAppointment(this.uniqueId).subscribe(response => {
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 3000);
      })
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
