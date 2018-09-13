import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipSearchComponent } from './equip-search.component';

describe('EquipSearchComponent', () => {
  let component: EquipSearchComponent;
  let fixture: ComponentFixture<EquipSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
