import { Component, OnInit } from '@angular/core';
import {RoomService, PeopleRoom} from '../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomNumber: string;
  roomData: any;
  headers: any;
  error: any;
  loading: boolean;


  constructor(private roomService: RoomService, private route: ActivatedRoute) {
    console.log(this.route);
    this.roomNumber = this.route.snapshot.url.toString().split(',')[1];
    this.loading = true;
    console.log(this.roomNumber);
  }

  
  ngOnInit() {
    this.getRoomData();
  }


  //return room detailes from "Rooms" table
  // "response": [
  //     {
  //         "RoomNumber": 1,
  //         "FloorNumber": 1,
  //         "RoomName": "prof", -can be NULL
  //         "Tel": 111, -can be NULL
  //         "RoomType": "Sminar",
  //         "MaxOccupancy": 2
  //     }
  getRoomData() {
    this.roomService.getRoomDetails('roomsDetails/' + this.roomNumber)
      // resp is of type `HttpResponse<Room>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Room`.
        this.roomData = resp.body;
        this.loading = false;
        console.log(this.roomData);
      }, error => this.error = error /*error path*/);
      
  }

}
