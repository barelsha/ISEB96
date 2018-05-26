import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Equipment, RoomService } from '../../../services/room/room.service';

@Component({
  selector: 'app-remove-equipment',
  templateUrl: './remove-equipment.component.html',
  styleUrls: ['./remove-equipment.component.css']
})
export class RemoveEquipmentComponent implements OnInit {

  equip: Equipment;
  url: string;

  constructor(
    private roomService: RoomService,
    public dialogRef: MatDialogRef<RemoveEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.equip = data.equip;
      this.url = data.url;
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.roomService.deleteEquipment(this.url + '/deleteEquiInRoom/' + this.equip.Inventor, 
      {
        EquipName: this.equip.EquipName, 
        Inventor: this.equip.Inventor,
        Status: this.equip.Status,
        Warranty:  this.equip.Warranty,
        Description: this.equip.Description
      })
    .subscribe(resp => {
      this.dialogRef
      .close(
        {
          resp:resp.status, 
          deletedEquip: 
          {
            EquipName: this.equip.EquipName, 
            Inventor: this.equip.Inventor,
            Status: this.equip.Status,
            Warranty: this.equip.Warranty
          }});
    });
  }
  

}
