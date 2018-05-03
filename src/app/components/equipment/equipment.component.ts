import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import{ AddEquipmentComponent } from '../dialogs/add-equipment/add-equipment.component'
import{ RemoveEquipmentComponent } from '../dialogs/remove-equipment/remove-equipment.component'
import{ EditEquipmentComponent } from '../dialogs/edit-equipment/edit-equipment.component'


@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  animal: string;
  name: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openAddEquipmentDialog(): void {
    let dialogRef = this.dialog.open(AddEquipmentComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openRemoveEquipmentDialog(): void {
    let dialogRef = this.dialog.open(RemoveEquipmentComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openEditEquipmentDialog(): void {
    let dialogRef = this.dialog.open(EditEquipmentComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}


