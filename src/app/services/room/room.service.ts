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
 
  getPeopleInRoom(url: string): Observable<HttpResponse<Response<PeopleRoom>>> {
    return this.http.get<Response<PeopleRoom>>(
      url, { observe: 'response' }).pipe(
        retry(3),
        catchError(this.handleError)
      );;
  }

  getRoomDetails(url: string): Observable<HttpResponse<Response<RoomDetails>>> {
    return this.http.get<Response<RoomDetails>>(
      url, { observe: 'response' }).pipe(
        retry(3),
        catchError(this.handleError)
      );;
  }

  addMember(url: string, member: Member): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      url, member ,{ observe: 'response' }).pipe(
        retry(3),
        catchError(this.handleError)
      );;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
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

export interface Member {
  FirstName: string,
  LastName: string,
  Supervisor: string,
  Email: string
}

export interface Response<T> {
  status: number;
  response: T[];
}
