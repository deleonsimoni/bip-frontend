import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list.component';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    ClientListComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule
  ]
})
export class ClientListModule { }
