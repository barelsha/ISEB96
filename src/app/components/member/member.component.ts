import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{ AddMemberComponent } from '../dialogs/add-member/add-member.component';
import{ RemoveMemberComponent } from '../dialogs/remove-member/remove-member.component';
import{ EditMemberComponent } from '../dialogs/edit-member/edit-member.component';
import { RoomService, PeopleRoom } from '../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  room: number;
  floor: number;
  details: any;
  url: string;
  headers: any;
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
    this.getPeopleInRoom();
  }

  getPeopleInRoom() {
    this.roomService.getPeopleInRoom(this.url)
    .subscribe(resp => {
        this.details = resp.body.response;
        this.loading = false; 
      }, error => this.error = error);
  }

  openAddMemberDialog(): void {
    let dialogRef = this.dialog.open(AddMemberComponent, {
      width: '500px',
      data: this.url
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log(this.details);
      this.details.push({
        FloorNum: this.floor,
        RoomNum: this.room,
        FirstName: result.FirstName,
        LastName: result.LastName,
        Supervisor: result.Supervisor,
        Email: result.Email
      });
      console.log('The dialog was closed');
    });
  }

  openRemoveMemberDialog(member): void {
    let dialogRef = this.dialog.open(RemoveMemberComponent, {
      width: '500px',
      data: member
    });
    dialogRef.afterClosed().subscribe(result => {
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
    this.room = +this.route.parent.snapshot.paramMap.get('floorid');
  }

}
