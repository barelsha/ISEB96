import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FloorComponent } from '../../components/floor/floor.component';
import { AppComponent } from '../../app.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { RoomComponent } from '../../components/room/room.component';

const routes: Routes = [
  { path: 'floors/:id', component: SidenavComponent,
    children: [
      {
        path: 'rooms/:id',
        component: RoomComponent
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
