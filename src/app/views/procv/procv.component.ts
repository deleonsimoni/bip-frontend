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

  posicaoCodigoBarrasCliente
  constructor(
    protected router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private utilService: UtilService,
  ) { }

  acabou = false;
  
  //dados planilha resultado
  posCodBarraBIP;
  posQuantidadeBipada;

  //dados planilha cliente
  posCodBarraClient;
  posQuantidadeClient;

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
    let contagemTotalNovos = 0;
    let contagemTotalEncontrada = 0;
    let diferencaTotal = 0;
    this.acabou = false;

    const posContabilizado = 11;
    const posDiferenca = 12;

    const posSumarioDiferencaFinal = 14;
    const posSumarioTotalEncontrado = 15;
    const posSumarioTotalBipado = 16;
    const posSumarioTotalNovos = 17;


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

        if(!this.posCodBarraBIP || !this.posQuantidadeBipada || !this.posCodBarraClient || !this.posQuantidadeClient){
          this.spinner.hide();
          this.toastr.warning('Digite todos os campos para processar os arquivos.', 'Atenção');
          return;
        }

        this.posCodBarraBIP -= 1;
        this.posQuantidadeBipada -= 1;
        this.posCodBarraClient -= 1;
        this.posQuantidadeClient -= 1;

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

                      if(jotex == 0 || !rowsClient[index][this.posCodBarraClient]){
                          continue;
                      } else {
                          if(!rowsClient[index][this.posCodBarraClient]){
                            this.acabou = true;
                              break;
                          }
                          if(rowsBip[jotex][this.posCodBarraBIP].toString().trim() == rowsClient[index][this.posCodBarraClient].toString().trim() /* CASO TENHA CODIGO INTERNO || rowsBip[jotex][posCodBarraBIP] == rowsClient[index][0]*/){

                              contagemTotal += rowsBip[jotex][this.posQuantidadeBipada];
                              contabilizacaoRepetida += rowsBip[jotex][this.posQuantidadeBipada];
                              rowsClient[index][posContabilizado] = contabilizacaoRepetida;
                              if(rowsClient[index][this.posQuantidadeClient] >= 0){
                                  rowsClient[index][posDiferenca] = contabilizacaoRepetida - rowsClient[index][this.posQuantidadeClient];
                              } else {
                                  rowsClient[index][posDiferenca] = rowsClient[index][this.posQuantidadeClient] + contabilizacaoRepetida;
                              }

                              diferencaTotal += rowsClient[index][posDiferenca];
                              achei = true;

                              //break;
                          }
                      }
                  }

                  if(!achei){
                      rowsClient[index][posContabilizado] = 0;
                      rowsClient[index][posDiferenca] = rowsClient[index][this.posQuantidadeClient] * -1;
                      diferencaTotal += rowsClient[index][this.posQuantidadeClient];
                  }
              }

            }

            contagemTotalEncontrada = contagemTotal;
            //Procurando os bipados que nao estao na tabela do cliente
            let bipExtra = new Array();
            for (let index = 0; index < rowsBip.length; index++) {


              if(index == 0){
                  continue;
              } else {

                  let achei = false;

                  for (let jotex = 0; jotex < rowsClient.length; jotex++) {

                      if(jotex == 0 || !rowsClient[jotex][this.posCodBarraClient]){
                          continue;
                      } else {

                          if(rowsBip[index][this.posCodBarraBIP].toString().trim() == rowsClient[jotex][this.posCodBarraClient].toString().trim() /* CASO TENHA CODIGO INTERNO || rowsBip[jotex][posCodBarraBIP] == rowsClient[index][0]*/){
                              achei = true;
                              break;
                          }
                      }
                  }

                  if(!achei){
                      let extraBipado = new Array();

                      contagemTotal += rowsBip[index][this.posQuantidadeBipada];
                      contagemTotalNovos += rowsBip[index][this.posQuantidadeBipada];
                      extraBipado[this.posCodBarraClient] = rowsBip[index][this.posCodBarraBIP];
                      extraBipado[posContabilizado] = rowsBip[index][this.posQuantidadeBipada];
                      extraBipado[posContabilizado -1] = 0;

                      extraBipado[posDiferenca] = rowsBip[index][this.posQuantidadeBipada];
                      bipExtra.push(extraBipado);
                  }
              }

          }

          rowsClient.push(...bipExtra);

          rowsClient[1][posSumarioTotalBipado] = contagemTotal - 1;
          rowsClient[0][posSumarioTotalBipado] = 'Quantidade Total de Produtos Bipada';

          rowsClient[1][posSumarioTotalEncontrado] = contagemTotalEncontrada;
          rowsClient[0][posSumarioTotalEncontrado] = 'Quantidade Total de Produtos Conferidos';

          rowsClient[1][posSumarioTotalNovos] = contagemTotalNovos;
          rowsClient[0][posSumarioTotalNovos] = 'Quantidade Total de Produtos Bipados e Não Estavam na Tabela do Cliente';

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
