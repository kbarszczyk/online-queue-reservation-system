import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddBreakDTO} from "../../../dto/AddBreakDTO";

@Component({
  selector: 'app-dialog-add-break',
  templateUrl: './dialog-add-break.component.html',
  styleUrls: ['./dialog-add-break.component.css']
})
export class DialogAddBreakComponent implements OnInit {

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

  constructor(public dialogRef: MatDialogRef<DialogAddBreakComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AddBreakDTO,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      breakDay: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dayTranslate(value) {
    switch (value) {
      case "monday":
        return "Poniedziałek";
        break;
      case "tuesday":
        return "Wtorek";
        break;
      case "wednesday":
        return "Środa";
        break;
      case "thursday":
        return "Czwartek";
        break;
      case "friday":
        return "Piątek";
        break;
      case "saturday":
        return "Sobota";
        break;
      case "sunday":
        return "Niedziela";
        break;
      default:
        return "Nieoczekiwany błąd!";
        break;
    }
  }

}
