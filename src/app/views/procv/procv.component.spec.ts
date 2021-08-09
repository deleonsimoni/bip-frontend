import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcvComponent } from './procv.component';

describe('ProcvComponent', () => {
  let component: ProcvComponent;
  let fixture: ComponentFixture<ProcvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
