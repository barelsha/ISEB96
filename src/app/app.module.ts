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
import { RoomService } from './services/room/room.service';
import { MemberComponent } from './components/member/member.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { AddEquipmentComponent } from './components/dialogs/add-equipment/add-equipment.component';
import { RemoveEquipmentComponent } from './components/dialogs/remove-equipment/remove-equipment.component';
import { EditEquipmentComponent } from './components/dialogs/edit-equipment/edit-equipment.component';

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
    EditEquipmentComponent
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
    RoomRoutingModule,
    AppRoutingModule
  ],
  entryComponents: [
    AddEquipmentComponent
  ],
  providers: [
    FloorService,
    RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
 }
