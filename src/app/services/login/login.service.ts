import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import * as moment from "moment";
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class LoginService {

  loginError: number = null;
  loggedInUser: User;
  constructor(private http: HttpClient) {  }

  login(url: string, loginData: LoginData): Observable<Token> {
    return this.http.post<Token>(url, loginData, { 
        observe: 'response', 
        headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    })
    .pipe(map(x => x.body), retry(3), tap(res => this.setSession(res)), catchError(this.handleError));
  }

  private setSession(authResult) {
    if(userIsAuthorized(authResult)){
      localStorage.setItem('token', authResult.token);
      this.setUser(localStorage.getItem('token'));
    }
    else{
      this.loginError = authResult;
    }
  }          

  logout() {
    localStorage.removeItem("token");
  }

  setUser(token: string){
    let jwtHelper = new JwtHelper();
    let user : AfterTokenDecodeObject = jwtHelper.decodeToken(token);
    this.loggedInUser = {
      Username: user.Username,
      PermissionCode: user.PermissionCode
    }
  }

  public isLoggedIn() {
    let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');
    if(token !== null){
      return !jwtHelper.isTokenExpired(token);
    }
    else return false;
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
    // const expiration = localStorage.getItem("expires_at");
    // const expiresAt = JSON.parse(expiration);
    // return moment(expiresAt);
  }    

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, `+`body was: ${error.error}`);
    }
    return Observable.throw(error);
  }

}

function userIsAuthorized(authResult){
  return !((authResult === LoginError.EnteredCatch) || (authResult === LoginError.MissingParameters)
    || (authResult === LoginError.SystemAuthorization) || (authResult === LoginError.UniversityAuthorization));
}


export interface User {
  Username: string,
  PermissionCode: number
}

export interface LoginData {
  Username: string,
  Password: string,
  ID: string
}

export interface Token{
  token: string
}

export interface Response<T> {
  status: string;
  response: T[];
}

export interface AfterTokenDecodeObject {
  ID: number,
  PermissionCode: number,
  Username: string,
  exp: number,
  iat: number
}


export const LoginError = {
  UniversityAuthorization: 1,
  SystemAuthorization: 2,
  MissingParameters: 3,
  EnteredCatch: 4,
  properties: {
    1: { description: "didnt pass university authorization", value: 1 },
    2: { description: "didnt pass system authorization", value: 2 },
    3: { description: "missing arguments in http body", value: 3 },
    4: { description: "request route process entered catch scope while run time", value: 4 }
  }
};

