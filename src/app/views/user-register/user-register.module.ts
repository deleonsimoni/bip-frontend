import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  declarations: [
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule

  ],
  exports:[
    NgxMaskModule
  ],
})
export class UserRegisterModule { }
