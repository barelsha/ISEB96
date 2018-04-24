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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FloorComponent,
    SidenavComponent,
    RoomComponent,
    ConfigComponent
  ],
  exports: [ ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ISEB96' }),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    RoomRoutingModule,
    AppRoutingModule
  ],
  providers: [
    FloorService,
    RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
 }
