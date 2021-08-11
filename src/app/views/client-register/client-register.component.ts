import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../services/client.service';
import { UtilService } from '../../services/util.service';
import { CustomValidator } from '../../validators/custom-validator';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss']
})
export class ClientRegisterComponent implements OnInit {

  clientForm: FormGroup;
  isUpdate = null;
  isMAtriz = true;
  headQuarters = [];

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilService: UtilService,
    private clientService: ClientService
  ) {
    this.isUpdate = this.router.getCurrentNavigation().extras.state;

   }



  ngOnInit(): void {

    this.clientForm = this.fb.group({
      name: ['', [Validators.required]],
      isHeadQuarter: [true],
      idHeadQuarter: [true],
      _id: [''],
      email: ['', [Validators.email]],
      document: [''],
      userTypeAccess:[''],
      complementAddress: [''],
      phones: this.fb.group({
        phone: [''],
        whatsapp: [''],
      }),
      address: this.fb.group({
        street: [''],
        complement: [''],
        number: [''],
        zip: [''],
        city: [''],
        district: [''],
        state: [''],
        country: [''],
      })

    });

    if (this.isUpdate) {
      this.clientForm.patchValue(
        this.isUpdate
      );
    }

    this.listHeadQuarters();


  }

  register() {

    //if (this.clientForm.invalid) return;

    this.spinner.show();

    if (this.isUpdate) {
      this.clientService.update(this.clientForm.value)
        .subscribe(() => {
          this.toastr.success('cliente atualizado com sucesso.', 'Sucesso');
          this.router.navigate(['/client/list']);
        }, err => {
          this.toastr.error('Problema ao atualizar o cliente.' + err.error.msg, 'Erro: ');
        });
    } else {
      this.clientService.register(this.clientForm.value)
        .subscribe(() => {
          this.toastr.success('cliente cadastrado com sucesso.', 'Sucesso');
          this.router.navigate(['/client/list']);
        }, err => {
          this.toastr.error('Problema ao realizar o cadastro. ', 'Erro: ');
        });
    }
  }

  async changeFindCEP(cep) {
    this.utilService.findCep(cep.target.value).subscribe(
      (cepReturn) => {
          this.clientForm.patchValue({
            address: {
              street: cepReturn.street,
              zip: cepReturn.cep,
              district: cepReturn.neighborhood,
              city: cepReturn.city,
              state: cepReturn.state,
              country: "Brasil",
            },
          });
      },
      () => {
        this.clientForm.patchValue({
          address: {
            street: '',
            zip: '',
            district: '',
            city: '',
            state: '',
            country: '',
          },
        });
      });
  }

  listHeadQuarters(){
    this.clientService.getAllHeadQuarters() 
    .subscribe((data) => {

    this.spinner.hide();
    this.headQuarters = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar Matrizes.' + err.error.message, 'Erro: ');
    });
  }

  voltar(){
    this.router.navigate(['/client/list']);
  }


}
