import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService, LoginData, LoginRes } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private loginService: LoginService) { }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.loginForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      ID: ['', Validators.required]
    });
  }
  
  onSubmit(){
    let loginData = this.getLoginData();
    this.loginService.login('/login', loginData).subscribe(x=>console.log(x));
    // this.member = this.prepareAddMember();
    // this.roomService.addMember(this.url + '/addPerson', this.member)
    // .subscribe(resp => {
    //   this.dialogRef.close({resp: resp, newMember: this.member});
    // }, err =>{
    // });
  }

  getLoginData(): LoginData {
    let loginFormData : LoginData = this.loginForm.value;
    let login: LoginData = {
      Username: loginFormData.Username,
      Password: loginFormData.Password,
      ID: loginFormData.ID
    };
    return login;
  }

  

  getUsernameErrorMessage(){
    return this.loginForm.controls.Username.hasError('required') ? 'הנך חייב להזין שם משתמש' : '';
  }

  getPasswordErrorMessage(){
    return this.loginForm.controls.Password.hasError('required') ? 'הנך חייב להזין סיסמא' : '';
  }

  getIDErrorMessage(){
    return this.loginForm.controls.ID.hasError('required') ? 'הנך חייב להזין ת.ז' : '';
    
  }

  checkFormStatus(){
    return this.loginForm.status === "INVALID";
  }

}
