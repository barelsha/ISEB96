import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { ScheduleService, FullCalendarEvent } from './../../services/schedule/schedule.service';
import{ AddEventComponent } from '../dialogs/add-event/add-event.component';
import{ EditEventComponent } from '../dialogs/edit-event/edit-event.component';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as moment from "moment";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {

  url: string;
  calendarOptions: Options;
  displayEvent: any;
  logger: any[] = [];
  events: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private scheduleService: ScheduleService, 
    public dialog: MatDialog,
    private route: ActivatedRoute) {
      this.setUrl();
  }

  ngOnInit() {
    this.scheduleService.getEvents(this.url).subscribe(data => {
      this.calendarOptions = {
        defaultView: 'agendaWeek',
        editable: true,
        locale: 'he',
        timezone: 'local',
        
        isRTL: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        buttonText:{
          today: 'היום',
          month: 'חודש',
          week: 'שבוע',
          day: 'יום',
          list: 'רשימה'
        },
        selectable: true,
        events: data,
      };
    });
  }

  setUrl(){
    this.url = this.route.parent.parent.snapshot.url.toString().split(',')[0] + "/" 
    + this.route.parent.parent.snapshot.url.toString().split(',')[1] + "/"
    + this.route.parent.snapshot.url.toString().split(',')[0] + "/" 
    + this.route.parent.snapshot.url.toString().split(',')[1] + "/"
    + this.route.snapshot.url.toString().split(',')[0];
  }

  

  clearEvents() {
    this.events = [];
  }

  loadAgain() {
    this.scheduleService.getEvents(this.url).subscribe(data => {
      this.events = data;
    });
  }

  clickButton(model: any) {
    console.log(model);
    this.displayEvent = model;
  }

  eventClick(model: any) {
    console.log(model);
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
      },
      duration: {}
    }
    this.displayEvent = model;
  }

  updateEvent(model: any) {
    console.log(model);
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

  windowResize(model: any) {
    console.log(model);
    //console.log('The calendar has adjusted to a window resize');
  }

  viewRender(model: any) {
    console.log(model);
    //console.log('viewRender');
  }

  eventRender(model: any) {
    console.log(model);
    this.logger.push(model);
  }

  initialized() {
    //console.log('Initialized compleate');
  }

  select(model: any) {
    console.log(model);
    this.openAddEventDialog(model);
  }

  unselect(model: any) {
    console.log(model);
  }

  openAddEventDialog(model: any): void {
    let dialogRef = this.dialog.open(AddEventComponent, {
      width: '500px',
      data: model
    });
    dialogRef.afterClosed().subscribe(event => {
      if(event !== undefined){
        let date = moment(event.date).format('YYYY-MM-DD');
        let startTime = event.start;
        let endTime = event.end;
        let endDateTime = moment(date + ' ' + endTime, 'YYYY-MM-DD HH:mm').format();
        let startDateTime = moment(date + ' ' + startTime, 'YYYY-MM-DD HH:mm').format();
        let fullCalendarEvent: FullCalendarEvent = {
          title: event.title,
          start: startDateTime,
          end: endDateTime
        };
        this.events.push(
          {
            title: event.title,
            start: startDateTime,
            end: endDateTime
          }
        );
        this.ucCalendar.renderEvents(this.events);
        this.scheduleService.addEvent(this.url, fullCalendarEvent).subscribe(x=> console.log(x));
        
      }
    }, 
    err =>{

    });
  }

}
