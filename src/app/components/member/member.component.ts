import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{ AddMemberComponent } from '../dialogs/add-member/add-member.component';
import{ RemoveMemberComponent } from '../dialogs/remove-member/remove-member.component';
import{ EditMemberComponent } from '../dialogs/edit-member/edit-member.component';
import {RoomService, PeopleRoom} from '../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  details: PeopleRoom;
  configUrl: string;
  headers: any;
  error: any;
  loading: boolean;

  constructor(public dialog: MatDialog, private roomService:RoomService, private route: ActivatedRoute) {
    this.configUrl = this.route.parent.parent.snapshot.url.toString().split(',')[0] + "/" + this.route.parent.parent.snapshot.url.toString().split(',')[1] + "/"
        + this.route.parent.snapshot.url.toString().split(',')[0] + "/" + this.route.parent.snapshot.url.toString().split(',')[1];
      console.log(this.configUrl);
      this.loading = true;
  }

  ngOnInit() {
    this.getRoomDetails();
  }

  getRoomDetails() {
    this.roomService.getPeopleInRoom(this.configUrl)
      // resp is of type `HttpResponse<PeopleRoom>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
        this.details = resp.body;
        this.loading = false;
        console.log(this.details);  
        // access the body directly, which is typed as `PeopleRoom`.
      }, error => this.error = error /*error path*/);
  }

  openAddMemberDialog(): void {
    let dialogRef = this.dialog.open(AddMemberComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
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

}
