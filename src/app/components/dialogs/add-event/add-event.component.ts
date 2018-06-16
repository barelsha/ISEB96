import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from "moment";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  addEventForm: FormGroup;
  url: string;

  constructor(public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.createForm(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  createForm(data: any) {
    let start = moment(data.start._d).format('HH:mm');
    let end = moment(data.end._d).format('HH:mm');
    let date = data.end._d;
    this.addEventForm = this.fb.group({
      title: ['', Validators.required],
      date: [date, Validators.required],
      start: [start, Validators.required],
      end: [end, Validators.required]
    });
  }

  onSubmit(){
    let event = this.prepareAddEvent();
    this.dialogRef.close(event);
    // this.member = this.prepareAddEvent();
    // this.roomService.addMember(this.url + '/addPerson', this.member)
    // .subscribe(resp => {
    //   this.dialogRef.close({resp: resp, newMember: this.member});
    // }, err =>{
    // });
  }

  prepareAddEvent() {
    let formModel = this.addEventForm.value;
    let saveEvent = {
      title: formModel.title,
      date: formModel.date,
      start: formModel.start,
      end: formModel.end
    };
    return saveEvent;
  }

  getEmailErrorMessage(){
    // return this.addMemberForm.controls.email.hasError('required') ? 'הנך חייב להזין אימייל' : 
    // this.addMemberForm.controls.email.hasError('email') ? 'האימייל שהזנת אינו תקין' : '';
  }

  getTitleErrorMessage(){
    return this.addEventForm.controls.title.hasError('required') ? 'הנך חייב להזין כותרת לאירוע' : '';
  }

  getEndErrorMessage(){
    return this.addEventForm.controls.end.hasError('required') ? 'הנך חייב להזין שעת התחלה' : '';
    
  }

  getStartErrorMessage(){
    return this.addEventForm.controls.start.hasError('required') ? 'הנך חייב להזין שעת סיום' : '';
  }

  getDateErrorMessage(){
    return this.addEventForm.controls.date.hasError('required') ? 'הנך חייב להזין תאריך' : '';
  }

  checkFormStatus(){
    return this.addEventForm.status === "INVALID";
  }

  isEmailExist(){
    // return this.members.map(x => x.Email).includes(this.addMemberForm.value.email);  
  }

}
