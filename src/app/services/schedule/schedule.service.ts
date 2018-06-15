import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ScheduleService {

  constructor(private http: HttpClient){ }

  getEvents(url: string): Observable<FullCalendarEvent[]> {
      return this.http.get<Response<any>>( url, { observe: 'response' })
      .pipe(extractResponse, transferToFullCalendarFormat, retry(3), catchError(this.handleError));
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

export const extractResponse = map((httpResponseFromGoogleAPI: HttpResponse<Response<GoogleAPIEvent>>): GoogleAPIEvent[] => 
  httpResponseFromGoogleAPI.body.response);


export const transferToFullCalendarFormat = map((googleAPIEvents: GoogleAPIEvent[]) : FullCalendarEvent[] => {
  return googleAPIEvents.map(googleAPIEvent  => ({
    title: googleAPIEvent.summary,
    start: googleAPIEvent.start.dateTime,
    end: googleAPIEvent.end.dateTime
  }))
}
  
);

export interface Response<T> {
  status: string;
  response: T[];
}

export interface GoogleAPIDate {
  dateTime: string
}

export interface GoogleAPIEvent{
  created: string,
  creator:  object,
  end: GoogleAPIDate,
  etag: string,
  extendedProperties: object,
  htmlLink: string,
  iCalUID: string,
  id: string,
  kind: string,
  organizer: object,
  reminders: object,
  sequence: number,
  start: GoogleAPIDate,
  status: string,
  summary: string,
  updated: string
}

export interface FullCalendarEvent{
  title: string,
  start:  string,
  end: string
}

