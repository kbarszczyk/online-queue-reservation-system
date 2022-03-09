import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ResourceUpdateDTO} from "../../../dto/ResourceUpdateDTO";

@Component({
  selector: 'app-dialog-update-resource',
  templateUrl: './dialog-update-resource.component.html',
  styleUrls: ['./dialog-update-resource.component.css']
})
export class DialogUpdateResourceComponent implements OnInit {

  resourceGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogUpdateResourceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ResourceUpdateDTO,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.resourceGroup = this._formBuilder.group({
      name: ['', Validators.required],
      weekends: ['', Validators.required],
      length: ['', Validators.required],
      slots: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
