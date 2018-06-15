import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { ScheduleService } from './../../services/schedule/schedule.service';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) {
      this.setUrl();
  }

  ngOnInit() {
    this.scheduleService.getEvents(this.url).subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
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
    this.displayEvent = model;
  }

  eventClick(model: any) {
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
    console.log('The calendar has adjusted to a window resize');
  }

  viewRender(model: any) {
    console.log('viewRender');
  }

  eventRender(model: any) {
    this.logger.push(model);
  }

  initialized() {
    console.log('Initialized compleate');
  }

  select(model: any) {
    console.log(model);
  }

  unselect(model: any) {
    console.log(model);
  }

}
