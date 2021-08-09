import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalDeleteComponent } from '../../modals/modal-delete/modal-delete.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users=[];
  public modalRef: BsModalRef;

  constructor(
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private modalService: BsModalService

  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.listMyEmployee();
   
  }

  listMyEmployee(){
    this.userService.getAll() 
    .subscribe((data) => {

    this.spinner.hide();
    this.users = data;
    
  }, err => {
    this.spinner.hide();
    this.toastr.error('Problema ao listar funcionários.' + err.error.message, 'Erro: ');
  });
  }

  openModalDelete(employee){
    this.modalRef = this.modalService.show(ModalDeleteComponent, { initialState: { title: 'Excluir', message: `Confirma exclusão do funcionário ${employee.name}` }});
    
    this.modalRef.content.onClose.subscribe(result => {
        if(result){
          this.delete(employee._id);
        }
    })
  }

  delete(id){

    this.spinner.show();

    this.userService.delete(id) 
      .subscribe((data) => {

      this.spinner.hide();
      this.toastr.success('Funcionário excluído com sucesso', 'Ok');
      this.listMyEmployee();
      
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao excluir funcionários' + err.error.message, 'Erro: ');
    });

  }

}
