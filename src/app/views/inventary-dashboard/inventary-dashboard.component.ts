import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InventaryService } from '../../services/inventary.service';
import * as Highcharts from 'highcharts';
import { saveAs } from 'file-saver';
import { UtilService } from '../../services/util.service';
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
    private utilService: UtilService,

  ) { }

  ngOnInit(): void {
    this.listInventories();

  }

  inventaries;
  findInventory;
  inventarySelect;
  secoes = [];
  isCollapsedDetails: boolean = true;
  isCollapsedResult: boolean = true;
  isCollapsedExport: boolean = true;
  formatExport;
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

  expanded() {

  }

  collapsed() {

  }

  getFormattedDate(originalDate) {
    return originalDate.toISOString().substring(0, originalDate.toISOString().length - 1);
}

  exportInventory(idInventory) {

    if (!this.formatExport) {
      this.toastr.error('Selecione um modelo', 'Erro: ');
      return;
    }

    this.spinner.show();
    this.inventaryService.exportInventory(this.formatExport, idInventory)
      .subscribe((data) => {


        this.spinner.hide();
        if (!data) {
          this.toastr.info('Nenhum item bipado para ser exportado');
        } else {

          //filtrar somente encontrados
          data = data.filter(bip => bip.isFounded)

          switch (Number(this.formatExport)) {
            case 1:
              this.downloadFileTemplate1(data, false);
              break;
            case 2:
              this.downloadFileTemplate1(data, true);
              break;
            case 3:
              this.downloadFileTemplate3(data);
              break;

            default:
              break;
          }
        }

      }, err => {
        this.spinner.hide();
        this.toastr.error('Problema ao buscar seção.' + err.error.message, 'Erro: ');
      });
  }

  downloadFileTemplate3(data: any) {
    let csv = data.map(row => row.bip);
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, `${this.inventarySelect.clientName}.txt`);
  }

  downloadFileTemplate1(data: any, isLeftPad: boolean) {

    const result = Array.from(new Set(data.map(s => s.bip)))
    .map((lab: any) => { 
      return {
        bip: isLeftPad ? this.utilService.pad(lab, 15) : lab,
        total: isLeftPad ? this.utilService.pad(data.filter(s => s.bip === lab).length, 6) : data.filter(s => s.bip === lab).length
      }
    })

    let csv = result.map(row =>  row.bip + ',' + row.total);

    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], { type: 'text/csv' })
    saveAs(blob, `${this.inventarySelect.clientName}.txt`);
  }

  getSecao(id) {

    this.spinner.show();
    this.inventaryService.getSection(id)
      .subscribe((data) => {

        this.spinner.hide();
        this.secoes = data;

        if(this.inventarySelect && this.inventarySelect.totalBip && this.secoes){
          this.inventarySelect.totalBip = this.secoes.reduce((total, item) => total + item.count, 0);
        }
        

      }, err => {
        this.spinner.hide();
        this.toastr.error('Problema ao buscar seção.' + err.error.message, 'Erro: ');
      });
  }

  detailInventory(inventory) {
    this.secoes = [];
    if (this.findInventory == inventory._id) {
      this.findInventory = '';
      return;
    } else {
      this.findInventory = inventory._id;
    }

    this.spinner.show();
    this.inventaryService.detailInventory(inventory._id)
      .subscribe((data) => {

        this.spinner.hide();

        this.inventarySelect = data.inventory[0];
        this.inventarySelect.totalBip = data.totalBip;
        this.inventarySelect.totalClient = data.totalClient;
        this.inventarySelect.clientName = inventory.client.name;
      }, err => {
        this.spinner.hide();
        this.toastr.error('Problema ao detalhar inventário.' + err.error.message, 'Erro: ');
      });
  }

  listInventories() {
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
