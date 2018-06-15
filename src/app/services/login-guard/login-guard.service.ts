import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class LoginGuardService implements CanActivate {


  constructor(public login: LoginService, public router: Router) { }

  canActivate(): boolean {
    if (!this.login.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    else{
      this.login.setUser(localStorage.getItem('token'));
      return true;
    }
  }

}
