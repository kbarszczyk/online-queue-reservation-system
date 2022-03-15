import {Component, OnInit, ViewChild} from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import {Resource} from "../../models/Resource";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddResourceComponent} from "../dialogs/dialog-add-resource/dialog-add-resource.component";
import {ResourceCreateDTO} from "../../dto/ResourceCreateDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTable} from "@angular/material/table";
import {ResourceUpdateDTO} from "../../dto/ResourceUpdateDTO";
import {DialogUpdateResourceComponent} from "../dialogs/dialog-update-resource/dialog-update-resource.component";
import {AddBreakDTO} from "../../dto/AddBreakDTO";
import {DialogAddBreakComponent} from "../dialogs/dialog-add-break/dialog-add-break.component";
import {TimePeriodDTO} from "../../dto/TimePeriodDTO";
import {DialogClearBreaksComponent} from "../dialogs/dialog-clear-breaks/dialog-clear-breaks.component";
import {
  DialogUpdateWorkplanWithoutWeekendsComponent
} from "../dialogs/dialog-update-workplan-without-weekends/dialog-update-workplan-without-weekends.component";
import {UpdateWorkPlanDTO} from "../../dto/UpdateWorkPlanDTO";
import {UpdateWorkPlanBackendDTO} from "../../dto/UpdateWorkPlanBackendDTO";
import {
  DialogUpdateWorkplanWithWeekendsComponent
} from "../dialogs/dialog-update-workplan-with-weekends/dialog-update-workplan-with-weekends.component";
import {UpdateWorkPlanWeekendDTO} from "../../dto/UpdateWorkPlanWeekendDTO";
import {UpdateWorkPlanWeekendBackendDTO} from "../../dto/UpdateWorkPlanWeekendBackendDTO";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  @ViewChild('resourceTable', {static: false}) table!: MatTable<any>;

  resources: Array<Resource> = [];
  displayedColumns: string[] = ['id', 'name', 'lengthOfVisit', 'weekendsEnabled', 'slots', 'management'];
  public resourceCreateDTO!: ResourceCreateDTO;
  public resourceUpdateDTO!: ResourceUpdateDTO;
  public addBreakDTO!: AddBreakDTO;
  public breakDay!: string;
  public workPlanUpdate!: UpdateWorkPlanDTO;
  public workPlanUpdateWeekend!: UpdateWorkPlanWeekendDTO;

  constructor(private resourceService: ResourceService, public dialog: MatDialog,
              private snackBar: MatSnackBar, private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.getAllResources();
  }

  getAllResources() {
    this.resourceService.getAllResources().subscribe(data => {
      this.resources = data;
    })
  }

  openDialogAddResource(): void {
    const dialogRef = this.dialog.open(DialogAddResourceComponent, {
      width: '250px',
      data: {
        name: this.resourceCreateDTO?.name, weekendsEnabled: this.resourceCreateDTO?.weekendsEnabled,
        lengthOfVisit: this.resourceCreateDTO?.lengthOfVisit, slots: this.resourceCreateDTO?.slots
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.resourceCreateDTO = result;
      if (this.resourceCreateDTO.name) {
        if (this.resources.find(element => element.name === this.resourceCreateDTO.name)) {
          this.snackBar.open("Zasób o tej nazwie istnieje.Prosimy podać inną nazwę", '', {
            duration: 3000,
            panelClass: ['failed']
          })
          return;
        }
        this.resourceService.addResource(this.resourceCreateDTO).subscribe(response => {
          console.log(response);
          this.snackBar.open("Zasób został pomyślnie dodany", '', {
            duration: 3000,
            panelClass: ['success']
          })
        })
        this.refreshTable();
      }
    })
  }

  refreshTable() {
    setTimeout(() => {
      this.getAllResources();
      this.table.renderRows();
    }, 100);
  }

  deleteResource(resourceId: Number) {
    this.resourceService.deleteResource(resourceId).subscribe();
    this.snackBar.open("Zasób pomyślnie usunięty", '', {
      duration: 3000,
      panelClass: ['success']
    })
    this.refreshTable();
  }

  openDialogUpdateResource(resourceId: Number): void {
    const dialogRef = this.dialog.open(DialogUpdateResourceComponent, {
      width: '250px',
      data: {
        name: this.resourceUpdateDTO?.name, weekendsEnabled: this.resourceUpdateDTO?.weekendsEnabled,
        lengthOfVisit: this.resourceUpdateDTO?.lengthOfVisit, slots: this.resourceUpdateDTO?.slots
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.resourceUpdateDTO = result;
      this.resourceService.updateResource(this.resourceUpdateDTO, resourceId).subscribe(response => {
        console.log(response);
        this.snackBar.open("Pomyślnie zaktulizowano zasób", '', {
          duration: 3000,
          panelClass: ['success']
        })
      })
      this.refreshTable();
    })
  }

  openDialogAddBreak(resourceId: Number): void {
    const dialogRef = this.dialog.open(DialogAddBreakComponent, {
      width: '250px',
      data: {
        day: this.breakDay, start: this.addBreakDTO?.start, end: this.addBreakDTO?.end
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.breakDay = result.day;
      let timePeriod: TimePeriodDTO = {
        start: result.start,
        end: result.end
      }
      this.resourceService.addBreak(timePeriod, resourceId, this.breakDay).subscribe(response => {
        this.snackBar.open("Przerwa dodana pomyślnie", '', {
          duration: 3000,
          panelClass: ['success']
        })
      })
    })
  }

  openDialogClearBreaks(resourceId: Number): void {
    const dialogRef = this.dialog.open(DialogClearBreaksComponent, {
      width: '250px',
      data: {
        day: this.breakDay
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.breakDay = result;
      this.resourceService.clearBreaks(this.breakDay, resourceId).subscribe(response => {
        this.snackBar.open("Pomyślnie usunięto przerwy", '', {
          duration: 3000,
          panelClass: ['success']
        })
      })
    })
  }

  openDialogUpdateWorkPlan(element: Resource) {
    if (!element.weekendsEnabled) {
      const dialogRef = this.dialog.open(DialogUpdateWorkplanWithoutWeekendsComponent, {
        width: '300px',
        data: {
          mondayStart: this.workPlanUpdate?.mondayStart, mondayEnd: this.workPlanUpdate?.mondayEnd,
          tuesdayStart: this.workPlanUpdate?.tuesdayStart, tuesdayEnd: this.workPlanUpdate?.tuesdayEnd,
          wednesdayStart: this.workPlanUpdate?.wednesdayStart, wednesdayEnd: this.workPlanUpdate?.wednesdayEnd,
          thursdayStart: this.workPlanUpdate?.thursdayStart, thursdayEnd: this.workPlanUpdate?.thursdayEnd,
          fridayStart: this.workPlanUpdate?.fridayStart, fridayEnd: this.workPlanUpdate?.fridayEnd
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        let updateWorkPlan: UpdateWorkPlanBackendDTO = {
          monday: {start: result.mondayStart, end: result.mondayEnd},
          tuesday: {start: result.tuesdayStart, end: result.tuesdayEnd},
          wednesday: {start: result.wednesdayStart, end: result.wednesdayEnd},
          thursday: {start: result.thursdayStart, end: result.thursdayEnd},
          friday: {start: result.fridayStart, end: result.fridayEnd}
        }
        console.log(updateWorkPlan);
        this.resourceService.updateWorkPlan(updateWorkPlan, element.id).subscribe(response => {
          this.snackBar.open("Plan pracy zaktulizowany pomyślnie", '', {
            duration: 3000,
            panelClass: ['success']
          })
        })
      })
    } else {
      const dialogRef = this.dialog.open(DialogUpdateWorkplanWithWeekendsComponent, {
        width: '300px',
        data: {
          mondayStart: this.workPlanUpdateWeekend?.mondayStart,
          mondayEnd: this.workPlanUpdateWeekend?.mondayEnd,
          tuesdayStart: this.workPlanUpdateWeekend?.tuesdayStart,
          tuesdayEnd: this.workPlanUpdateWeekend?.tuesdayEnd,
          wednesdayStart: this.workPlanUpdateWeekend?.wednesdayStart,
          wednesdayEnd: this.workPlanUpdateWeekend?.wednesdayEnd,
          thursdayStart: this.workPlanUpdateWeekend?.thursdayStart,
          thursdayEnd: this.workPlanUpdateWeekend?.thursdayEnd,
          fridayStart: this.workPlanUpdateWeekend?.fridayStart,
          fridayEnd: this.workPlanUpdateWeekend?.fridayEnd,
          saturdayStart: this.workPlanUpdateWeekend?.saturdayStart,
          saturdayEnd: this.workPlanUpdateWeekend?.saturdayEnd,
          sundayStart: this.workPlanUpdateWeekend?.sundayStart,
          sundayEnd: this.workPlanUpdateWeekend?.sundayEnd
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        let updateWorkPlan: UpdateWorkPlanWeekendBackendDTO = {
          monday: {start: result.mondayStart, end: result.mondayEnd},
          tuesday: {start: result.tuesdayStart, end: result.tuesdayEnd},
          wednesday: {start: result.wednesdayStart, end: result.wednesdayEnd},
          thursday: {start: result.thursdayStart, end: result.thursdayEnd},
          friday: {start: result.fridayStart, end: result.fridayEnd},
          saturday: {start: result.saturdayStart, end: result.saturdayEnd},
          sunday: {start: result.sundayStart, end: result.sundayEnd}
        }
        console.log(updateWorkPlan);
        this.resourceService.updateWorkPlan(updateWorkPlan, element.id).subscribe(response => {
          this.snackBar.open("Plan pracy zaktulizowany pomyślnie", '', {
            duration: 3000,
            panelClass: ['success']
          })
        })
      })
    }
  }

  formatter(value) {
    return (value === true) ? 'Tak' : ((value === false) ? 'Nie' : '');
  }

  logout() {
    this.authenticationService.logOut();
    this.router.navigate(['home']);
  }
}

