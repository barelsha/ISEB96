import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { RoomDetails } from '../room/room.service';

@Injectable()
export class FloorSidenavService {

  private subject = new Subject<any>();
 
  sendData(data) {
      this.subject.next(data);
  }

  sendRoomNumbersData(data: any) {
    this.subject.next(data);
  }

  clearData() {
    this.subject.next();
  }

  getData(): Observable<any> {
      return this.subject.asObservable();
  }

}
