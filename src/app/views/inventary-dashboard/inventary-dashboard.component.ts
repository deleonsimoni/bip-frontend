import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InventaryService } from '../../services/inventary.service';
import * as Highcharts from 'highcharts';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inventary-dashboard',
  templateUrl: './inventary-dashboard.component.html',
  styleUrls: ['./inventary-dashboard.component.scss']
})
export class InventaryDashboardComponent implements OnInit {

  constructor(
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private inventaryService: InventaryService,
  ) { }

  ngOnInit(): void {
    this.listInventories();

  }

  inventaries;
  findInventory;
  inventarySelect;
  highcharts = Highcharts;
  chartOptions = {   
    chart: {
      type: 'pie',
      options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
      }
    },
    title: {
        text: "Totalizadores"
    },
    accessibility: {
      point: {
          valueSuffix: '%'
      }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
              enabled: true,
              format: '{point.name}'
          }
      }
    },
    series: []
  };

  detailInventory(id){
    this.spinner.show();
    if(this.findInventory == id){
      this.findInventory = '';
    }else {
      this.findInventory = id;

    }
    this.inventaryService.detailInventory(id) 
    .subscribe((data) => {

    this.spinner.hide();
    this.inventarySelect = data[0];
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao detalhar inventário.' + err.error.message, 'Erro: ');
    });
  }

  listInventories(){
    this.spinner.show();

    this.inventaryService.getAll() 
    .subscribe((data) => {

    this.spinner.hide();
    this.inventaries = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar inventários.' + err.error.message, 'Erro: ');
    });
  }

}
