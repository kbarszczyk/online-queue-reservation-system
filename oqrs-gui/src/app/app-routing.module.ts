import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AppointmentComponent} from "./appointment/appointment.component";
import {AdminLoginComponent} from "./admin-login/admin-login.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'appointment', component: AppointmentComponent},
  {path: 'login', component: AdminLoginComponent},
  {path: 'admin', component: AdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
