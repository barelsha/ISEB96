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

  constructor(
    public dialogRef: MatDialogRef<EditMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private roomService: RoomService) {
      this.member = data.member;
      this.url = data.url;
     }

     ngOnInit() {
      this.createForm();
      
    }
  
    createForm() {
      this.editMemberForm = this.fb.group({
        email: [this.member.Email, [Validators.required, Validators.email]]
      });
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onSubmit(){
      let oldMember = this.member;
      this.member = this.prepareAddMember(oldMember);
      this.roomService.putMember(this.url + '/editRoomPeople/'+ oldMember.FirstName
       +'/' + oldMember.LastName + '/' + oldMember.Email, this.member)
      .subscribe(resp => {
          this.dialogRef.close(
            {
              resp: resp.body.status, 
              editedMember: this.member,
              oldMember: oldMember
            });
      });
    }

    prepareAddMember(oldMember): Member {
      let formModel = this.editMemberForm.value;
      let saveMember: Member = {
        FirstName: oldMember.FirstName,
        LastName: oldMember.LastName,
        Supervisor: "no",
        Email: formModel.email
      };
      return saveMember;
    }

    getEmailErrorMessage(){
      return this.editMemberForm.controls.email.hasError('required') ? 'הנך חייב להזין אימייל' : 
      this.editMemberForm.controls.email.hasError('email') ? 'האימייל שהזנת אינו תקין' : '';
    }

    checkFormStatus(){
      return this.editMemberForm.status === "INVALID";
    }

}
