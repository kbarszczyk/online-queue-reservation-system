export interface AppointmentCreateDTO {
  start: string,
  client: {
    firstName: string;
    lastName: string;
    email: string;
  }
  reasonOfVisit: string;
}
