import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UsersManageService, User } from '../../../services/users-manage/users-manage.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';






@Component({
  selector: 'app-edit-username',
  templateUrl: './edit-username.component.html',
  styleUrls: ['./edit-username.component.css']
})
export class EditUsernameComponent implements OnInit {
  editUserForm: FormGroup;
  user: User;
  //url: string;

  constructor(public dialogRef: MatDialogRef<EditUsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private UsersManageService: UsersManageService) {
      //should get user??
    this.user = this.data;
    //this.url = data.url;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.editUserForm = this.fb.group({
      userName: [this.user.Username, [Validators.required]],
      ID: [this.user.ID,[Validators.required]],
      permissionCode:[this.user.PermissionCode,[Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
     let oldUser = this.user;
    // this.user = this.prepareAddUser(oldUser);
    this.user=this.prepareAddUser();
    this.UsersManageService.putUser('/users/editUser/' + oldUser.Username
      + '/' , this.user)
      .subscribe(resp => {
        this.dialogRef.close(
          {
            resp: resp.body.status,
            editedMember: this.user,
            oldUser: oldUser
          });
      });
  }

 // prepareAddUser(oldMember): User {
    prepareAddUser(): User {
    let formModel = this.editUserForm.value;
    let saveUser: User = {
      Username: formModel.userName,
      ID: formModel.ID,
      PermissionCode: formModel.permissionCode
    };
    return saveUser;
  }


/////



  // getEmailErrorMessage() {
  //   return this.editMemberForm.controls.email.hasError('required') ? 'הנך חייב להזין אימייל' :
  //     this.editMemberForm.controls.email.hasError('email') ? 'האימייל שהזנת אינו תקין' : '';
  // }

  checkFormStatus() {
    return this.editUserForm.status === "INVALID";
  }
}




