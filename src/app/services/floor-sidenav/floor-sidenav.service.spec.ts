import { TestBed, inject } from '@angular/core/testing';

import { FloorSidenavService } from './floor-sidenav.service';

describe('FloorSidenavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FloorSidenavService]
    });
  });

  it('should be created', inject([FloorSidenavService], (service: FloorSidenavService) => {
    expect(service).toBeTruthy();
  }));
});
