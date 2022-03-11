import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AppointmentComponent} from "./components/appointment/appointment.component";
import {AdminLoginComponent} from "./components/admin-login/admin-login.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {AppointmentAppealComponent} from "./components/appointment-appeal/appointment-appeal.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'appointment', component: AppointmentComponent},
  {path: 'login', component: AdminLoginComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'cancel/:id', component: AppointmentAppealComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
