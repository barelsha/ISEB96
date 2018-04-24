import { Component, OnInit } from '@angular/core';
import {RoomService, Room} from '../../services/room/room.service'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  constructor(private roomService: RoomService) { }
  folders = [
    {
      name: 'רוברט מושקוביץ',
      updated: /*new Date('1/1/16')*/'mail@mail.com'
    },
    {
      name: 'שחר בראל',
      updated: 'barelshahar2@gmail.com'
      // updated: new Date('1/17/16'),
    },
    {
      name: 'לינוי קלכמן',
      updated: 'linoykal@gmail.com'
    }
  ];
  notes = [
    {
      name: 'מספר אנשים מקסימלי',
      updated: 3
    },
    {
      name: 'אחראי חדר',
      updated: 'רוברט מושקוביץ'
    }
  ];

  roomData: Room;
  headers: any;
  error: any;
  ngOnInit() {
    this.getRoomData();
  }

  getRoomData() {
    this.roomService.getRoomResponse()
      // resp is of type `HttpResponse<Room>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Room`.
        this.roomData = resp.body;
        console.log(this.roomData);
      }, error => this.error = error /*error path*/);
  }
  
  

  

}
