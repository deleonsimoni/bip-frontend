import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../../services/client.service';
import { InventaryService } from '../../services/inventary.service';
import { UserService } from '../../services/user.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-inventary-register',
  templateUrl: './inventary-register.component.html',
  styleUrls: ['./inventary-register.component.scss']
})
export class InventaryRegisterComponent implements OnInit {


  inventaryForm: FormGroup;
  isUpdate = null;
  clients = [];
  employees = [];

  selectedEmployees = [];


  constructor(
    private fb: FormBuilder,
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilService: UtilService,
    private clientService: ClientService,
    private inventaryService: InventaryService,
    private userService: UserService,
    private host: ElementRef<HTMLInputElement>
  ) { }


 
  toggleDisabled() {
    const car: any = this.employees[1];
    car.disabled = !car.disabled;
  }


  ngOnInit(): void {

    this.inventaryForm = this.fb.group({
      _id: [''],
      description: ['',],
      startDate: [''],
      endDate:[''],
      isQuantify:[false],
      employees: this.fb.array([]),
      client: [null],
      fileClient: [null],
      positionFile: this.fb.group({
        refer: [''],
        referPrev: [''],
        description: [''],
        price: [''],
        situation: [''],
        sector: ['']
      }),

    });

    if (this.isUpdate) {
      this.inventaryForm.patchValue(
        this.isUpdate
      );
    }

    this.listClients();
    this.listEmployees();
  }

  register() {

    //if (this.clientForm.invalid) return;

    this.spinner.show();

    const formData = new FormData();
    let formValue = this.inventaryForm.value;
    formValue.employees = this.selectedEmployees;
    formData.append('file', this.inventaryForm.get('fileClient').value);
    delete formValue.fileClient;


    if (this.isUpdate) {
      formData.append('formulario', JSON.stringify(formValue));
      this.inventaryService.update(formValue._id, formData)
        .subscribe((data) => {
          this.spinner.hide();
          if(!data.errors){
            this.toastr.success('Inventário atualizado com sucesso.', 'Sucesso');
            this.router.navigate(['/inventary/dashboard']);  
          } else {
            this.toastr.error('Erro ao atualizar o inventário', 'Atenção');
          }
        }, err => {
          this.spinner.hide();
          this.toastr.error('Problema ao atualizar o inventário.' + err.error.message, 'Erro: ');
        });
    } else {
      delete formValue._id;
      formData.append('formulario', JSON.stringify(formValue));
      this.inventaryService.register(formData)
        .subscribe((data) => {
          this.spinner.hide();
          
          if(!data.errors){
            this.toastr.success('Inventário criado com sucesso.', 'Sucesso');
            this.router.navigate(['/inventary/dashboard']);  
          } else {
            this.toastr.error('Erro ao registrar o inventário', 'Atenção');
          }

        }, err => {
          this.spinner.hide();
          this.toastr.error('Problema ao realizar o cadastro. ', 'Erro: ');
        });
    }
  }

  onFileChange(event) {
    if(event.target.files.length > 0) 
    {
      this.inventaryForm.patchValue({
         fileClient: event.target.files[0],
      })
    }
  }

  listClients(){
    this.clientService.getAll() 
    .subscribe((data) => {

    this.spinner.hide();
    this.clients = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar clientes.' + err.error.message, 'Erro: ');
    });
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

  voltar(){
    this.router.navigate(['/inventary/dashboard']);
  }

}
