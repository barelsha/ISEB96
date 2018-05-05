import { Injectable, Optional, Inject } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Injectable()
export class RoomService {

  constructor(private http: HttpClient) {
    
  }
 
  getPeopleInRoom(url: string): Observable<HttpResponse<PeopleRoom>> {
    return this.http.get<PeopleRoom>(
      url, { observe: 'response' }).pipe(
        retry(3),
        catchError(this.handleError)
      );;
  }

  getRoomDetails(url: string): Observable<HttpResponse<PeopleRoom>> {
    return this.http.get<RoomDetails>(
      url, { observe: 'response' }).pipe(
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

export interface PeopleRoom {
    RoomNum: number,
    FloorNum: number,
    FirstName: string,
    LastName: string,
    Supervisor: string,
    Email: string
}

export interface RoomDetails {
  RoomNumber: number,
  FloorNumber: number,
  RoomName: string,
  Tel: string,
  RoomType: string,
  MaxOccupancy: string
}
