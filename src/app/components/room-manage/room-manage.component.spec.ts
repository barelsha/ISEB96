import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomManageComponent } from './room-manage.component';

describe('RoomManageComponent', () => {
  let component: RoomManageComponent;
  let fixture: ComponentFixture<RoomManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
