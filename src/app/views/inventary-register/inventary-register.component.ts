import { Component, OnInit } from '@angular/core';
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

  ) { }


 
  toggleDisabled() {
    const car: any = this.employees[1];
    car.disabled = !car.disabled;
}


  ngOnInit(): void {

    this.inventaryForm = this.fb.group({
      name: ['', [Validators.required]],
      _id: [''],
      description: ['',],
      initialDate: [''],
      endDate:[''],
      isSetQuantitie:[false],
      employees: this.fb.array([]),
      selectedClient: [null],
      fileClient: [''],
      positionFile: this.fb.group({
        refer: ['', [Validators.required]],
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

    if (this.isUpdate) {
      this.clientService.update(null, this.inventaryForm.value)
        .subscribe((data) => {
          this.spinner.hide();
          if(!data.errors){
            this.toastr.success('Inventário atualizado com sucesso.', 'Sucesso');
            this.router.navigate(['/inventary/list']);  
          } else {
            this.toastr.error('Erro ao atualizar o inventário', 'Atenção');
          }
        }, err => {
          this.spinner.hide();
          this.toastr.error('Problema ao atualizar o inventário.' + err.error.message, 'Erro: ');
        });
    } else {
      let formValue = this.inventaryForm.value;
      delete formValue._id;
      this.clientService.register(formValue)
        .subscribe((data) => {
          this.spinner.hide();
          
          if(!data.errors){
            this.toastr.success('Inventário criado com sucesso.', 'Sucesso');
            this.router.navigate(['/inventary/list']);  
          } else {
            this.toastr.error('Erro ao registrar o inventário', 'Atenção');
          }

        }, err => {
          this.spinner.hide();
          this.toastr.error('Problema ao realizar o cadastro. ', 'Erro: ');
        });
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
    this.router.navigate(['/inventary/list']);
  }

}
