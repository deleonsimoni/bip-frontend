import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTimeSheetListComponent } from './user-time-sheet-list.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    UserTimeSheetListComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule
    
  ]
})
export class UserTimeSheetListModule { }
