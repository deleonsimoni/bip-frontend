import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventaryDashboardComponent } from './inventary-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';


@NgModule({
  declarations: [
    InventaryDashboardComponent,
    HighchartsChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
  ]
})
export class InventaryDashboardModule { }
