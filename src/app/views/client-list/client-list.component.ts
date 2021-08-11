import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalDeleteComponent } from '../../modals/modal-delete/modal-delete.component';
import { ClientService } from '../../services/client.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clients=[];
  headQuarters=[];

  public modalRef: BsModalRef;

  constructor(
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private clientService: ClientService,
    private modalService: BsModalService

  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.listMyClients();

   
  }

  listMyClients(){
    this.clientService.getAll() 
    .subscribe((data) => {

    this.spinner.hide();
    this.clients = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar Clientes.' + err.error.message, 'Erro: ');
    });
  }

  openModalDelete(client){
    this.modalRef = this.modalService.show(ModalDeleteComponent, { initialState: { title: 'Excluir', message: `Confirma exclusão do cliente ${client.name}` }});
    
    this.modalRef.content.onClose.subscribe(result => {
        if(result){
          this.delete(client._id);
        }
    })
  }

  delete(id){

    this.spinner.show();

    this.clientService.delete(id) 
      .subscribe((data) => {

      this.spinner.hide();
      this.toastr.success('Cliente excluído com sucesso', 'Ok');
      this.listMyClients();
      
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao excluir cliente' + err.error.message, 'Erro: ');
    });

  }


}
