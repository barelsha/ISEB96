import { TestBed, inject } from '@angular/core/testing';

import { FloorService } from './floor.service';

describe('FloorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FloorService]
    });
  });

  it('should be created', inject([FloorService], (service: FloorService) => {
    expect(service).toBeTruthy();
  }));
});
