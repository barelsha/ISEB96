import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUsernameComponent } from './remove-username.component';

describe('RemoveUsernameComponent', () => {
  let component: RemoveUsernameComponent;
  let fixture: ComponentFixture<RemoveUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
