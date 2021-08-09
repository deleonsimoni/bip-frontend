import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTimeSheetComponent } from './user-time-sheet.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserTimeSheetComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    FormsModule
    
  ]
})
export class UserTimeSheetModule { }
