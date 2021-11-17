import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimeSheetListComponent } from './user-time-sheet-list.component';

describe('UserTimeSheetListComponent', () => {
  let component: UserTimeSheetListComponent;
  let fixture: ComponentFixture<UserTimeSheetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimeSheetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTimeSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
