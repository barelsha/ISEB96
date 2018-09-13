import { Injectable, Optional, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry, map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class FloorService {

  constructor(private http: HttpClient) {}

  getPeopleFloorDetails(url: string): Observable<HttpResponse<Response<FloorPeopleDBData>>> {
    return this.http.get<Response<FloorPeopleDBData>>(url, { observe: 'response' })
    .pipe(retry(3), catchError(this.handleError));
  }

  getEquipmentFloorDetails(url: string): Observable<HttpResponse<Response<FloorEquipmentDBData>>> {
    return this.http.get<Response<FloorEquipmentDBData>>(url, { observe: 'response' })
    .pipe(retry(3), catchError(this.handleError));
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


export interface FloorPeopleDBData {
  Cols: number
  Email: string,
  FirstName: string,
  FloorNum: number, // from PeopleInRoom
  FloorNumber: number, // From Rooms
  LastName: string,
  MaxOccupancy: number,
  RoomName: string,
  RoomNum: number, // from PeopleInRoom
  RoomNumber: number, // From Rooms
  RoomType: string,
  Rows: number,
  Supervisor: string,
  Tel: string,
  Title: string
}

export interface FloorEquipmentDBData {
  Description: string,
  EquipName: string,
  FloorNum: number,
  Inventor: number,
  RoomNum: number,
  Status: string,
  Warranty: string
}

export interface Response<T> {
  status: string;
  response: T[];
}