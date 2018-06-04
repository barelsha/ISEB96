import { TestBed, inject } from '@angular/core/testing';

import { RoomSidenavService } from './room-sidenav.service';

describe('RoomSidenavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomSidenavService]
    });
  });

  it('should be created', inject([RoomSidenavService], (service: RoomSidenavService) => {
    expect(service).toBeTruthy();
  }));
});
