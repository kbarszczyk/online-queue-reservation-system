import {TimePeriodDTO} from "./TimePeriodDTO";

export interface UpdateWorkPlanBackendDTO {
  monday: TimePeriodDTO;
  tuesday: TimePeriodDTO;
  wednesday: TimePeriodDTO;
  thursday: TimePeriodDTO;
  friday: TimePeriodDTO;
}
