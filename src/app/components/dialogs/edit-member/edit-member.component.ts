import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {
  editMemberForm: FormGroup;
  member: any;

  constructor(
    public dialogRef: MatDialogRef<EditMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
      this.member = data;
     }

     ngOnInit() {
      this.createForm();
      
    }
  
    createForm() {
      console.log(this.member);
      this.editMemberForm = this.fb.group({
        email: this.member.Email
      });
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onSubmit(){
      console.log(this.editMemberForm);
      this.dialogRef.close();
    }

}
