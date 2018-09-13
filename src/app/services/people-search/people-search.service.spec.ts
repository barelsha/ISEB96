import { TestBed, inject } from '@angular/core/testing';

import { PeopleSearchService } from './people-search.service';

describe('PeopleSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleSearchService]
    });
  });

  it('should be created', inject([PeopleSearchService], (service: PeopleSearchService) => {
    expect(service).toBeTruthy();
  }));
});
