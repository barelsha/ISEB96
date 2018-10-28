import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RoomManageService, Room } from '../../../services/room-manage/room-manage.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { RoomManageComponent } from '../../room-manage/room-manage.component';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  editRoomForm: FormGroup;
  room: Room;

  constructor(public dialogRef: MatDialogRef<EditRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private RoomManageService: RoomManageService) {
      //should get user??
    this.room = this.data;
    //this.url = data.url;
  }
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.editRoomForm = this.fb.group({
      roomName:[this.room.RoomName,[Validators.required]],
      maxOccupancy:[this.room.MaxOccupancy,[Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    let oldRoom = this.room;

   // this.user = this.prepareAddUser(oldUser);
   this.room=this.prepareAddRoom(oldRoom);
   this.RoomManageService.putRoom('/floors/' + oldRoom.FloorNumber+'/rooms/'+oldRoom.RoomNumber+'/editRoomDetails',this.room)
     .subscribe(resp => {
       this.dialogRef.close(
         {
           resp: resp.body.status,
           editedRoom: this.room,
           oldRoom: oldRoom
         });
     });
 }

  // prepareAddUser(oldMember): User {
    prepareAddRoom(oldRoom): Room {
      let formModel = this.editRoomForm.value;
      let saveRoom: Room = {
        RoomNumber:oldRoom.RoomNumber,
        // floorNumber:formModel.floorNumber,
        FloorNumber:oldRoom.FloorNumber,
        RoomName:formModel.roomName,
        RoomType:oldRoom.RoomType,
        MaxOccupancy:formModel.maxOccupancy,
        Tel:"",


        // var telNew = req.body.Tel;
        // var roomTypeNew = req.body.RoomType;
        // var maxOccNew = req.body.MaxOccupancy;
      };
      return saveRoom;
    }

    checkFormStatus() {
      return this.editRoomForm.status === "INVALID";
    }



}
