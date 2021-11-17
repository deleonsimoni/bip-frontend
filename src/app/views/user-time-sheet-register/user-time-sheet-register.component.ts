import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { TimeSheetService } from '../../services/timesheet.service';
import { CustomValidator } from '../../validators/custom-validator';
import dateFormat, { masks } from "dateformat";

@Component({
  selector: 'app-user-time-sheet',
  templateUrl: './user-time-sheet-register.component.html',
  styleUrls: ['./user-time-sheet-register.component.scss']
})

export class UserTimeSheetRegisterComponent implements OnInit {

  userTimeSheetForm: FormGroup;
  isUpdate = null;
  isNotReadOnlyEntry: boolean;
  isNotDisabledEmployee: boolean;
   isNotReadonlyExit: boolean;
  days = [];
  currentDate = new Date();
  employees = [];
 
 

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private timeSheetService: TimeSheetService,
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { 
    this.isUpdate = this.router.getCurrentNavigation().extras.state;
    console.log("isUpdate ==> "+this.isUpdate);

  }


  ngOnInit(): void {

    this.userTimeSheetForm = this.fb.group({
      date: [''],
      month:[''],
      year:[''],
       _id: [''],
      entry: [''],
      employee: [null],
      exit: [''],
      journey: [''],
      note: ['']
    });

    if (this.isUpdate) {
       this.isNotReadOnlyEntry = this.isUpdate.entry ? true : false; 
       this.isNotDisabledEmployee = this.isUpdate.entry ? true : false;
       this.isNotReadonlyExit = this.isUpdate.exit ? true : false;

       this.userTimeSheetForm.patchValue(
        this.isUpdate
       );
    }
    else {
      this.isNotReadOnlyEntry = false;
      this.isNotDisabledEmployee = false;
      this.isNotReadonlyExit = true;
      this.userTimeSheetForm.patchValue({
        date: dateFormat(this.currentDate, "dd/mm/yyyy")
      });
    }

    this.listEmployees();

  }

  listTimeSheet(){
    this.spinner.show();
    let formValue = this.userTimeSheetForm.value;
  
    this.timeSheetService.getByIdDate(formValue.employee, formValue.date )
    .subscribe((data: any) => {
    this.spinner.hide();
    console.log(data.length);
      if (data.length > 0) {
          if (data[0].entry != "" && data[0].exit == ""){
             this.isUpdate = true;
             this.isNotReadOnlyEntry = true; 
             this.isNotDisabledEmployee = true;
             this.isNotReadonlyExit = false;
             this.clearFieldsForm();
             this.userTimeSheetForm.patchValue({
                month: data[0].month,
                year: data[0].year,
                _id: data[0]._id,
                entry: data[0].entry,
                journey: data[0].journey,
                note: data[0].note,
            });          
          }
          else if (data[0].entry != "" && data[0].exit != "") {
                  this.isNotReadOnlyEntry = false;
                  this.isNotDisabledEmployee = false;
                  this.isNotReadonlyExit = true;
                  this.isUpdate = false;
                  this.clearFieldsForm();
          }          
      }
      else {
        this.isNotReadOnlyEntry = false;
        this.isNotDisabledEmployee = false;
        this.isNotReadonlyExit = true;
        this.isUpdate = false;
        this.clearFieldsForm();
      }
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar o registro.' + err.error.message, 'Erro: ');
    });
  }

  clearFieldsForm(){
    this.userTimeSheetForm.patchValue({
        month: "",
        year: "",
        _id: "",
        entry: "",
        exit: "",
        journey: "",
        note: "",
      });
  }

  register() {

    if (this.userTimeSheetForm.invalid) return;
    let formValue = this.userTimeSheetForm.value;

    this.spinner.show();
    if (this.isUpdate) {
      formValue.exit = dateFormat(this.currentDate, "HH:MM:ss");
      this.timeSheetService.update(this.userTimeSheetForm.value._id, this.userTimeSheetForm.value)
      .subscribe((data) => {
        this.spinner.hide();

        if(!data.errors){
          this.toastr.success('Registro de ponto atualizado com sucesso.', 'Sucesso');
          this.router.navigate(['/user/timeSheet/list']);  
        } else {
          this.toastr.error('Registro já se encontra na base de dados', 'Atenção');
        }
      }, err => {
        this.spinner.hide();

        if(err && err.error && err.error.keyValue && err.error.keyValue.email){
          this.toastr.error('registro já se encontra na base de dados', 'Atenção');
        } else {
          this.toastr.error('Problema ao realizar o cadastro. ', 'Erro: ');
        }

      });

     /* this.timeSheetService.getByIdDate(this.userTimeSheetForm.value.date)
      .subscribe((data) => {
        this.spinner.hide();
        if(!data.errors){
          this.toastr.success('Registro de ponto atualizado com sucesso.', 'Sucesso');
          this.router.navigate(['/user/timeSheet/list']);  
        } else {
          this.toastr.error('Registro já se encontra na base de dados', 'Atenção');
        }
      }, err => {
        this.spinner.hide();
        if(err && err.error && err.error.keyValue && err.error.keyValue.email){
          this.toastr.error('Registro já se encontra na base de dados', 'Atenção');
        } else {
          this.toastr.error('Problema ao realizar o cadastro. ', 'Erro: ');
        }
        
      });*/


    } else {
    
      delete formValue._id;

      if (formValue.entry == "x" || formValue.entry == "X") {
        formValue.month = formValue.date.substring(5, 3);
        formValue.year = formValue.date.substring(10, 6);
        formValue.entry = dateFormat(this.currentDate, "HH:MM:ss");
        this.timeSheetService.register(formValue)
        .subscribe((data) => {
          this.spinner.hide();
          
          if(!data.errors){
            this.toastr.success('Registro de ponto cadastrado com sucesso.', 'Sucesso');
            this.router.navigate(['/user/timeSheet/list']);  
          } else {
            formValue.entry = "x";
            this.toastr.error('Registro já se encontra na base de dados', 'Atenção');
          }

        }, err => {
          this.spinner.hide();
          formValue.entry = "x";
          if(err && err.error && err.error.errors && err.error.errors.email){
            this.toastr.error('Registro já se encontra na base de dados', 'Atenção');
          } else {
            this.toastr.error('Problema ao realizar o cadastro. ', 'Erro: ');
          }
          
        });
      }
      else {
        formValue.entry = "x";
        this.toastr.error('Conforme instroções não gistada a letra x. ', 'Erro: ');
      }
      console.log(formValue.entry);

    }
  }

  async changeFindWord(entry) {
    console.log(entry.target.value);
    var word = entry.target.value;
    if (word.toUpperCase() != "X" ){
      this.toastr.error('Você digitou "'+word+'". Por favor, preencha com a letra X. ', 'Erro: ');
    }
  }
  
  voltar(){
    this.router.navigate(['/user/timeSheet/list']);
  }

  listEmployees(){
    this.userService.getAll() 
    .subscribe((data) => {

    this.spinner.hide();
    this.employees = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar funcionários.' + err.error.message, 'Erro: ');
    });
  }

}
