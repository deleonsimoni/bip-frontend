import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { NgxMaskModule } from 'ngx-mask';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    ModalModule.forRoot()


  ]
})
export class UserListModule { }
