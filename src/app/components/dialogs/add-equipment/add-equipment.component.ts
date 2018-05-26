import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RoomService, Member, Equipment } from '../../../services/room/room.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})
export class AddEquipmentComponent implements OnInit {
  addEquipmentForm: FormGroup;
  equip: Equipment;
  url: string;

  constructor(
    public dialogRef: MatDialogRef<AddEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private fb: FormBuilder,
    private roomService: RoomService) {
      this.url = data;
  }

  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.addEquipmentForm = this.fb.group({
      equipName: ['', Validators.required],
      inventor: ['', Validators.required],
      status: ['1', [Validators.required]],
      warranty: ['', []]
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    this.equip = this.prepareAddEquipment();

    this.roomService.addEquipment(this.url + '/addEquipment', this.equip)
    .subscribe(resp => {
      this.dialogRef.close({resp: resp, newEquip: this.equip});
    }, err =>{
    });
  }

  prepareAddEquipment(): Equipment {
    let formModel = this.addEquipmentForm.value;
    let saveEquip: Equipment = {
      EquipName: formModel.equipName,
      Inventor: formModel.inventor,
      Status: formModel.status,
      Warranty: moment(formModel.warranty).format('L'),
      Description: formModel.description
    };
    return saveEquip;
  }

  getEquipNameErrorMessage(){
    return this.addEquipmentForm.controls.equipName.hasError('required') ? 'הנך חייב להזין את שם הפריט' : '';
  }

  getInventorErrorMessage(){
    return this.addEquipmentForm.controls.inventor.hasError('required') ? 'הנך חייב להזין אינוונטר' : '';
  }

  getStatusErrorMessage(){
    return this.addEquipmentForm.controls.status.hasError('required') ? 'הנך חייב להזין סטטוס' : '';
  }

  checkFormStatus(){
    return this.addEquipmentForm.status === "INVALID";
  }

  statusChanged(){
    if(this.addEquipmentForm.controls.status.value === '2'){
      this.addEquipmentForm.addControl('description', new FormControl('', [Validators.required]));
    }
    else{
      this.addEquipmentForm.removeControl('description');
    }
  }
  

}
