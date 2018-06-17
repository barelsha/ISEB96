import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RoomService, PeopleRoom, RoomDetails } from '../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';
import { RoomSidenavService } from './../../services/room-sidenav/room-sidenav.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomDetails: RoomDetails;

  constructor(private roomService: RoomService, 
    private route: ActivatedRoute, 
    private roomSidenavService: RoomSidenavService) {
  }

  ngOnInit() {
    this.route.data.subscribe(res => {
      this.roomDetails = res.roomDetailsResolver.body.response;
      this.roomService.roomDetails = this.roomDetails;
      this.sendData();
    });
  }

  sendData(){
    this.roomSidenavService.sendData(this.roomDetails);
  }

  ngOnDestroy(){
    // clear message
    this.roomSidenavService.clearData();
  }

  clearData(){
    // clear message
    this.roomSidenavService.clearData();
  }

}


