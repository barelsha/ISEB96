import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/observable';
import { catchError, retry, map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, RouterStateSnapshot, Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PeopleSearchService {

    constructor(private http: HttpClient) { }

    getPeople(url: string): Observable<HttpResponse<Response<people>>> {
        return this.http.get<Response<people>>(url, { observe: 'response' }).pipe(retry(3), catchError(this.handleError));
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

export interface people {
    RoomNum: number,
    FloorNum: number,
    FirstName: string,
    LastName: string,
    Supervisor: number,
    Email: string,
}

export interface Response<T> {
    status: string;
    response: T[];
}



