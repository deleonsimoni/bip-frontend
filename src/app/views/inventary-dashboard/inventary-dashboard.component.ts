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
  inventaryId;
  resume;
  itenPaginated = [];
  limboPaginated = [];
  excel = [];

  currentPage = 1;
  itemsPerPage = 10;
  pageSize: number;
   
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

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  public changePagesize(num: number): void {
    this.itemsPerPage = this.pageSize + num;
  }
  
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
    //this.carregarItensPaginated();
    //this.carregarLimboPaginated();

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

    this.inventaryService.carregarItensPaginated(this.inventaryId, this.currentPage , this.itemsPerPage ) 
    .subscribe((data) => {

    this.spinner.hide();
    this.itenPaginated = data.itensClient;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar inventários.' + err.error.message, 'Erro: ');
    });

  }


  carregarLimboPaginated(){

    this.spinner.show();

    this.inventaryService.carregarLimboPaginated(this.inventaryId, this.currentPage , this.itemsPerPage) 
    .subscribe((data) => {

    this.spinner.hide();
    this.limboPaginated = data.limbo;
    
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


  
  gerarExcel(){
    this.excel = [];
    this.spinner.show();

    this.inventaryService.getItensFull(this.inventaryId) 
    .subscribe((data) => {

    this.spinner.hide();
    this.excel = data.itensClient;

    for (let i = 0; i < this.excel.length; i++) {

      if(this.excel[i].bip){
        this.excel[i]['Quantidade Bipada'] = 0;
        this.excel[i]['Diferença'] = 0;
        this.excel[i]['Seção'] = " ";
        for (let p = 0; p < this.excel[i].bip.length; p++) {
        
          this.excel[i]['Quantidade Bipada'] += Number(this.excel[i].bip[p].quantity);
          this.excel[i]['Seção'] += " / " + this.excel[i].bip[p].section;

        }

        if(this.excel[i]['quantity'] > this.excel[i]['Quantidade Bipada']){
          this.excel[i]['Diferença'] = this.excel[i]['quantity'] - this.excel[i]['Quantidade Bipada'];
        } else {
          this.excel[i]['Diferença'] = this.excel[i]['Quantidade Bipada'] - this.excel[i]['quantity'] ;
        }

      } else {
        this.excel[i].bip = "Não encontrado"
      }

    }

    this.exportAsExcelFile(this.excel);
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar inventários.' + err.error.message, 'Erro: ');
    });

  }

  public exportAsExcelFile(json: any[]): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, 'bip_export_' + new  Date().getTime() + '.xlsx');
  }

}
