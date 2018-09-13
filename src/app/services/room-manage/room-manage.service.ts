import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry, map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';
@Injectable()
export class RoomManageService {

  constructor(private http: HttpClient) { }

  getRooms(url: string): Observable<HttpResponse<Response<Room>>> {
    return this.http.get<Response<Room>>(url, { observe: 'response' }).pipe(retry(3), catchError(this.handleError));
  }

  putRoom(url: string, room: Room): Observable<HttpResponse<Response<any>>> {
    return this.http.put<Response<any>>(
      url, room ,{ observe: 'response', headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }) }).pipe(retry(3), catchError(this.handleError));
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

export interface Room {
  RoomNumber: number,
  FloorNumber: number,
  RoomName: string,
  RoomType:string,
  MaxOccupancy:number,
  Tel:string,
  
}

export interface Response<T> {
  status: string;
  response: T[];
}
