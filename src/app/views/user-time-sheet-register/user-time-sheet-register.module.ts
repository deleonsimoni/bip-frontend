import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTimeSheetRegisterComponent } from './user-time-sheet-register.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    UserTimeSheetRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    
  ]
})
export class UserTimeSheetRegisterModule { }






