import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventaryDashboardComponent } from './inventary-dashboard.component';

describe('InventaryDashboardComponent', () => {
  let component: InventaryDashboardComponent;
  let fixture: ComponentFixture<InventaryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventaryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventaryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
