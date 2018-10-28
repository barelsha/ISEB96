import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RoomService, PeopleRoom, RoomDetails } from '../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';
import { RoomSidenavService } from './../../services/room-sidenav/room-sidenav.service';
import { floors } from '../../../assets/floors/floors';
import { FloorSidenavService } from './../../services/floor-sidenav/floor-sidenav.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomDetails: RoomDetails;
  floor: any;

  constructor(private roomService: RoomService,
    private route: ActivatedRoute,
    private roomSidenavService: RoomSidenavService,
    private floorSidenavService: FloorSidenavService) {
  }

  ngOnInit() {
    this.floor = this.getFloor();
    this.route.data.subscribe(res => {
      this.roomDetails = res.roomDetailsResolver.body.response;
      this.roomService.roomDetails = this.roomDetails;
      this.sendData();
    });
  }

  getFloor(){
    let floorNum = +this.route.parent.snapshot.url.toString().split(',')[1];
    return floors[floorNum+1];
  }

  sendData(){
    this.roomSidenavService.sendData(this.roomDetails);
    this.floor.parts.subscribe(floorParts => {
      let onlyRoomNumbers = floorParts.map(room => room.RoomNumber);
      let onlyRoomNumbersWithoutNulls = onlyRoomNumbers.filter(room => room);
      this.floorSidenavService.sendData(onlyRoomNumbersWithoutNulls.reverse());
    })
  }

  ngOnDestroy(){
    // clear message
    this.roomSidenavService.clearData();
  }

  clearData(){
    // clear message
    this.roomSidenavService.clearData();
    this.floorSidenavService.clearData();
  }

}


