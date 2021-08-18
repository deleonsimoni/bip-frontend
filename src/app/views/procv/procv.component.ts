import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../services/util.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-procv',
  templateUrl: './procv.component.html',
  styleUrls: ['./procv.component.scss']
})
export class ProcvComponent implements OnInit {

  constructor(
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilService: UtilService,
  ) { }

  acabou = false;

  ngOnInit(): void {
  }    

  processar() {
    this.spinner.show();

    let fileCliente = (<HTMLInputElement>document.getElementById('excelCliente')).files[0];
    let fileBip = (<HTMLInputElement>document.getElementById('excelBipado')).files[0];
    let arrayBuffer;
    let filelist;
    let fileReaderClient = new FileReader();    
    let fileReaderBip = new FileReader();    
    let contagemTotal = 0;
    let diferencaTotal = 0;

    const posCodBarraClient = 9;
    const posQuantidadeClient = 10;

    const posCodBarraBIP = 1;
    const posContabilizado = 11;
    const posDiferenca = 12;
    const posQuantidadeBipada = 3;

    const posSumarioTotalFinal = 14;
    const posSumarioDiferencaFinal = 13;


      try {
        if(!fileCliente){
          this.spinner.hide();
          this.toastr.warning('Selecione corretamento o arquivo do cliente.', 'Atenção');
          return;
        }

        if(!fileBip){
          this.spinner.hide();
          this.toastr.warning('Selecione corretamento o arquivo do inventário.', 'Atenção');
          return;
        }

        fileReaderClient.readAsArrayBuffer(fileCliente);     
        fileReaderClient.onload = (e) => {
            arrayBuffer = fileReaderClient.result;    
            var data = new Uint8Array(arrayBuffer);    
            var arr = new Array();    
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
            var bstr = arr.join("");    
            var workbook = XLSX.read(bstr, {type:"binary"});    
            var first_sheet_name = workbook.SheetNames[0];    
            var worksheet = workbook.Sheets[first_sheet_name];   
            
            let rowsClient = XLSX.utils.sheet_to_json(worksheet, {
              raw: true, // Use raw values (true) or formatted strings (false)
              header: 1, // Generate an array of arrays ("2D Array")
            });
            
            fileReaderBip.readAsArrayBuffer(fileBip);     
            fileReaderBip.onload = (e) => {  
            arrayBuffer = fileReaderBip.result;    
            data = new Uint8Array(arrayBuffer);    
            arr = new Array();    
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
            bstr = arr.join("");    
            workbook = XLSX.read(bstr, {type:"binary"});    
            first_sheet_name = workbook.SheetNames[0];    
            worksheet = workbook.Sheets[first_sheet_name];   
            
            let rowsBip = XLSX.utils.sheet_to_json(worksheet, {
              raw: true, // Use raw values (true) or formatted strings (false)
              header: 1, // Generate an array of arrays ("2D Array")
            });

            this.spinner.hide();
            this.toastr.success('Seu arquivo está sendo baixado.', 'Sucesso');


            for (let index = 0; index < rowsClient.length; index++) {

              if(this.acabou){
                  break;
              }
    
              if(index == 0){
                  rowsClient[index][posContabilizado] = 'Contabilizados';
                  rowsClient[index][posDiferenca] = 'Diferença';
                  continue;
              } /* pulando linha do TOTAL if (index == 1){
                  continue;
              }*/ else {
    
                  let achei = false;
                  let contabilizacaoRepetida = 0;
    
                  for (let jotex = 0; jotex < rowsBip.length; jotex++) {    
    
                      if(jotex == 0){
                          continue;
                      } else {
                          if(!rowsClient[index][posCodBarraClient]){
                            this.acabou = true;
                              break;
                          }
                          if(rowsBip[jotex][posCodBarraBIP].trim() == rowsClient[index][posCodBarraClient].trim() /* CASO TENHA CODIGO INTERNO || rowsBip[jotex][posCodBarraBIP] == rowsClient[index][0]*/){
                              
                              contagemTotal += rowsBip[jotex][posQuantidadeBipada];
                              contabilizacaoRepetida += rowsBip[jotex][posQuantidadeBipada];
                              rowsClient[index][posContabilizado] = contabilizacaoRepetida;
                              if(rowsClient[index][posQuantidadeClient] >= 0){
                                  rowsClient[index][posDiferenca] = contabilizacaoRepetida - rowsClient[index][posQuantidadeClient];
                              } else {
                                  rowsClient[index][posDiferenca] = rowsClient[index][posQuantidadeClient] + contabilizacaoRepetida;
                              }

                              diferencaTotal = rowsClient[index][posDiferenca];
                              achei = true;
                          
                              //break;
                          }
                      }
                  }
    
                  if(!achei){
                      rowsClient[index][posContabilizado] = 0;
                      rowsClient[index][posDiferenca] = rowsClient[index][posQuantidadeClient] * -1;
                      diferencaTotal = rowsClient[index][posDiferenca];
                  }
              }

            }

            //Procurando os bipados que nao estao na tabela do cliente
            let bipExtra = new Array();
            for (let index = 0; index < rowsBip.length; index++) {

             
              if(index == 0){
                  continue;
              } else {
    
                  let achei = false;
    
                  for (let jotex = 0; jotex < rowsClient.length; jotex++) {    
    
                      if(jotex == 0){
                          continue;
                      } else {
                          
                          if(rowsBip[index][posCodBarraBIP].trim() == rowsClient[jotex][posCodBarraClient].trim() /* CASO TENHA CODIGO INTERNO || rowsBip[jotex][posCodBarraBIP] == rowsClient[index][0]*/){
                              achei = true;
                              //break;
                          }
                      }
                  }
    
                  if(!achei){
                      let extraBipado = new Array();

                      contagemTotal += rowsBip[index][posQuantidadeBipada];
                      extraBipado[posCodBarraClient] = rowsBip[index][posCodBarraBIP];
                      extraBipado[posContabilizado] = rowsBip[index][posQuantidadeBipada];
                      extraBipado[posContabilizado -1] = 0;

                      extraBipado[posDiferenca] = rowsBip[index][posQuantidadeBipada];
                      bipExtra.push(extraBipado);
                  }
              }

          }

          rowsClient.push(...bipExtra);

          rowsClient[1][posSumarioTotalFinal] = contagemTotal;
          rowsClient[0][posSumarioTotalFinal] = 'Quantidade Total Bipada';
          rowsClient[1][posSumarioDiferencaFinal] = diferencaTotal;
          rowsClient[0][posSumarioDiferencaFinal] = 'Diferença Total';

          workbook = XLSX.utils.book_new();
          workbook.Props = {
              Title: "Resultado Inventário",
              Subject: "BIP",
              Author: "BIP",
              CreatedDate: new Date()
          };

          workbook.SheetNames.push("Averiguacao");
          //workbook.Sheets["Averiguacao"] = XLSX.utils.aoa_to_sheet(rowsClient);

          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rowsClient);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Averiguacao');
      
          XLSX.writeFile(wb, 'bip_export_' + new  Date().getTime() + '.xlsx');

          this.spinner.hide();
          this.toastr.success('Se arquivo está sendo baixado.', 'Sucesso');
        }
      }

    } catch (error) {
      this.spinner.hide();
      this.toastr.error('Ocorreu um erro no processo, entre em contato com o administrador.', 'Atenção');
      console.log(error);
    }

  }
  
  
}
