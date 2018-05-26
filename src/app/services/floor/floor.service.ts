import { Injectable, Optional, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry, map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class FloorService {
  roomDetails: FloorDetails;

  constructor(private http: HttpClient) {}

  getFloorDetails(url: string): Observable<HttpResponse<Response<FloorDetails>>> {
    return this.http.get<Response<FloorDetails>>(url, { observe: 'response' }).pipe(
        retry(3), catchError(this.handleError));
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


export interface FloorDetails {
  RoomNumber: number,
  FloorNumber: number,
  RoomName: string,
  Tel: string,
  RoomType: string,
  MaxOccupancy: string
}

export interface Response<T> {
  status: string;
  response: T[];
}