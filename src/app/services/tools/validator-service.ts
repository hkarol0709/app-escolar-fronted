import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {

  //Validación para campos requeridos, no nulos y no vacíos
  required(input: any) {
    return (input !== undefined && input !== null && input !== "" && input.toString().trim().length > 0);
  }

  //Validación para campos numéricos en un rango de valores
  max(input: any, size: any) {
    return (input.length <= size);
  }

  min(input: any, size: any) {
    return (input.length >= size);
  }

  //Validación para el email con formato correcto
  email(input: any) {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Boolean(input && input.match(regEx));
  }

  //Validación para fechas con formato correcto
  date(input: any) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!input.match(regEx)) return false;
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return false;
    return d.toISOString().slice(0, 10) === input;
  }

  //Validación para campos numéricos en un rango de valores
  between(input: any, min: any, max: any) {
    return (input >= min && input <= max);
  }

  //Validación para campos numéricos
  numeric(input: any) {
    return (!isNaN(parseFloat(input)) && isFinite(input));
  }

  //Validación para campos numéricos con decimales
  maxDecimals(input: any, size: any) {
    let decimals = 0;

    if (Math.floor(input) !== input && input.toString().split(".")[1]) {
      decimals = input.toString().split(".")[1].length;
    }

    return (decimals <= size);
  }

  minDecimals(input: any, size: any) {
    let decimals = 0;

    if (Math.floor(input) !== input && input.toString().split(".")[1]) {
      decimals = input.toString().split(".")[1].length;
    }

    return (decimals >= size);
  }

  //Validación para campos de fecha en un rango de fechas establecidas
  dateBetween(input: any, min: any, max: any) {
    input = new Date(input).getTime();
    min = new Date(min).getTime();
    max = new Date(max).getTime();

    return (max >= input && input >= min);
  }

  //Validación para campos de texto con letras y espacios
  words(input: any) {
    const pat = new RegExp('^([A-Za-zÑñáéíóúÁÉÍÓÚ ]+)$');
    return pat.test(input);
  }




}
