import { Injectable, Optional, Inject } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class RoomService {

  configUrl = 'http://localhost:4000/floors/1/rooms/1';
  //configUrl = 'localhost:4000/floors/1/rooms/1';


  constructor(private http: HttpClient) { }
 
  getRoomResponse(): Observable<HttpResponse<Room>> {
    return this.http.get<Room>(
      this.configUrl, { observe: 'response' }).pipe(
        retry(3),
        catchError(this.handleError)
      );;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };
}

export interface Room {
    RoomNumber: number,
    FloorNumber: number,
    RoomName: string,
    Tel: string,
    Status: string,
    FirstName: string,
    LastName: string
}
