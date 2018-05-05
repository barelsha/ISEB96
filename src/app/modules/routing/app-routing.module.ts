import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorComponent } from '../../components/floor/floor.component';
import { AppComponent } from '../../app.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { RoomComponent } from '../../components/room/room.component';
import { MemberComponent } from '../../components/member/member.component';
import { EquipmentComponent } from '../../components/equipment/equipment.component';

const routes: Routes = [
  { path: 'floors/:floorid', component: SidenavComponent,
    children: [
      {
        path: 'rooms/:roomid',
        component: RoomComponent,
        children: [
          {
            path: 'members', 
            component: MemberComponent
          },
          {
            path: 'equipment', 
            component: EquipmentComponent
          },
          {
            path: '', 
            redirectTo: 'members',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '', 
        component: FloorComponent
      }
    ]
  },
  { path: '', redirectTo: '/floors/0', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
