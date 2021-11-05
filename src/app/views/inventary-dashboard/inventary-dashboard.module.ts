import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventaryDashboardComponent } from './inventary-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartComponent, HighchartsChartModule } from 'highcharts-angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CollapseModule } from 'ngx-bootstrap/collapse';


@NgModule({
  declarations: [
    InventaryDashboardComponent,
    
  ],
  imports: [
    CollapseModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    HighchartsChartModule,
    ChartModule,
    NgbPaginationModule
  ]
})
export class InventaryDashboardModule { }
