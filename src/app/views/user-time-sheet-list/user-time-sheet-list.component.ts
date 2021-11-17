import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { TimeSheetService } from '../../services/timesheet.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalDeleteComponent } from '../../modals/modal-delete/modal-delete.component';






@Component({
  selector: 'app-user-time-sheet',
  templateUrl: './user-time-sheet-list.component.html',
  styleUrls: ['./user-time-sheet-list.component.scss']
})
export class UserTimeSheetListComponent implements OnInit {
  userTimeSheetListForm: FormGroup;
  timeSheet=[];
  days = [];
  currentDate = new Date();
  employees = [];
  //listTimeSheetEmployee: Array<any>;
  listTimeSheetEmployee = [];
  isRecord: boolean;
  public modalRef: BsModalRef;

  constructor(
    private fb: FormBuilder,
    private timeSheetService: TimeSheetService,
    private userService: UserService,
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
  ) { }


  ngOnInit(): void {

    this.userTimeSheetListForm = this.fb.group({
      dateinput: [''],
      employee: [null]
    });

    this.currentDate = new Date();

    let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    while (date.getMonth() === this.currentDate.getMonth()) {
      let day = {date: new Date(date)};
      this.days.push(day);
      date.setDate(date.getDate() + 1);
    }
    this.listEmployees();
    
  }

  listTimeSheet(id, employee){
    this.spinner.show();
    let idDate = this.currentDate.getDate();
    let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);

    this.timeSheetService.getByIdDate(id.target.value, idDate) 
    .subscribe((data) => {

    this.spinner.hide();
    this.timeSheet = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar Clientes.' + err.error.message, 'Erro: ');
    });
  }

  update(listTimeSheetEmployees){
    this.router.navigateByUrl('/user/timeSheet/register',{state:listTimeSheetEmployees});
  }


  openModalDelete(listTimeSheetEmployees){
    
    this.spinner.show();
    this.modalRef = this.modalService.show(ModalDeleteComponent, { initialState: { title: 'Excluir', message: `Confirma exclusão desse registro ${listTimeSheetEmployees.date}` }});
    this.modalRef.content.onClose.subscribe(result => {
    if(result){
       this.delete(listTimeSheetEmployees._id);
       this.consult();
    }
    })
    this.spinner.hide();    
  }

  delete(id){
    this.spinner.show();
    this.timeSheetService.delete(id) 
      .subscribe((data) => {
      this.spinner.hide();
      this.toastr.success('Registro excluído com sucesso.', 'Ok');
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao excluir registro' + err.error.message + '.', 'Erro: ');
    });
  }


  consult(){
      let formValue = this.userTimeSheetListForm.value;
      let resultado = formValue.dateinput.split("-");
      this.listTimeSheetEmployee = [];
      this.spinner.show();
      this.timeSheetService.getByIdMonthYear(formValue.employee,resultado[1], resultado[0])
      .subscribe((data: any) => {
 
        if (data.length > 0) {
          this.listTimeSheetEmployee = data;
          this.isRecord = true;
        }
        else {
          this.isRecord = false;
        }
      
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.toastr.error('Problema ao listar Clientes.' + err.error.message, 'Erro: ');
      });
  }

    
  dateChanged(newDate) {
    this.currentDate= new Date(newDate);

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
