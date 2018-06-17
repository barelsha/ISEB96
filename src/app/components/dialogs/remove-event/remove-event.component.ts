import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ScheduleService } from '../../../services/schedule/schedule.service';

@Component({
  selector: 'app-remove-event',
  templateUrl: './remove-event.component.html',
  styleUrls: ['./remove-event.component.css']
})
export class RemoveEventComponent implements OnInit {

  constructor(private scheduleService: ScheduleService,
    public dialogRef: MatDialogRef<RemoveEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.scheduleService.deleteEvent(this.data.url, this.data.event.event.id).subscribe(resp => {
      this.dialogRef.close(this.data.event.event.id);
    });
  }

}
