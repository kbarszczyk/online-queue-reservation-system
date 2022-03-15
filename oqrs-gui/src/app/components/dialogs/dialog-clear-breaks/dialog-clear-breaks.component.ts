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
