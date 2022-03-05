import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ResourceCreateDTO} from "../../../dto/ResourceCreateDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-add-resource',
  templateUrl: './dialog-add-resource.component.html',
  styleUrls: ['./dialog-add-resource.component.css']
})
export class DialogAddResourceComponent implements OnInit {

  resourceGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogAddResourceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ResourceCreateDTO,
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
