import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginService, LoginData, LoginError } from '../../services/login/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: Boolean = false;

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) { }

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
    this.loading = true;
    let loginData = this.getLoginData();
    this.loginService.login('/login', loginData).subscribe(
      loginResponse => {
        this.loading = false;
        this.router.navigateByUrl('/');
      },
      loginError => {
        this.loading = false;
      }
      // this.handleLoginResponse, 
      // this.handleLoginError
    );
  }

  getLoginErrorReason() : string{
    let error = this.loginService.loginError;
    if(error === null) return "";
    if(error === LoginError.EnteredCatch) return "שגיאה";
    if(error === LoginError.MissingParameters) return "שגיאה";
    if(error === LoginError.SystemAuthorization) return "אין לך הרשאות גישה למערכת, פנה למנדי";
    if(error === LoginError.UniversityAuthorization) return "אחד או יותר מהפרטים המזהים שהקלדת שגוי";
    return "";
  }

  handleLoginResponse(loginResponse){
    if(loginResponse === LoginError.EnteredCatch || loginResponse === LoginError.MissingParameters
      ||loginResponse === LoginError.EnteredCatch ||loginResponse === LoginError.EnteredCatch){

    }
    this.loading = false;
  }

  handleLoginError(err){
    this.loading = false;
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
