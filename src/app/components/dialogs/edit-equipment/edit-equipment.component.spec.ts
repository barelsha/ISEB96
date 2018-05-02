import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipmentComponent } from './edit-equipment.component';

describe('EditEquipmentComponent', () => {
  let component: EditEquipmentComponent;
  let fixture: ComponentFixture<EditEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
