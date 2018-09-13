import { TestBed, inject } from '@angular/core/testing';

import { EquipSearchService } from './equip-search.service';

describe('EquipSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipSearchService]
    });
  });

  it('should be created', inject([EquipSearchService], (service: EquipSearchService) => {
    expect(service).toBeTruthy();
  }));
});
