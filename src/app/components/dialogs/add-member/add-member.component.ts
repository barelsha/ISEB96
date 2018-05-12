import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RoomService, Member } from '../../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  addMemberForm: FormGroup;
  member: Member;
  url: string;

  constructor(
    public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private fb: FormBuilder,
    private roomService: RoomService) {
      this.url = data;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addMemberForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: ''
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
    });
  }

  prepareAddMember(): Member {
    let formModel = this.addMemberForm.value;
    let saveMember: Member = {
      FirstName: formModel.firstName,
      LastName: formModel.lastName,
      Supervisor: "no",
      Email: formModel.email
    };
    return saveMember;
  }

}
