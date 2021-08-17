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
  headQuartersList = [];

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
      headquarters: [null],
      _id: [''],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
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
      if(this.isUpdate.headquarters){
        this.isUpdate.isHeadQuarter = false;
      }

      this.clientForm.patchValue(
        this.isUpdate
      );
    }

    this.listHeadQuarters();


  }

  register() {

    //if (this.clientForm.invalid) return;

    this.spinner.show();

    let formValues = this.clientForm.value;

    if(formValues.isHeadQuarter){
      delete formValues.headquarters;
    }

    if (this.isUpdate) {
      this.clientService.update(formValues._id, formValues)
        .subscribe((data) => {
          this.spinner.hide();
          if(!data.errors){
            this.toastr.success('Cliente atualizado com sucesso.', 'Sucesso');
            this.router.navigate(['/client/list']);  
          } else {
            this.toastr.error('Email já se encontra na base de dados', 'Atenção');
          }
        }, err => {
          this.spinner.hide();
          if(err && err.error && err.error.keyValue && err.error.keyValue.email){
            this.toastr.error('Email já se encontra na base de dados', 'Atenção');
          } else {
            this.toastr.error('Problema ao realizar o cadastro. ', 'Erro: ');
          }
        });
    } else {
      let formValue = formValues;
      delete formValue._id;
      this.clientService.register(formValue)
        .subscribe((data) => {
          this.spinner.hide();
          
          if(!data.errors){
            this.toastr.success('Cliente cadastrado com sucesso.', 'Sucesso');
            this.router.navigate(['/client/list']);  
          } else {
            this.toastr.error('Email já se encontra na base de dados', 'Atenção');
          }

        }, err => {
          this.spinner.hide();
          if(err && err.error && err.error.errors && err.error.errors.email){
            this.toastr.error('Email já se encontra na base de dados', 'Atenção');
          } else {
            this.toastr.error('Problema ao realizar o cadastro. ', 'Erro: ');
          }
        });
    }
  }

  async changeFindCEP(cep) {
    this.utilService.findCep(cep.target.value).subscribe(
      (cepReturn: any) => {
          this.clientForm.patchValue({
            address: {
              street: cepReturn.logradouro,
              zip: cepReturn.cep,
              district: cepReturn.bairro,
              city: cepReturn.localidade,
              state: cepReturn.uf,
              country: "Brasil",
            },
          });
      });
  }

  listHeadQuarters(){
    this.clientService.getAllHeadQuarters() 
    .subscribe((data) => {

    this.spinner.hide();
    this.headQuartersList = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar Matrizes.' + err.error.message, 'Erro: ');
    });
  }

  voltar(){
    this.router.navigate(['/client/list']);
  }


}
