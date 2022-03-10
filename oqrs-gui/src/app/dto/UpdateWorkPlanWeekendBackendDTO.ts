import {TimePeriodDTO} from "./TimePeriodDTO";

export interface UpdateWorkPlanWeekendBackendDTO {
  monday: TimePeriodDTO;
  tuesday: TimePeriodDTO;
  wednesday: TimePeriodDTO;
  thursday: TimePeriodDTO;
  friday: TimePeriodDTO;
  saturday: TimePeriodDTO;
  sunday: TimePeriodDTO;
}
