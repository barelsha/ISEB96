import './polyfills'
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialsModule } from './modules/materials.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { FloorComponent } from './components/floor/floor.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FloorService } from './services/floor/floor.service';
import { AppRoutingModule } from './modules/routing/app-routing.module';
import { RoomComponent } from './components/room/room.component';
import { RoomRoutingModule } from './modules/routing/room-routing.module';
import { ConfigComponent } from './components/config/config.component';
import { HttpModule } from '@angular/http';
import { RoomService, RoomDetailsResolver } from './services/room/room.service';
import { MemberComponent } from './components/member/member.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { AddEquipmentComponent } from './components/dialogs/add-equipment/add-equipment.component';
import { RemoveEquipmentComponent } from './components/dialogs/remove-equipment/remove-equipment.component';
import { EditEquipmentComponent } from './components/dialogs/edit-equipment/edit-equipment.component';
import { AddMemberComponent } from './components/dialogs/add-member/add-member.component';
import { RemoveMemberComponent } from './components/dialogs/remove-member/remove-member.component';
import { EditMemberComponent } from './components/dialogs/edit-member/edit-member.component';
import { StatusDirective } from './directives/status.directive';
import { RoomSidenavService } from './services/room-sidenav/room-sidenav.service';
import { LoginService } from './services/login/login.service';
import { LoginComponent } from './components/login/login.component';
import {Ng2Webstorage} from 'ngx-webstorage';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import { ScheduleService } from './services/schedule/schedule.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FloorComponent,
    SidenavComponent,
    RoomComponent,
    ConfigComponent,
    MemberComponent,
    EquipmentComponent,
    AddEquipmentComponent,
    RemoveEquipmentComponent,
    EditEquipmentComponent,
    AddMemberComponent,
    RemoveMemberComponent,
    EditMemberComponent,
    StatusDirective,
    LoginComponent,
    ScheduleComponent
  ],
  exports: [ ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    Ng2Webstorage,
    FullCalendarModule
  ],
  entryComponents: [
    AddEquipmentComponent,
    RemoveEquipmentComponent,
    EditEquipmentComponent,
    AddMemberComponent,
    RemoveMemberComponent,
    EditMemberComponent
  ],
  providers: [
    FloorService,
    RoomService,
    RoomSidenavService,
    RoomDetailsResolver,
    LoginService,
    ScheduleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
 }
