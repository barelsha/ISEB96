import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RoomService } from '../../../services/room/room.service';


@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  addMemberForm: FormGroup;
  member: any;

  constructor(
    public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private roomService: RoomService) {

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
    this.member = this.prepareSaveMember();
    //this.roomService.addMember(this.hero).subscribe(/* error handling */);
    //this.rebuildForm();
    console.log(this.member);
    this.dialogRef.close();
  }

  prepareSaveMember(): any {
    let formModel = this.addMemberForm.value;
    let saveMember = {
      firstName: formModel.firstName,
      lastName: formModel.lastName,
      email: formModel.email
    };
    return saveMember;
  }

}
