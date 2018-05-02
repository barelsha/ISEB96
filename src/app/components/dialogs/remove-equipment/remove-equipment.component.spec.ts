import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveEquipmentComponent } from './remove-equipment.component';

describe('RemoveEquipmentComponent', () => {
  let component: RemoveEquipmentComponent;
  let fixture: ComponentFixture<RemoveEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
