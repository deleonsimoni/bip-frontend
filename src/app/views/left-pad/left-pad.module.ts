import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftPadComponent } from './left-pad.component';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
  declarations: [
    LeftPadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule
  ]
})
export class LeftPadModule { }
