import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry, map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';




@Injectable()
export class UsersManageService {

  constructor(private http: HttpClient) { }

  getUsers(url: string): Observable<HttpResponse<Response<User>>> {
    return this.http.get<Response<User>>(url, { observe: 'response' }).pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return new ErrorObservable('Something bad happened; please try again later.');
  }

  putUser(url: string, user: User): Observable<HttpResponse<Response<any>>> {
    return this.http.put<Response<any>>(
      url, user ,{ observe: 'response', headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }) }).pipe(retry(3), catchError(this.handleError));
  }

  deleteUser(url: string): Observable<Response<any>> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      // body: member
    };
    return this.http.delete<Response<any>>(
      url , options).pipe(retry(3), catchError(this.handleError));
  }

  addUser(url: string, user: User):  Observable<HttpResponse<Response<any>>> {
    return this.http.post<Response<any>>(
      url, user ,{ observe: 'response', headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      })}).pipe(retry(3), catchError(this.handleError));
  }
}

export interface User {
  Username: string,
  ID: string
  PermissionCode: number,
  
}

export interface Response<T> {
  status: string;
  response: T[];
}




