import { Component, OnInit } from '@angular/core';

import { FloorService } from '../../services/floor/floor.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {floors} from '../../../assets/floors/floors';

@Component({
  selector: 'app-floor',
  providers: [ FloorService ],
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
  position = 'below';
  color:string = 'room';
  floor: any;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setFloor();
  }

  changeStyle($event, text){
    this.color = $event.type == 'mouseover' && text.length > 0 ? 'room' : 'space';
  }

  setFloor(){
    let floorNum = +this.route.parent.snapshot.url.toString().split(',')[1];
    console.log(floorNum+1);
    this.floor = floors[floorNum+1];
  }
    


  
  tiles = [
    {"text": "18", "cols": 2, "rows": 1, "color": "lightblue"},
        {"text": "17", "cols": 1, "rows": 1, "color": "lightblue"},
        {"text": "16", "cols": 1, "rows": 1, "color": "lightblue"},
        {"text": "14", "cols": 1, "rows": 1, "color": "lightblue"},
        {"text": "13", "cols": 1, "rows": 1, "color": "lightblue"},
        {"text": "12", "cols": 1, "rows": 1, "color": "lightblue"},
        {"text": "11", "cols": 1, "rows": 1, "color": "lightblue"},
        {"text": "10", "cols": 1, "rows": 1, "color": "lightblue"},
        {"text": "9", "cols": 1, "rows": 1, "color": "lightblue"},
        {"text": "8", "cols": 1, "rows": 1, "color": "lightblue"},
        {"text": "7", "cols": 1, "rows": 1, "color": "lightblue"},
        {"text": "6", "cols": 1, "rows": 2, "color": "lightblue"}
  ];

  tiles2 = [
    {text: '3', cols: 2, rows: 4, color: 'lightblue'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'}
  ];

  tiles3 = [
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '5', cols: 2, rows: 2, color: 'lightblue'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '', cols: 1, rows: 1, color: 'rgba(250,250,250)'},
    {text: '1', cols: 3, rows: 3, color: 'lightblue'}
  ];
  
}
