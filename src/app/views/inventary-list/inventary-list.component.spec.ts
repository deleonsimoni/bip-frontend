import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventaryListComponent } from './inventary-list.component';

describe('InventaryListComponent', () => {
  let component: InventaryListComponent;
  let fixture: ComponentFixture<InventaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
