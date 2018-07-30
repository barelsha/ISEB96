import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersManageSidenavService {

  private subject = new Subject<any>();
 
    sendData() {
        this.subject.next({
            from: 'UsersManageComponent',
            to: 'SidenavComponent',
            data: {
              header: 'ניהול משתמשים'
            }
          });
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
