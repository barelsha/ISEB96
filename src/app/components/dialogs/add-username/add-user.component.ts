import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UsersManageService, User } from '../../../services/users-manage/users-manage.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup;
  user: User;
  //url: string;
  users: User[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private UsersManageService: UsersManageService) { 
      //this.url = data.url;
      //shoulg give me all the users
      //this.users = data.users;
    }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      ID: ['', Validators.required],
      permissionCode: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.user = this.prepareAddUser();
    this.UsersManageService.addUser('/username/insertNew/new', this.user)
    .subscribe(resp => {
      this.dialogRef.close({resp: resp.body.status,
        newMember: this.user});
    }, err =>{
      this.openSnackBar('test', 'test');
    });
  }

  prepareAddUser(): User {
    let formModel = this.addUserForm.value;
    let saveMember: User = {
      Username: formModel.username,
      ID:formModel.ID,
      PermissionCode:formModel.permissionCode
    };
    return saveMember;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }



  getUsernamerrorMessage(){
    return this.addUserForm.controls.username.hasError('required') ? 'הנך חייב להזין שם משתמש' : '';
  }

  getIDErrorMessage(){
    return this.addUserForm.controls.ID.hasError('required') ? 'הנך חייב להזין ת.ז' : '';
    
  }
  getPerErrorMessage(){
    return this.addUserForm.controls.permissionCode.hasError('required') ? 'הנך חייב להזין הרשאות למשתמש' : '';
    
  }

  checkFormStatus(){
    return this.addUserForm.status === "INVALID";
  }

  isUsernameExist(){
    return this.users.map(x => x.Username).includes(this.addUserForm.value.username);  
  }
}