import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{ AddEquipmentComponent } from '../dialogs/add-equipment/add-equipment.component';
import{ RemoveEquipmentComponent } from '../dialogs/remove-equipment/remove-equipment.component';
import{ EditEquipmentComponent } from '../dialogs/edit-equipment/edit-equipment.component';
import { RoomService, EquipmentRoom, RoomDetails } from '../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';
import { isType } from '@angular/core/src/type';



@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  room: number;
  floor: number;
  equipmentInRoom: EquipmentRoom[];
  roomDetails: RoomDetails;
  url: string;
  error: any;
  loading: boolean;

  constructor(public dialog: MatDialog,
    private roomService:RoomService,
    private route: ActivatedRoute) {
    this.setUrl();
    this.setRoomAndFloor();
    this.loading = true;
  }

  ngOnInit() {
    this.setRoomDetails();
    this.getEquipmentInRoom();
  }

  getEquipmentInRoom() {
    this.roomService.getEquipmenteInRoom(this.url + "/equipment")
    .subscribe(resp => {
        this.equipmentInRoom = this.isEquipmentRoomArray(resp.body.response) ? resp.body.response : [];
        this.loading = false;
      }, error => {
        this.error = error;
      }, ()=> {/*complete*/});
  }

  openAddEquipmentDialog(): void {
    let dialogRef = this.dialog.open(AddEquipmentComponent, {
      width: '500px',
      data: this.url
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res && res.resp.body.status === "ok"){
        this.equipmentInRoom.push({
          FloorNum: this.floor,
          RoomNum: this.room,
          EquipName: res.newEquip.EquipName,
          Inventor: res.newEquip.Inventor,
          Status: res.newEquip.Status,
          Warranty: res.newEquip.Warranty,
          Description: res.newEquip.Description === undefined? null : res.newEquip.Description
        });
      }
      else{
      }
    }, err =>{
    });
  }

  openRemoveEquipmentDialog(equip): void {
    let dialogRef = this.dialog.open(RemoveEquipmentComponent, {
      width: '500px',
      data: {
        equip: equip,
        url: this.url
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res && res.resp == "ok" && res.deletedEquip){
        this.equipmentInRoom = this.equipmentInRoom.filter((equip => 
          (equip.Inventor !== res.deletedEquip.Inventor)));
      }
      else{
      }
    });
  }

  openEditEquipmentDialog(equip): void {
    let dialogRef = this.dialog.open(EditEquipmentComponent, {
      width: '500px',
      data: {
        equip: equip,
        url: this.url
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res && res.resp === "ok" && res.editedEquip){
        this.equipmentInRoom.forEach(equip =>{
          if(equip.EquipName === res.oldEquip.EquipName &&
            equip.Inventor === res.oldEquip.Inventor &&
            equip.Status === res.oldEquip.Status &&
            equip.Warranty === res.oldEquip.Warranty){
            equip.EquipName = res.editedEquip.EquipName;
            equip.Inventor = res.editedEquip.Inventor;
            equip.Status = res.editedEquip.Status;
            equip.Warranty = res.editedEquip.Warranty;
          }
        });
      }
      else{
      }
    });
  }

  setUrl(){
    this.url = this.route.parent.parent.snapshot.url.toString().split(',')[0] + "/" 
    + this.route.parent.parent.snapshot.url.toString().split(',')[1] + "/"
    + this.route.parent.snapshot.url.toString().split(',')[0] + "/" 
    + this.route.parent.snapshot.url.toString().split(',')[1];
  }

  setRoomAndFloor(){
    this.room = +this.route.parent.snapshot.paramMap.get('roomid');
    this.floor = +this.route.parent.snapshot.paramMap.get('floorid');
  }

  setRoomDetails(){
    this.route.parent.data.subscribe(
      res => { 
        this.roomDetails = res.roomDetailsResolver.body.response;
      }, 
      error => { this.error = error;},
      () => { });
  }

  private isEquipmentRoomArray(response: any): boolean{
    let isArray = response instanceof Array;
    if(isArray){
      let isAllEquipmentRoom =  (<EquipmentRoom[]>response).every(x=>
        x.EquipName !== undefined
        && x.Inventor !== undefined
        && x.RoomNum !== undefined
        && x.Status !== undefined
        && x.Warranty !== undefined
      );
      return isAllEquipmentRoom;
    }
    return false;
  }

}



