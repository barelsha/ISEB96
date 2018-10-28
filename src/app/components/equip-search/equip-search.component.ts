import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UsersManageSidenavService } from '../../services/users-manage-sidenav/users-manage-sidenav.service';
import { EquipSearchService, Equip } from '../../services/equip-search/equip-search.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// import { EditUsernameComponent } from '../dialogs/edit-username/edit-username.component';
// import { RemoveUsernameComponent } from '../dialogs/remove-username/remove-username.component';
// import { AddUserComponent } from '../dialogs/add-username/add-user.component';

@Component({
  selector: 'app-equip-search',
  templateUrl: './equip-search.component.html',
  styleUrls: ['./equip-search.component.css']
})
export class EquipSearchComponent implements OnInit {
  displayedColumns: string[] = ['floor', 'room', 'name', 'inventor', 'status','warranty', 'description'];
  dataSource:  MatTableDataSource<Equip>;
  url: string;
  error: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersManageSidenavService: UsersManageSidenavService,
    private equipSearch: EquipSearchService,
    public dialog: MatDialog) { 
      this.dataSource = new MatTableDataSource([]);
    }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getEquip();

  }
  ngOnInit() {
    this.url = "/equipment";
  }

  getEquip() {
    this.equipSearch.getEquip(this.url).subscribe(resp => {
      this.dataSource.data = resp.body.response;
      this.dataSource.sort = this.sort;

    }, error => {
      this.error = error
    })
  }

  getStatus(status){
    return status === '1' ? 'תקין' : 'תקול';
  }

  getColor(status){
    return status === '1' ? 'lightgreen' : 'lightpink';
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
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
