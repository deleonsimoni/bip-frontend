import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(
    protected authenticationService: AuthenticationService,
              protected router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']

    });

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        this.toastr.warning('Preencha corretamente o formulário', 'Atenção!');
        return;
    }

    this.spinner.show();

    this.authenticationService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
              this.spinner.hide();

              if(!data.errors){
                this.toastr.success('Cadastro realizado com sucesso', 'Bem vindo!');
                this.router.navigate(['/login']);
              } else {
                this.toastr.error('Email já se encontra na base de dados', 'Atenção');
                
              }
             
            },
            error => {
              this.spinner.hide();
              this.toastr.error('Atenção', 'Dados inválidos', {
                timeOut: 3000,
              });
            });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }

}
