import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { UtilService } from '../../services/util.service';
import { CustomValidator } from '../../validators/custom-validator';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  userForm: FormGroup;
  isUpdate = null;

  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilService: UtilService,
    private userService: UserService
  ) {
    this.isUpdate = this.router.getCurrentNavigation().extras.state;

   }



  ngOnInit(): void {

    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      _id: [''],
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      password: ['', [
        Validators.required
      ]],
      cpf: ['', [Validators.required, CustomValidator.isValidCpf]],
      userTypeAccess:[''],
      complementAddress: [''],
      price: [''],
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
      delete this.isUpdate.password;
      this.userForm.patchValue(
        this.isUpdate
      );
    }

  }

  register() {

    if (this.userForm.invalid) return;

    this.spinner.show();

    if (this.isUpdate) {
      this.userService.update(this.userForm.value._id, this.userForm.value)
        .subscribe((data) => {
          this.spinner.hide();

          if(!data.errors){
            this.toastr.success('Funcion??rio atualizado com sucesso.', 'Sucesso');
            this.router.navigate(['/user/list']);  
          } else {
            this.toastr.error('Email j?? se encontra na base de dados', 'Aten????o');
          }
        }, err => {
          this.spinner.hide();

          if(err && err.error && err.error.keyValue && err.error.keyValue.email){
            this.toastr.error('Email j?? se encontra na base de dados', 'Aten????o');
          } else {
            this.toastr.error('Problema ao realizar o cadastro. ', 'Erro: ');
          }

        });
    } else {
      let formValue = this.userForm.value;
      delete formValue._id;
      this.userService.register(formValue)
        .subscribe((data) => {
          this.spinner.hide();
          
          if(!data.errors){
            this.toastr.success('Funcion??rio cadastrado com sucesso.', 'Sucesso');
            this.router.navigate(['/user/list']);  
          } else {
            this.toastr.error('Email j?? se encontra na base de dados', 'Aten????o');
          }

        }, err => {
          this.spinner.hide();

          if(err && err.error && err.error.errors && err.error.errors.email){
            this.toastr.error('Email j?? se encontra na base de dados', 'Aten????o');
          } else {
            this.toastr.error('Problema ao realizar o cadastro. ', 'Erro: ');
          }
          
        });
    }
  }


  voltar(){
    this.router.navigate(['/user/list']);
  }


  async changeFindCEP(cep) {
    this.utilService.findCep(cep.target.value).subscribe(
      (cepReturn: any) => {
          this.userForm.patchValue({
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


}
