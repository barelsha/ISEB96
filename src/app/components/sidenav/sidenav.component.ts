import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router /*ParamMap*/ } from '@angular/router';
//import 'rxjs/add/operator/switchMap';
//import { NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { RoomSidenavService } from './../../services/room-sidenav/room-sidenav.service';
import { FloorSidenavService } from './../../services/floor-sidenav/floor-sidenav.service';
import { RoomDetails } from '../../services/room/room.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

  mobileQuery: MediaQueryList;
  floor: number;
  currentRoute: string;
  shouldRun = true;
  roomDetails: Observable<RoomDetails>;
  subscription: Subscription;
  roomNumbers: Observable<number[]>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private roomSidenavService: RoomSidenavService,
    private floorSidenavService: FloorSidenavService
  ) 
    
    {
    this.roomDetails = this.roomSidenavService.getData();
    
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    this.currentRoute = "/" + this.route.snapshot.url.toString().split(',')[0] + "/"
    + this.route.snapshot.url.toString().split(',')[1];
    this.getFloor();
    this.roomNumbers = this.floorSidenavService.getData();
    
  }

  ngAfterViewInit(){
    
  }

  ngAfterViewChecked(){
    this.changeDetectorRef.detectChanges();
    
  }

  
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    //this.subscription.unsubscribe();
  }

  fillerNav = Array(19).fill(0).map((_, i) => `${i + 1}`);
  private _mobileQueryListener: () => void;
  
  getFloor(): void {
    this.floor = +this.route.snapshot.paramMap.get('floorid');
  }
}
