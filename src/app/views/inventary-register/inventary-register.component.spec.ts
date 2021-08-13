import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventaryRegisterComponent } from './inventary-register.component';

describe('InventaryRegisterComponent', () => {
  let component: InventaryRegisterComponent;
  let fixture: ComponentFixture<InventaryRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventaryRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventaryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
