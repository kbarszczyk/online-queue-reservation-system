import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UpdateWorkPlanWeekendDTO} from "../../../dto/UpdateWorkPlanWeekendDTO";

@Component({
  selector: 'app-dialog-update-workplan-without-weekends',
  templateUrl: './dialog-update-workplan-without-weekends.component.html',
  styleUrls: ['./dialog-update-workplan-without-weekends.component.css']
})
export class DialogUpdateWorkplanWithoutWeekendsComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogUpdateWorkplanWithoutWeekendsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UpdateWorkPlanWeekendDTO,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      mondayStart: ['', Validators.required],
      mondayEnd: ['', Validators.required],
      tuesdayStart: ['', Validators.required],
      tuesdayEnd: ['', Validators.required],
      wednesdayStart: ['', Validators.required],
      wednesdayEnd: ['', Validators.required],
      thursdayStart: ['', Validators.required],
      thursdayEnd: ['', Validators.required],
      fridayStart: ['', Validators.required],
      fridayEnd: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
