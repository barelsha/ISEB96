import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FloorService, FloorPeopleDetails, FloorEquipmentDetails, Response } from '../../services/floor/floor.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { floors } from '../../../assets/floors/floors';
import { HttpResponse } from '@angular/common/http';
import { Observer, Subscription } from 'rxjs';
import { Observable } from 'rxjs/observable';
import { share } from 'rxjs/operator/share';
import { RoomSidenavService } from './../../services/room-sidenav/room-sidenav.service';

@Component({
  selector: 'app-floor',
  providers: [ FloorService ],
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit, OnDestroy {
  position = 'below';
  color:string = 'room';
  tileColor: Observable<string>;
  floor: any;
  floorDetails: any;
  floorPeopleObservable: Observable<HttpResponse<Response<FloorPeopleDetails>>>;
  floorEquipmentObservable: Observable<HttpResponse<Response<FloorEquipmentDetails>>>;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private floorService: FloorService
  ) {}

  ngOnInit() {
    let url = this.getUrl(this.route);
    this.floor = this.getFloor();
    this.floorPeopleObservable = this.floorService.getPeopleFloorDetails(url);
    this.floorEquipmentObservable = this.floorService.getEquipmentFloorDetails(url + '/equipment');
    this.floorPeopleObservable.subscribe(x => {
      let y = this.setNewFloorDetails(x.body.response, this.floor.parts);
      this.floor.parts = y;
      console.log(this.floor.parts);
    });
    
  }

  

  changeStyle($event, roomNum){
    this.color = $event.type == 'mouseover' && roomNum != null ? 'room' : 'space';
  }

  getFloor(){
    let floorNum = +this.route.parent.snapshot.url.toString().split(',')[1];
    return floors[floorNum+1];
  }

  getUrl(route) : string{
    return "floors/" + this.route.parent.snapshot.url.toString().split(',')[1];
  }

  setNewFloorDetails(floorHttp, floorTs : Observable<any>){
    let copyOfFloor = floorTs;
    this.sub = floorTs.subscribe(rooms => 
    rooms.forEach(room => {
      if(room.RoomNumber !== null){
        let roomTepm = floorHttp.filter(y => y.RoomNumber === room.RoomNumber);
        let isRoomFull = +roomTepm[0].MaxOccupancy <= roomTepm.length && roomTepm[0].Email !== null;
        let color = isRoomFull ? "rgb(229, 153, 147)" : room.RoomNumber === null ? "rgba(250,250,250)" : "#69F0AE";
        room.color = new Observable((obs) => { obs.next(color) });
        room.tooltip = roomTepm[0].RoomName;
      }
    }));
    return floorTs;
  }

  ngOnDestroy(){
    if(this.sub !== undefined)
      this.sub.unsubscribe();
  }


}
