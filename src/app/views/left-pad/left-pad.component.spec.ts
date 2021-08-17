import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftPadComponent } from './left-pad.component';

describe('LeftPadComponent', () => {
  let component: LeftPadComponent;
  let fixture: ComponentFixture<LeftPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftPadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
