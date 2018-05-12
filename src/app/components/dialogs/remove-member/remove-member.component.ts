import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RoomService, Member } from '../../../services/room/room.service';

@Component({
  selector: 'app-remove-member',
  templateUrl: './remove-member.component.html',
  styleUrls: ['./remove-member.component.css']
})
export class RemoveMemberComponent implements OnInit {

  member: Member;
  url: string;

  constructor(
    private roomService: RoomService,
    public dialogRef: MatDialogRef<RemoveMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.member = data.member;
      this.url = data.url;
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.roomService.deleteMember(this.url + '/deletePerson', {FirstName: this.member.FirstName, LastName: this.member.LastName})
    .subscribe(resp => {
      this.dialogRef.close({resp:resp.status, deletedMember: {FirstName: this.member.FirstName, LastName: this.member.LastName}});
    });
  }

}
