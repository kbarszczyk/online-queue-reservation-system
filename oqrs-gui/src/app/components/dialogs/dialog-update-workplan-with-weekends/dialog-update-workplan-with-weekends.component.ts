import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UpdateWorkPlanDTO} from "../../../dto/UpdateWorkPlanDTO";
import {UpdateWorkPlanWeekendDTO} from "../../../dto/UpdateWorkPlanWeekendDTO";

@Component({
  selector: 'app-dialog-update-workplan-with-weekends',
  templateUrl: './dialog-update-workplan-with-weekends.component.html',
  styleUrls: ['./dialog-update-workplan-with-weekends.component.css']
})
export class DialogUpdateWorkplanWithWeekendsComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogUpdateWorkplanWithWeekendsComponent>,
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
      saturdayStart: ['', Validators.required],
      saturdayEnd: ['', Validators.required],
      sundayStart: ['', Validators.required],
      sundayEnd: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
