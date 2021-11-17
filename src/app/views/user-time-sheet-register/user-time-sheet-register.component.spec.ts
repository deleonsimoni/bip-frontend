import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimeSheetRegisterComponent } from './user-time-sheet-register.component';

describe('UserTimeSheetRegisterComponent', () => {
  let component: UserTimeSheetRegisterComponent;
  let fixture: ComponentFixture<UserTimeSheetRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimeSheetRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTimeSheetRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
