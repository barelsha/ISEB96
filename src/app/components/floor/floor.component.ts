import { Component, OnInit, AfterViewInit } from '@angular/core';

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
export class FloorComponent implements OnInit, AfterViewInit {
  position = 'below';
  color:string = 'room';
  floor: any;

  constructor(
    private route: ActivatedRoute,
    private floorService: FloorService
  ) {}

  ngOnInit() {
    this.setFloor();
  }

  ngAfterViewInit(){
    let url = this.getUrl(this.route);
    this.floorService.getFloorDetails(url).subscribe(x => {
      console.log(x);
    })
  }

  changeStyle($event, text){
    this.color = $event.type == 'mouseover' && text.length > 0 ? 'room' : 'space';
  }

  setFloor(){
    let floorNum = +this.route.parent.snapshot.url.toString().split(',')[1];
    this.floor = floors[floorNum+1];
  }

  getUrl(route) : string{
    return "floors/" + this.route.parent.snapshot.url.toString().split(',')[1];
  }
    

  
}
