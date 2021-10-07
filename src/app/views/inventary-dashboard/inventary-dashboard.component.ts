import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InventaryService } from '../../services/inventary.service';
import { InventaryListModule } from '../inventary-list/inventary-list.module';
import * as Highcharts from 'highcharts';

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
  inventaryId;
  resume;
  itenPaginated = [];
  limboPaginated = [];
   
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
  
  findInventary(){

    this.spinner.show();
    this.resume = null;

    if(!this.inventaryId){
      this.spinner.hide();
      this.toastr.warning('Selecione um inventário para buscar.', 'Atenção');
      return;
    }

    this.inventaryService.getInventaryExcel(this.inventaryId) 
    .subscribe((data) => {

    this.spinner.hide();
    this.resume = data;
    this.carregarItensPaginated();
    this.carregarLimboPaginated();

    this.chartOptions.series = [{
        type: 'pie',
        name: 'B.I.P',
        data: [
          {
            name: 'Total de Produtos do Cliente',
            y: this.resume.summary.totalClient,
            sliced: true,
            selected: true
          },
            ['Total de Produtos Bipados', this.resume.summary.totalBip],
            ['Total de Produtos Encontrados', this.resume.summary.totalFind],
            ['Total de Produtos Bipados Fora da Relação', this.resume.summary.totalLimbo]
        ]
    }]
    
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar inventários.' + err.error.message, 'Erro: ');
    });



  }

  carregarItensPaginated(){

    this.spinner.show();

    this.inventaryService.carregarItensPaginated(this.inventaryId) 
    .subscribe((data) => {

    this.spinner.hide();
    this.itenPaginated = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar inventários.' + err.error.message, 'Erro: ');
    });

  }

  carregarLimboPaginated(){

    this.spinner.show();

    this.inventaryService.carregarLimboPaginated(this.inventaryId) 
    .subscribe((data) => {

    this.spinner.hide();
    this.limboPaginated = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar inventários.' + err.error.message, 'Erro: ');
    });

  }

  listInventories(){
    this.spinner.show();

    this.inventaryService.getAllCombo() 
    .subscribe((data) => {

    this.spinner.hide();
    this.inventaries = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar inventários.' + err.error.message, 'Erro: ');
    });
  }

}
