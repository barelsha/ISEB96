import { TestBed, inject } from '@angular/core/testing';

import { UsersManageService } from './users-manage.service';

describe('UsersManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersManageService]
    });
  });

  it('should be created', inject([UsersManageService], (service: UsersManageService) => {
    expect(service).toBeTruthy();
  }));
});
