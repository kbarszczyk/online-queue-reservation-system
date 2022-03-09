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
  constructor(private resourceService: ResourceService, public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
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
          this.snackBar.open("Resource with this name already exists.Pass another one", '', {
            duration: 3000,
            panelClass: ['failed']
          })
          return;
        }
        this.resourceService.addResource(this.resourceCreateDTO).subscribe(response => {
          console.log(response);
          this.snackBar.open("Resource added successfully!", '', {
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
    this.snackBar.open("Resource deleted", '', {
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
        this.snackBar.open("Resource updated successfully!", '', {
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
        this.snackBar.open("Break added successfully!", '', {
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
        this.snackBar.open("Breaks deleted", '', {
          duration: 3000,
          panelClass: ['success']
        })
      })
    })
  }
}
