import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorComponent } from '../../components/floor/floor.component';
import { AppComponent } from '../../app.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { RoomComponent } from '../../components/room/room.component';
import { MemberComponent } from '../../components/member/member.component';
import { EquipmentComponent } from '../../components/equipment/equipment.component';
import { RoomDetailsResolver } from '../../services/room/room.service';
import { ScheduleComponent } from '../../components/schedule/schedule.component';
import { HomeComponent } from '../../components/home/home.component';
import { LoginComponent } from '../../components/login/login.component';
import { LoginGuardService } from '../../services/login-guard/login-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent,
    canActivate: [LoginGuardService],
    children: [
      { path: 'floors/:floorid', component: SidenavComponent,
        children: [
          {
            path: 'rooms/:roomid',
            component: RoomComponent,
            resolve: {
              roomDetailsResolver: RoomDetailsResolver
            },
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
                path: 'schedule', 
                component: ScheduleComponent
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
      { path: '', redirectTo:'floors/0', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { enableTracing: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
