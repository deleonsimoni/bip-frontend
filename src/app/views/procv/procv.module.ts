import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcvComponent } from './procv.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    ProcvComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ]
})
export class ProcvModule { }
