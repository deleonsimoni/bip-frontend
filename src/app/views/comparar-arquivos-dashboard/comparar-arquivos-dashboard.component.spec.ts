import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompararArquivosDashboardComponent } from './comparar-arquivos-dashboard.component';

describe('CompararArquivosDashboardComponent', () => {
  let component: CompararArquivosDashboardComponent;
  let fixture: ComponentFixture<CompararArquivosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompararArquivosDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompararArquivosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
