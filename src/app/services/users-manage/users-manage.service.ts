import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry, map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';




@Injectable()
export class UsersManageService {

  constructor(private http: HttpClient) { }

  getUsers(url: string): Observable<HttpResponse<Response<Users>>> {
    return this.http.get<Response<Users>>(url, { observe: 'response' }).pipe(retry(3), catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return new ErrorObservable('Something bad happened; please try again later.');
  }
}

export interface Users {
  Username: string,
  PermissionCode: number,
  ID: number
}

export interface Response<T> {
  status: string;
  response: T[];
}




