import { Injectable, Optional, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry, map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RoomService {

  roomDetails: RoomDetails;

  constructor(private http: HttpClient) {}
 
  getPeopleInRoom(url: string): Observable<HttpResponse<Response<PeopleRoom>>> {
    return this.http.get<Response<PeopleRoom>>( url, { observe: 'response' })
    .pipe(retry(3), catchError(this.handleError));
  }

  getRoomDetails(url: string): Observable<HttpResponse<Response<RoomDetails>>> {
    return this.http.get<Response<RoomDetails>>(url, { observe: 'response' }).pipe(
        retry(3), catchError(this.handleError));
  }

  addMember(url: string, member: Member): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      url, member ,{ observe: 'response', headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }) }).pipe(retry(3), catchError(this.handleError));
  }

  deleteMember(url: string, member : { FirstName: string, LastName: string, Email: string }): Observable<Response<any>> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: member
    };
    return this.http.delete<Response<any>>(
      url , options).pipe(retry(3), catchError(this.handleError));
  }

  putMember(url: string, member: Member): Observable<HttpResponse<Response<any>>> {
    return this.http.put<Response<any>>(
      url, member ,{ observe: 'response', headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }) }).pipe(retry(3), catchError(this.handleError));
  }

  getEquipmenteInRoom(url: string): Observable<HttpResponse<Response<EquipmentRoom>>> {
    return this.http.get<Response<EquipmentRoom>>( url, { observe: 'response' })
    .pipe(retry(3), catchError(this.handleError));
  }

  addEquipment(url: string, equip: Equipment): Observable<HttpResponse<Response<any>>> {
    return this.http.post<Response<any>>(
      url, equip ,{ observe: 'response', headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }) }).pipe(retry(3), catchError(this.handleError));
  }

  deleteEquipment(url: string, equip : {
    EquipName: string, 
    Inventor: number, 
    Status: string, 
    Warranty: Date | string,
    Description: string
  }): Observable<HttpResponse<Response<any>>> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: equip
    };
    return this.http.delete<Response<any>>(
      url , options).pipe(retry(3), catchError(this.handleError));
  }

  putEquipment(url: string, equip: Equipment): Observable<HttpResponse<Response<any>>> {
    return this.http.put<Response<any>>(
      url, equip ,{ observe: 'response', headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      })}).pipe(retry(3), catchError(this.handleError));
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

export interface EquipmentRoom {
  RoomNum: number,
  FloorNum: number,
  EquipName: string,
  Inventor: string,
  Status: string,
  Warranty: string,
  Description: string
}

export interface Member {
  FirstName: string,
  LastName: string,
  Supervisor: string,
  Email: string
}

export interface Equipment {
  EquipName: string,
  Inventor: number,
  Status: string,
  Warranty: Date | string,
  Description: string
}

export interface Response<T> {
  status: string;
  response: T[];
}

@Injectable()
export class RoomDetailsResolver implements Resolve<HttpResponse<Response<RoomDetails>>> {

  constructor(private roomService: RoomService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HttpResponse<Response<RoomDetails>>> {
    return this.roomService.getRoomDetails('roomsDetails/' + route.params.roomid);
  }
}
