import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcvComponent } from './procv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    ProcvComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ProcvModule { }
