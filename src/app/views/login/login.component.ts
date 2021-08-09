import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NgxSpinnerService } from "ngx-spinner";
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;

  constructor(protected authenticationService: AuthenticationService,
              protected router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService
              ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    

  }

  get f() { return this.loginForm.controls; }

  login(){

    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show();


    this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.spinner.hide();
                    this.toastr.success('Bem vindo!', 'Login realizado com sucesso');

                    const returnUrl = '/dashboard';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                  this.spinner.hide();
                  this.toastr.error('Usuário ou senha inválidos', 'Atenção', {
                    timeOut: 3000,
                  });
                }
            });
  
   
  }

  redirectRegister(){
    this.router.navigate( [ '/register' ]);
  }



 }
