import { Component, OnInit } from '@angular/core';

import { FloorService } from '../../services/floor/floor.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-floor',
  providers: [ FloorService ],
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
  position = 'below';
  color:string = 'room';
  currentRoute: string;

  constructor(
      private route: ActivatedRoute,
      private location: Location
    ) {
  }

  ngOnInit() {
    //console.log(this.route);
    this.currentRoute = "/" + this.route.snapshot.url.toString().split(',')[0] + "/" + this.route.snapshot.url.toString().split(',')[1];
  }

  changeStyle($event, text){
    this.color = $event.type == 'mouseover' && text.length > 0 ? 'room' : 'space';
  }

  tiles = [
    {text: '18', cols: 2, rows: 1, color: 'lightblue'},
    {text: '17', cols: 1, rows: 1, color: 'lightblue'},
    {text: '16', cols: 1, rows: 1, color: 'lightblue'},
    {text: '14', cols: 1, rows: 1, color: 'lightblue'},
    {text: '13', cols: 1, rows: 1, color: 'lightblue'},
    {text: '12', cols: 1, rows: 1, color: 'lightblue'},
    {text: '11', cols: 1, rows: 1, color: 'lightblue'},
    {text: '10', cols: 1, rows: 1, color: 'lightblue'},
    {text: '9', cols: 1, rows: 1, color: 'lightblue'},
    {text: '8', cols: 1, rows: 1, color: 'lightblue'},
    {text: '7', cols: 1, rows: 1, color: 'lightblue'},
    {text: '6', cols: 1, rows: 2, color: 'lightblue'}
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
