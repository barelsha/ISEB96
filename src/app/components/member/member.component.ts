import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{ AddMemberComponent } from '../dialogs/add-member/add-member.component';
import{ RemoveMemberComponent } from '../dialogs/remove-member/remove-member.component';
import{ EditMemberComponent } from '../dialogs/edit-member/edit-member.component';
import { RoomService, PeopleRoom, RoomDetails } from '../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';
import { isType } from '@angular/core/src/type';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  room: number;
  floor: number;
  peopleInRoom: PeopleRoom[];
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
    this.getPeopleInRoom();
  }

  getPeopleInRoom() {
    this.roomService.getPeopleInRoom(this.url)
    .subscribe(resp => {
        console.log('next getPeopleInRoom');
        this.peopleInRoom = this.isPeopleRoomArray(resp.body.response) ? resp.body.response : [];
        this.loading = false;
      }, error => {
        this.error = error;
        console.log('error getPeopleInRoom');
      }, ()=> {console.log('complete getPeopleInRoom');});
  }

  openAddMemberDialog(): void {
    let dialogRef = this.dialog.open(AddMemberComponent, {
      width: '500px',
      data: this.url
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res && res.resp.body.status === "ok"){
        this.peopleInRoom.push({
          FloorNum: this.floor,
          RoomNum: this.room,
          FirstName: res.newMember.FirstName,
          LastName: res.newMember.LastName,
          Supervisor: res.newMember.Supervisor,
          Email: res.newMember.Email
        });
      }
      else{
      }
      console.log('The dialog was closed');
    });
  }

  openRemoveMemberDialog(member): void {
    let dialogRef = this.dialog.open(RemoveMemberComponent, {
      width: '500px',
      data: {
        member,
        url: this.url
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if(res.resp == "ok" && res.deletedMember){
        this.peopleInRoom = this.peopleInRoom.filter((person => (person.FirstName !== res.deletedMember.FirstName) &&
        (person.LastName !== res.deletedMember.LastName)));
      }
      else{
      }
      console.log('The dialog was closed');
    });
  }

  openEditMemberDialog(member): void {
    let dialogRef = this.dialog.open(EditMemberComponent, {
      width: '500px',
      data: member
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
      error => { this.error = error; console.log('error setRoomDetails')},
      () => { console.log('complete setRoomDetails')});
  }

  private isPeopleRoomArray(response: any): boolean{
    let isArray = response instanceof Array;
    if(isArray){
      let isAllPeopleRoom =  (<PeopleRoom[]>response).every(x=>
        x.FirstName !== undefined
        && x.LastName !== undefined
        && x.Email !== undefined
        && x.RoomNum !== undefined
        && x.Supervisor !== undefined
      );
      return isAllPeopleRoom;
    }
    return false;
  }

  checkIfRoomIsFull(){
    return this.loading ? true : (this.peopleInRoom.length >= +this.roomDetails.MaxOccupancy);
  }

  getToolTip(){
    return this.checkIfRoomIsFull() ? "החדר מלא, לא ניתן להוסיף עוד אנשים" : "הוסף";
  }
}
