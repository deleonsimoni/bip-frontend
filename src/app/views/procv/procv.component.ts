import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../services/util.service';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { InventaryService } from '../../services/inventary.service';
import { UserService } from '../../services/user.service';

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
    private fb: FormBuilder,
    private clientService: ClientService,
    private inventaryService: InventaryService,
    private userService: UserService,
  ) { }

  acabou = false;

  clients = [];
  employees = [];
  selectedEmployees = [];
  inventaryForm: FormGroup;
  itensClient = [];
  itensBip = [];

  //dados planilha resultado
  posCodBarraBIP;
  posQuantidadeBipada;
  posSecaoBIP;
  posMaquinaBIP;
  posCodBarraBIPNumber;
  posQuantidadeBipadaNumber;
  posSecaoBIPNumber;
  posMaquinaBIPNumber;

  //dados planilha cliente
  posCodBarraClient;
  posQuantidadeClient;
  posDescricaoClient;
  posNumeroClient;
  posPriceClient;
  posCorClient;
  posCodBarraClientNumber;
  posQuantidadeClientNumber;
  posDescricaoClientNumber;
  posNumeroClientNumber;
  posPriceClientNumber;
  posCorClientNumber;

  ngOnInit(): void {

    this.inventaryForm = this.fb.group({
      description: ['',],
      startDate: [''],
      endDate:[''],
      employees: this.fb.array([]),
      client: [null],
      fileClient: [null],
      fileBip: [null],
    });

    this.listClients();
    this.listEmployees();

  }

  toggleDisabled() {
    const car: any = this.employees[1];
    car.disabled = !car.disabled;
  }

  processarExcel(){
    this.spinner.show();
    let fileCliente = (<HTMLInputElement>document.getElementById('excelCliente')).files[0];
    let fileBip = (<HTMLInputElement>document.getElementById('excelBipado')).files[0];
    let fileReaderClient = new FileReader();
    let fileReaderBip = new FileReader();
    let arrayBuffer;

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

      if(!this.posCodBarraBIP){
        this.spinner.hide();
        this.toastr.warning('Selecione corretamento a coluna do codigo de barras do arquivo bipado.', 'Atenção');
        return;
      }

      if(!this.posQuantidadeBipada){
        this.spinner.hide();
        this.toastr.warning('Selecione corretamento a coluna de quantidade do arquivo bipado.', 'Atenção');
        return;
      }

      if(!this.posCodBarraClient){
        this.spinner.hide();
        this.toastr.warning('Selecione corretamento a coluna do codigo de barras do arquivo do cliente.', 'Atenção');
        return;
      }

      if(!this.posQuantidadeClient){
        this.spinner.hide();
        this.toastr.warning('Selecione corretamento a coluna de quantidade do arquivo do cliente.', 'Atenção');
        return;
      }


      this.posCodBarraBIPNumber = this.posCodBarraBIP ? this.text2Number(this.posCodBarraBIP) : null;
      this.posQuantidadeBipadaNumber = this.posQuantidadeBipada ? this.text2Number(this.posQuantidadeBipada) : null;
      this.posSecaoBIPNumber  = this.posSecaoBIP      ? this.text2Number(this.posSecaoBIP) : null;
      this.posMaquinaBIPNumber = this.posMaquinaBIP      ? this.text2Number(this.posMaquinaBIP) : null;

      this.posCodBarraClientNumber = this.posCodBarraClient  ? this.text2Number(this.posCodBarraClient) : null;
      this.posQuantidadeClientNumber = this.posQuantidadeClient? this.text2Number(this.posQuantidadeClient) : null;
      this.posDescricaoClientNumber = this.posDescricaoClient ? this.text2Number(this.posDescricaoClient) : null;
      this.posNumeroClientNumber = this.posNumeroClient    ? this.text2Number(this.posNumeroClient) : null;
      this.posPriceClientNumber = this.posPriceClient     ? this.text2Number(this.posPriceClient) : null;
      this.posCorClientNumber = this.posCorClient      ? this.text2Number(this.posCorClient) : null;

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

          for (let index = 0; index < rowsClient.length; index++) {

            if(index == 0){
                continue;
            } else {
              this.itensClient.push({
                "refer": rowsClient[index][this.posCodBarraClientNumber] ? rowsClient[index][this.posCodBarraClientNumber].replace(/\s+/g,"") : null,
                "quantity": rowsClient[index][this.posQuantidadeClientNumber],
                "description": this.posDescricaoClientNumber != null ? rowsClient[index][this.posDescricaoClientNumber] : null,
                "internalCode": this.posNumeroClientNumber != null ? rowsClient[index][this.posNumeroClientNumber] : null,
                "price": this.posPriceClientNumber != null ? rowsClient[index][this.posPriceClientNumber] : null,
                "details": this.posCorClientNumber != null ? rowsClient[index][this.posCorClientNumber] : null
              })
            }
          }

          fileReaderBip.readAsArrayBuffer(fileBip);
          fileReaderBip.onload = (e) => {
              arrayBuffer = fileReaderBip.result;
              var data = new Uint8Array(arrayBuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[0];
              var worksheet = workbook.Sheets[first_sheet_name];
    
              let rowsBip = XLSX.utils.sheet_to_json(worksheet, {
                raw: true, // Use raw values (true) or formatted strings (false)
                header: 1, // Generate an array of arrays ("2D Array")
              });
    
              for (let index = 0; index < rowsBip.length; index++) {
    
                if(index == 0){
                    continue;
                } else {
                  this.itensBip.push({
                    "refer": rowsBip[index][this.posCodBarraBIPNumber],
                    "section": this.posSecaoBIPNumber != null ? rowsBip[index][this.posSecaoBIPNumber] : null,
                    "quantity": rowsBip[index][this.posQuantidadeBipadaNumber],
                    "device": this.posMaquinaBIPNumber != null ? rowsBip[index][this.posMaquinaBIPNumber] : null
                  })
                }
              }

              //Terminou de rodar os dois arquivos

              let payload = this.inventaryForm.value;
              payload.employees = this.selectedEmployees;
              payload.itensClient = this.itensClient;
              payload.itensBip = this.itensBip;

              this.inventaryService.createInventaryExcel(payload)
                .subscribe((data) => {
                  this.spinner.hide();

                  if(!data.errors){
                    this.toastr.success('Inventário processado com sucesso.', 'Sucesso');
                   // this.router.navigate(['/user/list']);  
                  } else {
                    this.toastr.error('Erro ao processar o inventário', 'Atenção');
                  }
                }, err => {
                  this.spinner.hide();

                  this.toastr.error('Problema ao processar inventário. ', 'Erro: ');

                });

          }



      }

      




      

    } catch (error) {
      this.spinner.hide();
      this.toastr.error('Ocorreu um erro no processo, entre em contato com o administrador.', 'Atenção');
      console.log(error);
    }

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

  textOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return true;
    }
    return false;

  }

  text2Number(value){
   return (value.toUpperCase().charCodeAt(0) - 65)
  }

  listClients(){
    this.clientService.getAll() 
    .subscribe((data) => {

    this.spinner.hide();
    this.clients = data;
    
    }, err => {
      this.spinner.hide();
      this.toastr.error('Problema ao listar clientes.' + err.error.message, 'Erro: ');
    });
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
