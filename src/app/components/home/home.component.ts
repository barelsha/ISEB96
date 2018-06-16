import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoginService, User } from '../../services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private permissionsService: NgxPermissionsService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.setPermissions(this.loginService.loggedInUser);
  }

  setPermissions(user: User){
    let permissions: string[] = [];
    if (user.PermissionCode === 0) permissions.push("NONE");
    if (user.PermissionCode === 1) permissions.push("STUDENT");
    if (user.PermissionCode === 2) permissions.push("BUILDING_MEMBER");
    if (user.PermissionCode === 3) permissions.push("STUDENT", "BUILDING_MEMBER");
    if (user.PermissionCode === 4) permissions.push("ADMIN");
    if (user.PermissionCode === 5) permissions.push("ADMIN", "STUDENT");
    if (user.PermissionCode === 6) permissions.push("BUILDING_MEMBER", "ADMIN");
    if (user.PermissionCode === 7) permissions.push("ADMIN", "BUILDING_MEMBER", "STUDENT");
    this.permissionsService.loadPermissions(permissions);
  }
}
