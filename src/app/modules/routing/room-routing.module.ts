import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from '../../components/room/room.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { FloorComponent } from '../../components/floor/floor.component';

const routes: Routes = [
  {
    path: 'aaaaaaaaaa',
    component: SidenavComponent,
    
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RoomRoutingModule { }
