import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-time-sheet',
  templateUrl: './user-time-sheet.component.html',
  styleUrls: ['./user-time-sheet.component.scss']
})
export class UserTimeSheetComponent implements OnInit {


  days = [];
  currentDate = new Date();
  employees = [];

  constructor(
    private userService: UserService,
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }


  ngOnInit(): void {
    this.currentDate = new Date();

    let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    while (date.getMonth() === this.currentDate.getMonth()) {
      let day = {date: new Date(date)};
      this.days.push(day);
      date.setDate(date.getDate() + 1);
    }

    this.listEmployees();
    
  }

  dateChanged(newDate) {
    this.currentDate= new Date(newDate);
    console.log(this.currentDate); // <-- for testing
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
