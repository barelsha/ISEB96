import { Component, OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FloorService, FloorPeopleDBData, FloorEquipmentDBData, Response } from '../../services/floor/floor.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { floors } from '../../../assets/floors/floors';
import { HttpResponse } from '@angular/common/http';
import { Observer, Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { share } from 'rxjs/operator/share';
import { RoomSidenavService } from './../../services/room-sidenav/room-sidenav.service';

@Component({
  selector: 'app-floor',
  providers: [ FloorService ],
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit, OnDestroy {
  test = true;
  position = 'below';
  color:string = 'room';
  tileColor: Observable<string>;
  floor: any;
  floorDetails: any;
  floorPeopleObservable: Observable<HttpResponse<Response<FloorPeopleDBData>>>;
  floorEquipmentObservable: Observable<HttpResponse<Response<FloorEquipmentDBData>>>;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private floorService: FloorService
  ) {}

  ngOnInit() {
    let url = this.getUrl(this.route);
    this.floor = this.getFloor();
    this.floorPeopleObservable = this.floorService.getPeopleFloorDetails(url);
    console.log(url + '/equipment');
    this.floorEquipmentObservable = this.floorService.getEquipmentFloorDetails(url + '/equipment');
    this.floorPeopleObservable.subscribe(x => {
      let newFloorPeopleDetails = this.setNewFloorPeopleDetails(x.body.response, this.floor.parts);
      this.floor.parts = newFloorPeopleDetails;
    });
    this.floorEquipmentObservable.subscribe(x => {
      console.log(x.body.response);
      let newFloorEquipmentDetails = this.setNewFloorEquipmentDetails(x.body.response, this.floor.parts);
      this.floor.parts = newFloorEquipmentDetails;
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

  setNewFloorPeopleDetails(floorDBData: FloorPeopleDBData[], floorTs : Observable<Room[]>){
    let floorDB = Array.isArray(floorDBData) ? floorDBData : [];
    this.sub = floorTs.subscribe((rooms: Room[]) =>
      rooms.forEach(room => {
        room.color = getRoomColor(room, floorDB);
        room.tooltip = getRoomTooltip(room, floorDB);
      }
    ));
    return floorTs;
  }

  setNewFloorEquipmentDetails(floorDBData: FloorEquipmentDBData[], floorTs : Observable<Room[]>){
    let floorDB = Array.isArray(floorDBData) ? floorDBData : [];
    this.sub = floorTs.subscribe((rooms: Room[]) =>
      rooms.forEach(room => {
        room.faultyEquip = getFaultyEquip(room, floorDB);
      }
    ));
    return floorTs;
  }
 

  ngOnDestroy(){
    if(this.sub !== undefined)
      this.sub.unsubscribe();
  }


}

/**
 * 
 * example to an element in floorHttp response
 * 
 * Cols: null
 * Email: "barel@gmail.com"
 * FirstName: "shahar"
 * FloorNum: 0
 * FloorNumber: 0
 * LastName: "barel"
 * MaxOccupancy: 3
 * RoomName: "מנהלת רשת"
 * RoomNum: 18
 * RoomNumber: 18
 * RoomType: "regular"
 * Rows: null
 * Supervisor: "no"
 * Tel: null
 * 
 */


export function getRoomColor(room: Room, floorDBData: FloorPeopleDBData[]) : Observable<string>{
  if(tileIsDefinedAndIsIndeedARoom(room)){
    // arrayOfPeopleInRoom, the array size is as the number of people in the room,
    // except for the case when there is nobody, because is a left join with Rooms table it will return the room with nulls
    // in each field.
    let arrayOfPeopleInRoom = floorDBData.filter(roomFromDB => roomFromDB.RoomNumber === room.RoomNumber);
    if(arrayIsEmpty(arrayOfPeopleInRoom)){
      return Observable.of(TileColor.Empty);
    }
    else if(thereArePeopleInTheRoom(arrayOfPeopleInRoom)){
      return isRoomFull(arrayOfPeopleInRoom) ? Observable.of(TileColor.Full) : Observable.of(TileColor.Partial);
    }
    else{
      return Observable.of(TileColor.Empty);
    }
  }
  else{
    return Observable.of(TileColor.Space);
  }
}

export function getFaultyEquip (room: Room, floorDBData: FloorEquipmentDBData[]) : Observable<FloorEquipmentDBData[]>{
  if(tileIsDefinedAndIsIndeedARoom(room)){
    let arrayOfEquipmentInRoom = floorDBData.filter(roomFromDB => roomFromDB.RoomNum === room.RoomNumber);
    if(arrayIsEmpty(arrayOfEquipmentInRoom)){
      return Observable.of([]);
    }
    else if(thereIsEquipmentInTheRoom(arrayOfEquipmentInRoom)){
      let faultyEquipment = arrayOfEquipmentInRoom.filter(equip => equip.Status !== EquipStatus.Proper);
      return Observable.of(faultyEquipment);
    }
    else{
      return null;
    }
  }
  else{
    return null;
  }
}

export function thereIsEquipmentInTheRoom (arrayOfEquipmentInRoom: FloorEquipmentDBData[]) : Boolean{
  let defined = arrayOfEquipmentInRoom ? true : false;
  let equipmentDefinedInTheRoom = arrayOfEquipmentInRoom[0].Inventor !== null ? true : false;
  return defined && equipmentDefinedInTheRoom;
}


export function getRoomTooltip(room: Room, floorDBData: FloorPeopleDBData[]) : string{
  if(tileIsDefinedAndIsIndeedARoom(room)){
    let arrayOfPeopleInRoom = floorDBData.filter(roomFromDB => roomFromDB.RoomNumber === room.RoomNumber);
    if(arrayIsEmpty(arrayOfPeopleInRoom)){
      return "not in DB";
    }
    else{
      return arrayOfPeopleInRoom[0].RoomName;
    }
  }
  else{
    return null;
  }
}

export function tileIsDefinedAndIsIndeedARoom(room: Room) : Boolean{
  let defined = room ? true : false;
  let isARoomAndNotSpaceBetween = room.RoomNumber ? true : false; // if its a space between roome then RoomNumber is null, defined in assets/floors (RoomNumber)
  return defined && isARoomAndNotSpaceBetween;
}

export function thereArePeopleInTheRoom(arrayOfPeopleInRoom: FloorPeopleDBData[]) : Boolean{
  let defined = arrayOfPeopleInRoom ? true : false;
  let peopleDefinedInTheRoom = arrayOfPeopleInRoom[0].Email !== null ? true : false; // at least one person is in the room
  return defined && peopleDefinedInTheRoom;
}

export function arrayIsEmpty(arrayOfPeopleInRoom: FloorPeopleDBData[] | FloorEquipmentDBData[]) : Boolean{
  let defined = arrayOfPeopleInRoom ? true : false;
  let forSomeReasonItsEmpty = arrayOfPeopleInRoom.length === 0 ? true : false;
  return defined && forSomeReasonItsEmpty;
}

export function isRoomFull(arrayOfPeopleInRoom: FloorPeopleDBData[]) : Boolean {
  let room = arrayOfPeopleInRoom[0]; // get the room, also index 1 if length of the array greater than 1.
  let maxOccupancyInRoom = room.MaxOccupancy;
  let numberOfPeopleInRoom = arrayOfPeopleInRoom.length;
  let randomPersonEmail = room.Email;
  return (maxOccupancyInRoom <= numberOfPeopleInRoom) && (randomPersonEmail !== null);
}


export const enum TileColor {
  Empty = "rgba(224, 229, 227)",
  Full = "rgba(229, 153, 147)",
  Partial = "rgba(105, 240, 174)",
  Space = "rgba(250,250,250)"
}

export const enum EquipStatus {
  Faulty = '2',
  Proper = '1'
}

export interface Room {
  RoomNumber: number, 
  Cols: number, 
  Rows: number, 
  color: Observable<string>,
  tooltip: string,
  faultyEquip: Observable<FloorEquipmentDBData[]>
}