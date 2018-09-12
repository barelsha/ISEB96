import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RoomService, Member, PeopleRoom } from '../../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  addMemberForm: FormGroup;
  member: Member;
  url: string;
  members: PeopleRoom[];

  //#ffd740

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private roomService: RoomService) {
      this.url = data.url;
      this.members = data.members;
  }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.addMemberForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      supervisor: false,
      email: ['', [Validators.email, Validators.required]]
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.member = this.prepareAddMember();
    this.roomService.addMember(this.url + '/addPerson', this.member)
    .subscribe(resp => {
      this.dialogRef.close({resp: resp, newMember: this.member});
    }, err =>{
      this.openSnackBar('test', 'test');
    });
  }

  prepareAddMember(): Member {
    let formModel = this.addMemberForm.value;
    let saveMember: Member = {
      FirstName: formModel.firstName,
      LastName: formModel.lastName,
      Supervisor: formModel.supervisor ? 'yes' : 'no',
      Email: formModel.email
    };
    console.log(formModel.supervisor);
    return saveMember;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getEmailErrorMessage(){
    return this.addMemberForm.controls.email.hasError('required') ? 'הנך חייב להזין אימייל' : 
    this.addMemberForm.controls.email.hasError('email') ? 'האימייל שהזנת אינו תקין' : '';
  }

  getFirstNameErrorMessage(){
    return this.addMemberForm.controls.firstName.hasError('required') ? 'הנך חייב להזין שם פרטי' : '';
  }

  getLastNameErrorMessage(){
    return this.addMemberForm.controls.lastName.hasError('required') ? 'הנך חייב להזין שם משפחה' : '';
    
  }

  checkFormStatus(){
    return this.addMemberForm.status === "INVALID";
  }

  isEmailExist(){
    return this.members.map(x => x.Email).includes(this.addMemberForm.value.email);  
  }

}
