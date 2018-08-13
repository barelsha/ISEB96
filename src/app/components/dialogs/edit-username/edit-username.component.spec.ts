import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsernameComponent } from './edit-username.component';

describe('EditUsernameComponent', () => {
  let component: EditUsernameComponent;
  let fixture: ComponentFixture<EditUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
