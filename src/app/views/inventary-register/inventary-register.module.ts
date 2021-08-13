import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventaryRegisterComponent } from './inventary-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    InventaryRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
  ]
})
export class InventaryRegisterModule { }
