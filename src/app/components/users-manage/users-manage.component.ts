import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UsersManageSidenavService } from '../../services/users-manage-sidenav/users-manage-sidenav.service';
import { UsersManageService, User } from '../../services/users-manage/users-manage.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EditUsernameComponent } from '../dialogs/edit-username/edit-username.component';
import { RemoveUsernameComponent } from '../dialogs/remove-username/remove-username.component';

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit {
  displayedColumns: string[] = ['username', 'id', 'permissions', 'actions'];
  dataSource:  MatTableDataSource<User>;
  url: string;
  error: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersManageSidenavService: UsersManageSidenavService,
    private usersService: UsersManageService,
    public dialog: MatDialog) { 
      this.dataSource = new MatTableDataSource([]);
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getUsers();
  }
  
  ngOnInit() {
    this.url = "users/getUsers";
  }

  getUsers() {
    this.usersService.getUsers(this.url).subscribe(resp => {
      console.log(resp.body.response);
      this.dataSource.data = resp.body.response;
      this.dataSource.sort = this.sort;

    }, error => {
      this.error = error
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDeleteUserDialog(row){
    let dialogRef = this.dialog.open(RemoveUsernameComponent, {
      width: '500px',
      data: row
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res && res.resp == "ok" && res.deletedUser){
        let data = this.dataSource.data.filter((member => (
          (member.Username !== res.deletedUser.Username)
        )));
        this.dataSource.data = data;
      }
      else{
      }
    });
  }

  openEditUserDialog(row){
    let dialogRef = this.dialog.open(EditUsernameComponent, {
      width: '500px',
      data: row
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res && res.resp === "ok" && res.editedMember){
        let data = this.dataSource.data.map(member => {
          return member.Username === res.oldUser.Username ? res.editedMember : member;
        });
        this.dataSource.data = data;
      }
      else{
      }
    });
  }

  openAddUserDialog(){
    console.log('test');
  }

  sendData() {
    this.usersManageSidenavService.sendData();
  }

  ngOnDestroy() {
    this.usersManageSidenavService.clearData();
  }

  clearData() {
    this.usersManageSidenavService.clearData();
  }
}


