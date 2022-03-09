import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-clear-breaks',
  templateUrl: './dialog-clear-breaks.component.html',
  styleUrls: ['./dialog-clear-breaks.component.css']
})
export class DialogClearBreaksComponent implements OnInit {


  formGroup!: FormGroup;

  days: Array<string> = [
    "monday",
    "thursday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ]

  constructor(public dialogRef: MatDialogRef<DialogClearBreaksComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      day: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
