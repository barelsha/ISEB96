import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import{ RemoveEventComponent } from '../remove-event/remove-event.component';
import { ActivatedRoute } from '@angular/router';
import * as moment from "moment";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  eventId: string;
  constructor(public dialogRef: MatDialogRef<EditEventComponent>,
    public removeEventDialogRef: MatDialogRef<RemoveEventComponent>,
    public removeDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private scheduleService: ScheduleService) { 
      this.eventId = this.data.event.id;
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  openRemoveEventDialog(){
    let dialogRef = this.removeDialog.open(RemoveEventComponent, {
      width: '500px',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(x => {
      this.dialogRef.close(x);
    });
  }

}
