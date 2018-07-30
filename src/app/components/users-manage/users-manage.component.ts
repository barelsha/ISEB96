import { Component, OnInit } from '@angular/core';
import { UsersManageSidenavService } from '../../services/users-manage-sidenav/users-manage-sidenav.service';
import { UsersManageService, Users } from '../../services/users-manage/users-manage.service';

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit {
  url: string;
  users: Users[];
  error: any;


  constructor(private usersManageSidenavService: UsersManageSidenavService) { }
  private usersService: UsersManageService
  ngOnInit() {
    this.url = "users/getUsers";
    this.getUsers();
  }

  sendData() {
    this.usersManageSidenavService.sendData();
  }

  ngOnDestroy() {
    // clear message
    this.usersManageSidenavService.clearData();
  }

  clearData() {
    // clear message
    this.usersManageSidenavService.clearData();
  }





  getUsers() {
    this.usersService.getUsers(this.url).subscribe(resp => {
      this.users = resp.body.response;

    }, error => {
      this.error = error
    })

  }

  // private isEquipmentRoomArray(response: any): boolean{
  //   let isArray = response instanceof Array;
  //   if(isArray){
  //     let isAllEquipmentRoom =  (<EquipmentRoom[]>response).every(x=>
  //       x.EquipName !== undefined
  //       && x.Inventor !== undefined
  //       && x.RoomNum !== undefined
  //       && x.Status !== undefined
  //       && x.Warranty !== undefined
  //     );
  //     return isAllEquipmentRoom;
  //   }
  //   return false;
  // }
  // getEquipmentInRoom() {
  //   this.roomService.getEquipmenteInRoom(this.url + "/equipment")
  //   .subscribe(resp => {
  //       this.equipmentInRoom = this.isEquipmentRoomArray(resp.body.response) ? resp.body.response : [];
  //       this.loading = false;
  //     }, error => {
  //       this.error = error;
  //     }, ()=> {/*complete*/});
  // }
}



