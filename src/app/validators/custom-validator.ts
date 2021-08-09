import { AbstractControl, Validators } from "@angular/forms";

export class CustomValidator {

  constructor() { }

  static isValidCnpj(control: AbstractControl): Validators {
    let cnpj = control.value;
    if (cnpj) {
      cnpj = !cnpj || cnpj.replace(/\D/g, '');
      let cnpjsInvsRegex = /1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}|0{14}/;
  
      if (!cnpj || cnpj.length !== 14 || cnpjsInvsRegex.test(cnpj)) {
          return { cnpjNotValid: true };
      }
            
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      
      for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) {
              pos = 9;
          }
      }
      
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado !== parseInt(digitos.charAt(0), 10)) {
          return { cnpjNotValid: true };
      }
            
      tamanho += 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      
      for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) {
              pos = 9;
          }
      }
      
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      
      return (resultado === parseInt(digitos.charAt(1), 10));
    }
    return null;
  }

  static isValidCpf(control: AbstractControl): Validators {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
          return null;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return null;
        } else {
          return { cpfNotValid: true };
        }
      }
      return null;
  }
}