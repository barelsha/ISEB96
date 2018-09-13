import { TestBed, inject } from '@angular/core/testing';

import { RoomManageService } from './room-manage.service';

describe('RoomManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomManageService]
    });
  });

  it('should be created', inject([RoomManageService], (service: RoomManageService) => {
    expect(service).toBeTruthy();
  }));
});
