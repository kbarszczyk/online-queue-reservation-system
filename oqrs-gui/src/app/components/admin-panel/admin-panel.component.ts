import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import {Resource} from "../../models/Resource";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddResourceComponent} from "../dialogs/dialog-add-resource/dialog-add-resource.component";
import {ResourceCreateDTO} from "../../dto/ResourceCreateDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTable} from "@angular/material/table";

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

  constructor(private resourceService: ResourceService, public dialog: MatDialog,
              private snackBar: MatSnackBar, private changeDetectorRefs: ChangeDetectorRef) {
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
      console.log("add resource dialog closed");
      this.resourceCreateDTO = result;
      console.log(this.resourceCreateDTO);
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
}
