import { TestBed, inject } from '@angular/core/testing';

import { UsersManageSidenavService } from './users-manage-sidenav.service';

describe('UsersManageSidenavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersManageSidenavService]
    });
  });

  it('should be created', inject([UsersManageSidenavService], (service: UsersManageSidenavService) => {
    expect(service).toBeTruthy();
  }));
});
