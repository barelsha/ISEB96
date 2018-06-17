import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ScheduleService {

  constructor(private http: HttpClient){ }

  getEvents(url: string): Observable<FullCalendarEvent[]> {
      return this.http.get<Response<any>>( url, { observe: 'response' })
      .pipe(extractResponse, transferToFullCalendarFormat, retry(3), catchError(this.handleError));
  }

  addEvent(url: string, event: FullCalendarEvent): Observable<HttpResponse<any>> {
    let googleAPIEvent : GoogleAPIEvent = getGoogleAPIEventFormat(event);
    return this.http.post<Response<any>>(url, googleAPIEvent, { observe: 'response'}).pipe();
  }

  // url, googleAPIEvent ,{ observe: 'response', headers: new HttpHeaders({
  //   'Content-Type': 'application/json; charset=UTF-8'
  // })

  deleteEvent(url: string, id : string): Observable<HttpResponse<any>> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: {
        eventId: id
      }
    };
    return this.http.delete<Response<any>>(url, options).pipe(retry(3), catchError(this.handleError));
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
    end: googleAPIEvent.end.dateTime,
    id: googleAPIEvent.id
  }))
});

export function getGoogleAPIEventFormat(fullCalendarEvent: FullCalendarEvent){
  let googleAPIEvent : GoogleAPIEvent = {
    end: {
      dateTime: fullCalendarEvent.end
    },
    start: {
     dateTime: fullCalendarEvent.start
    },
    summary: fullCalendarEvent.title,
    created: null,
    creator: null,
    etag: null,
    htmlLink: null,
    iCalUID: null,
    id: fullCalendarEvent.id,
    kind: null,
    organizer: null,
    reminders: null,
    sequence: null,
    extendedProperties: null,
    status: null,
    updated: null
  }
  return googleAPIEvent;
}
  

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
  end: string,
  id: string
}

