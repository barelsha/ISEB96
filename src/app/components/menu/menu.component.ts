import { Component, OnInit } from '@angular/core';
import { LoginService, User } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  selectedAction:string;
  loggedInUser: User;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loggedInUser = this.loginService.loggedInUser;
  }

  exit(){
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  users(){

  }

  equ(){}

}
