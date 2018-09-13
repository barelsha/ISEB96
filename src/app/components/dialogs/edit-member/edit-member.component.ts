import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RoomService, Member } from '../../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {
  editMemberForm: FormGroup;
  member: any;
  url: string;
  titles: any[] = ["פרופסור", 'דוקטור', "מר", "גברת" ];
  isChecked: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private roomService: RoomService) {
      this.member = data.member;
      this.url = data.url;
      this.isChecked = this.member.Supervisor === 'no' ? false : true;
    }

    ngOnInit() {
      this.createForm();
    }
  
    createForm() {
      this.editMemberForm = this.fb.group({
        email: [this.member.Email, [Validators.required, Validators.email]],
        supervisor: this.isChecked,
        title: [this.member.Title, Validators.required]
      });
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onSubmit(){
      let oldMember = this.member;
      this.member = this.prepareAddMember(oldMember);
      console.log(this.member);
      if(oldMember.Supervisor ==='yes' || this.checkIfThereIsMoreThanOneSupervisor(this.member.Supervisor === 'yes')){
        this.roomService.putMember(this.url + '/editRoomPeople/'+ oldMember.FirstName
        +'/' + oldMember.LastName + '/' + oldMember.Email, this.member)
        .subscribe(resp => {
            this.dialogRef.close({resp: resp, editedMember: this.member, oldMember: oldMember, bool: true});
        });
      }
      else{
        this.dialogRef.close({bool: false});
      }
    }

    checkIfThereIsMoreThanOneSupervisor(isSupervisorMarked: any): any {
      if(!isSupervisorMarked) return true;
      return this.data.members.filter(member => member.Supervisor === 'yes').length < 1;
    }

    OnChange(event){
      this.editMemberForm.controls.supervisor = event.checked;
    }

    prepareAddMember(oldMember): Member {
      let formModel = this.editMemberForm.value;
      let saveMember: Member = {
        FirstName: oldMember.FirstName,
        LastName: oldMember.LastName,
        Supervisor: formModel.supervisor ? 'yes' : 'no',
        Email: formModel.email,
        Title: formModel.title
      };
      return saveMember;
    }

    getEmailErrorMessage(){
      return this.editMemberForm.controls.email.hasError('required') ? 'הנך חייב להזין אימייל' : 
      this.editMemberForm.controls.email.hasError('email') ? 'האימייל שהזנת אינו תקין' : '';
    }

    getTitleErrorMessage(){
      return this.editMemberForm.controls.title.hasError('required') ? 'הנך חייב להזין תואר' : '';
    }

    checkFormStatus(){
      return this.editMemberForm.status === "INVALID";
    }

}
