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

  static isValidCpfCnpj(control: AbstractControl): Validators {

    let cpfcnpj = control.value;
    console.log("isValidCpfCnpj!");

    if (cpfcnpj) {
      if (cpfcnpj.length == 11){
        if (cpfcnpj) {
          let numbers, digits, sum, i, result, equalDigits;
          equalDigits = 1;
          if (cpfcnpj.length < 11) {
            return null;
          }
  
          for (i = 0; i < cpfcnpj.length - 1; i++) {
            if (cpfcnpj.charAt(i) !== cpfcnpj.charAt(i + 1)) {
              equalDigits = 0;
              break;
            }
          }
  
          if (!equalDigits) {
            numbers = cpfcnpj.substring(0, 9);
            digits = cpfcnpj.substring(9);
            sum = 0;
            for (i = 10; i > 1; i--) {
              sum += numbers.charAt(10 - i) * i;
            }
  
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
            if (result !== Number(digits.charAt(0))) {
              return { cpfNotValid: true };
            }
            numbers = cpfcnpj.substring(0, 10);
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
      }
      else if (cpfcnpj.length == 14 ){
        if (cpfcnpj) {
          cpfcnpj = !cpfcnpj || cpfcnpj.replace(/\D/g, '');
          let cnpjsInvsRegex = /1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}|0{14}/;
      
          if (!cpfcnpj || cpfcnpj.length !== 14 || cnpjsInvsRegex.test(cpfcnpj)) {
              return { cnpjNotValid: true };
          }
                
          let tamanho = cpfcnpj.length - 2;
          let numeros = cpfcnpj.substring(0, tamanho);
          let digitos = cpfcnpj.substring(tamanho);
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
          numeros = cpfcnpj.substring(0, tamanho);
          soma = 0;
          pos = tamanho - 7;
          
          for (let i = tamanho; i >= 1; i--) {
              soma += numeros.charAt(tamanho - i) * pos--;
              if (pos < 2) {
                  pos = 9;
              }
          }
          
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          
          if (resultado != digitos.charAt(1)) {
             return { cpfNotValid: true };
          }
          else {
              return (resultado === parseInt(digitos.charAt(1), 10));
          }
        }
      }
    }
    return { cpfNotValid: false };
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