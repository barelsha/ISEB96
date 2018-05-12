import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router /*ParamMap*/ } from '@angular/router';
//import 'rxjs/add/operator/switchMap';
//import { NavigationStart } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  floor: number;
  currentRoute: string;
  shouldRun = true;

  ngOnInit() {
    this.currentRoute = "/" + this.route.snapshot.url.toString().split(',')[0] + "/" + this.route.snapshot.url.toString().split(',')[1];
    this.getFloor();
  }

  constructor(
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) 
    
    {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  fillerNav = Array(19).fill(0).map((_, i) => `${i + 1}`);
  private _mobileQueryListener: () => void;
  
  getFloor(): void {
    this.floor = +this.route.snapshot.paramMap.get('floorid');
  }

}
