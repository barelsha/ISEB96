import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UsersManageSidenavService } from '../../services/users-manage-sidenav/users-manage-sidenav.service';
import { PeopleSearchService, people } from '../../services/people-search/people-search.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-people-search',
  templateUrl: './people-search.component.html',
  styleUrls: ['./people-search.component.css']
})
export class PeopleSearchComponent implements OnInit {
  displayedColumns: string[] = ['floor', 'room', 'firstName', 'lastName','email'];
  dataSource:  MatTableDataSource<people>;
  url: string;
  error: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersManageSidenavService: UsersManageSidenavService,
    private peopleSearch: PeopleSearchService,
    public dialog: MatDialog) { 
      this.dataSource = new MatTableDataSource([]);
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getEquip();
  
    }
  ngOnInit() {
    this.url = "/peopleInBuild";
  }

  getEquip() {
    this.peopleSearch.getPeople(this.url).subscribe(resp => {
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
