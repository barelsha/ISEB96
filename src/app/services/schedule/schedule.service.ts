import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import * as moment from "moment";

@Injectable()
export class ScheduleService {


  events: FullCalendarEvent[] = [];

  constructor(private http: HttpClient){ }

  getEvents(url: string): Observable<FullCalendarEvent[]> {
    return this.http.get<Response<any>>( url, { observe: 'response' })
    .pipe(
      extractResponse, 
      transferToFullCalendarFormat, 
      this.setEvents, 
      retry(3), 
      catchError(this.handleError)
    );
  }

  addEvent(url: string, event: FullCalendarEvent): Observable<any> {
    let googleAPIEvent : GoogleAPIEvent = getGoogleAPIEventFormat(event);
    return this.http.post<Response<any>>(url, googleAPIEvent, { observe: 'response'})
    .pipe(
      extractResponse, 
      map(res => transformGCEventToFCEvent(res)),
      //this.checkForOverlapping,
      //this.add
      //retry(3), 
      //catchError(this.handleError)
    );
  }

  deleteEvent(url: string, id : string): Observable<HttpResponse<any>> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
      body: {
        eventId: id
      }
    };
    return this.http.delete<Response<any>>(url, options)
    .pipe(
      //extractResponse,
      //this.delete,
      //retry(3), 
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(`Backend returned code ${error.status}, `+`body was: ${error.error}`);
      }
      return new ErrorObservable('Something bad happened; please try again later.');
  }

  setEvents = tap((events: FullCalendarEvent[]) => {
    this.events = events
  });

  checkForOverlapping = tap((res: FullCalendarEvent) => {
    let startDate = new Date(res.start);
    let endDate = new Date(res.end);
    let eventsOfDay = getEventsPerDay(this.events, res);
    let result = eventsOfDay.filter((event: FullCalendarEvent) => dateRangeOverlaps(new Date (event.start), new Date (event.end), new Date (startDate), new Date (endDate)));
    if(result.length > 0) throw new Error("ישנה חפיפה עם אירוע אחר");
  });

  add = tap((res: FullCalendarEvent) =>{
    this.events.push(res);
  });

  delete = tap((res: FullCalendarEvent) =>{
    this.events.push(res);
  });
}

export const extractResponse = map((httpResponseFromGoogleAPI: HttpResponse<Response<any>>): any[] | any => 
  httpResponseFromGoogleAPI.body.response);

export const transferToFullCalendarFormat = map((googleAPIEvents: GoogleAPIEvent[]) : FullCalendarEvent[] => {
  return googleAPIEvents.map(googleAPIEvent  => transformGCEventToFCEvent(googleAPIEvent))
});

function transformGCEventToFCEvent(googleAPIEvent: GoogleAPIEvent): FullCalendarEvent {
  return ({
    title: googleAPIEvent.summary,
    start: googleAPIEvent.start.dateTime,
    end: googleAPIEvent.end.dateTime,
    id: googleAPIEvent.id
  });
}

export function getEventsPerDay(events: FullCalendarEvent[], event: FullCalendarEvent): FullCalendarEvent[] {
  return events.filter(eve => isEventDayEqual(new Date(event.start), new Date(eve.start)))
}

export function isEventDayEqual(eventA: Date, eventB: Date): Boolean {
  return eventA.getFullYear === eventB.getFullYear && eventA.getMonth === eventB.getMonth && eventA.getDay === eventB.getDay;
}

export function dateRangeOverlaps(a_start: Date, a_end: Date, b_start: Date, b_end: Date) {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end   && b_end   <= a_end) return true; // b ends in a
  if (b_start <  a_start && a_end   <  b_end) return true; // a in b
  return false;
}

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

  // url, googleAPIEvent ,{ observe: 'response', headers: new HttpHeaders({
  //   'Content-Type': 'application/json; charset=UTF-8'
  // })