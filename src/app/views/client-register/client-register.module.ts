import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRegisterComponent } from './client-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    ClientRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ClientRegisterModule { }
