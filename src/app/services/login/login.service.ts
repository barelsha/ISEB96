import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry, map } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import * as moment from "moment";

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) {  }

  login(url: string, loginData: LoginData): Observable<Response<LoginRes>> {
    return this.http.post<Response<LoginRes>>(url, loginData, { 
        observe: 'response', 
        headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      })
    }).do(res => this.setSession)
    .pipe(retry(3), catchError(this.handleError)).shareReplay();
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }    

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, `+`body was: ${error.error}`);
    }
    return new ErrorObservable('Something bad happened; please try again later.');
  }

}


export interface LoginRes {
  Username: string,
  ID: string
}

export interface LoginData {
  Username: string,
  Password: string,
  ID: string
}



export interface Response<T> {
  status: string;
  response: T[];
}