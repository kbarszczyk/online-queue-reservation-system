import {Client} from "./Client";

export interface Appointment {
  id: Number;
  start: Date;
  end: Date;
  client: Client;
  reasonOfVisit: String;
}
