import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UsersManageSidenavService } from '../../services/users-manage-sidenav/users-manage-sidenav.service';
import { RoomManageService, Room } from '../../services/room-manage/room-manage.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EditRoomComponent } from '../dialogs/edit-room/edit-room.component';

@Component({
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.css']
})
export class RoomManageComponent implements OnInit {

  displayedColumns: string[] = ['floorNumber', 'roomNumber', 'roomName','maxOccupancy','actions'];
  dataSource:  MatTableDataSource<Room>;
  url: string;
  error: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersManageSidenavService: UsersManageSidenavService,
    private roomService: RoomManageService,
    public dialog: MatDialog) { 
      this.dataSource = new MatTableDataSource([]);
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getRooms();
    }
  ngOnInit() {
    this.url = "/roomsBuildDetails";
  }

  getRooms() {
    this.roomService.getRooms(this.url).subscribe(resp => {
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

  openEditRoomDialog(row){
    let dialogRef = this.dialog.open(EditRoomComponent, {
      width: '500px',
      data: row
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res && res.resp === "ok" && res.editedRoom){
        let data = this.dataSource.data.map(room => {
          return room.RoomNumber === res.oldRoom.RoomNumber ? res.editedRoom : room;
        });
        this.dataSource.data = data;
      }
      else{
      }
    });
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
