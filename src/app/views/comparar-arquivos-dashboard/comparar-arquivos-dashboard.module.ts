import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartComponent, HighchartsChartModule } from 'highcharts-angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CompararArquivosDashboardComponent } from './comparar-arquivos-dashboard.component';

@NgModule({
  declarations: [
    CompararArquivosDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HighchartsChartModule,
    ChartModule,
    NgbPaginationModule
  ]
})
export class CompararArquivosDashboardModule { }
