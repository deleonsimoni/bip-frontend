import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from '../../services/util.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-left-pad',
  templateUrl: './left-pad.component.html',
  styleUrls: ['./left-pad.component.scss']
})
export class LeftPadComponent implements OnInit {

  constructor(
    private utilService: UtilService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  codigos;
  tamanho;
  resultado = '';
  processouCodText = false;

  ngOnInit(): void {

  }

  processar(){
    this.spinner.show();
    this.utilService.delay(3);


    if(!this.tamanho){
      this.toastr.warning("Preenche o campo tamanho", "Atenção");
      this.spinner.hide();
      return;
    }

    if(this.codigos && this.codigos.length > 0){

      let lines = this.codigos.split('\n');
      for(var i = 0;i < lines.length;i++){
        this.resultado += this.utilService.pad(lines[i].trim(), this.tamanho) + "\n";
      }

      this.processouCodText = true;

    } else {
      
      let fileCliente = (<HTMLInputElement>document.getElementById('leftpadFile')).files[0];

      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        let lines = fileReader.result.toString().split('\n');
        for(var i = 0;i < lines.length;i++){
          this.resultado += this.utilService.pad(lines[i].trim(), this.tamanho) + "\n";
        }
      }
      fileReader.readAsText(fileCliente);

      var blob = new Blob([this.resultado], {type: "text/csv;charset=utf-8"});
      saveAs(blob, "bip_export_"+ new  Date().getTime() + ".txt");

    }
    this.spinner.hide();

    this.codigos = '';
    this.tamanho = '';
    

  }
}
