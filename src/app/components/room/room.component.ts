import { Component, OnInit } from '@angular/core';
import {RoomService, PeopleRoom, RoomDetails } from '../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomDetails: RoomDetails;

  constructor(private roomService: RoomService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(res => {
      this.roomDetails = res.roomDetailsResolver.body.response;
      this.roomService.roomDetails = this.roomDetails;
    })
  }

}


