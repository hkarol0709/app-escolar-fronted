import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { ErrorsService } from './tools/errors-service';
import { ValidatorService } from './tools/validator-service';
import { DatosAlumno } from '../interfaces/usuarios.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private validatorService = inject(ValidatorService);
  private errorService = inject(ErrorsService);

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getSessionToken();
    return token
      ? new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  public esquemaAlumno(): DatosAlumno {
    return {
      rol: '',
      matricula: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      fecha_nacimiento: '',
      edad: 0,
      curp: '',
      rfc: '',
      telefono: '',
      ocupacion: ''
    };
  }

  public validarAlumno(data: DatosAlumno, editar: boolean) {
    const error: any = {};

    const regexLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
    const regexCurp = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\d$/;
    const regexRfc = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;

    if (!this.validatorService.required(data["matricula"])) {
      error["matricula"] = this.errorService.required;
    } else if (!this.validatorService.numeric(data["matricula"])) {
      error["matricula"] = "El formato es solo números";
    }

    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    } else if (!regexLetras.test(String(data["first_name"]).trim())) {
      error["first_name"] = "El nombre solo admite letras y espacios";
    }

    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    } else if (!regexLetras.test(String(data["last_name"]).trim())) {
      error["last_name"] = "Los apellidos solo admiten letras y espacios";
    }

    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      } else if (!/[A-Z]/.test(data["password"]) || !/[a-z]/.test(data["password"]) || !/\d/.test(data["password"]) || !/[^A-Za-z0-9]/.test(data["password"])) {
        error["password"] = "La contraseña debe incluir mayúscula, minúscula, número y carácter especial";
      }

      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      } else if (data["confirmar_password"] !== data["password"]) {
        error["confirmar_password"] = "Las contraseñas no coinciden";
      }
    }

    // Validación estricta de mayoría de edad por años, meses y días exactos
    if (!this.validatorService.required(data["fecha_nacimiento"])) {
      error["fecha_nacimiento"] = this.errorService.required;
    } else {
      const fechaNac = new Date(data["fecha_nacimiento"]);
      const hoy = new Date();

      if (isNaN(fechaNac.getTime())) {
        error["fecha_nacimiento"] = "La fecha de nacimiento no es válida";
      } else if (fechaNac > hoy) {
        error["fecha_nacimiento"] = "La fecha de nacimiento no puede ser futura";
      } else if (fechaNac.getFullYear() < 1950) {
        error["fecha_nacimiento"] = "El año mínimo permitido es 1950";
      } else {
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mesActual = hoy.getMonth();
        const mesNac = fechaNac.getMonth();

        // Si no ha llegado su mes de cumpleaños, o es su mes pero no ha llegado el día, resta 1 año
        if (mesActual < mesNac || (mesActual === mesNac && hoy.getDate() < fechaNac.getDate())) {
          edad--;
        }

        if (edad < 18) {
          error["fecha_nacimiento"] = "Debes ser mayor de 18 años";
        }
      }
    }

    if (!this.validatorService.required(data["edad"])) {
      error["edad"] = this.errorService.required;
    } else if (!this.validatorService.numeric(data["edad"])) {
      error["edad"] = "El formato es solo números";
    } else if (data["edad"] < 18) {
      error["edad"] = "La edad debe ser mayor o igual a 18";
    } else if (data["edad"] > 99) {
      error["edad"] = "La edad debe ser menor o igual a 99";
    }

    if (!this.validatorService.required(data["curp"])) {
      error["curp"] = this.errorService.required;
    } else if (!regexCurp.test(String(data["curp"]).trim().toUpperCase())) {
      error["curp"] = "La CURP no tiene un formato válido";
    }

    if (!this.validatorService.required(data["rfc"])) {
      error["rfc"] = this.errorService.required;
    } else if (!regexRfc.test(String(data["rfc"]).trim().toUpperCase())) {
      error["rfc"] = "El RFC no tiene un formato válido";
    }

    if (!this.validatorService.required(data["telefono"])) {
      error["telefono"] = this.errorService.required;
    } else if (String(data["telefono"]).replace(/\D/g, '').length !== 10) {
      error["telefono"] = "El teléfono debe tener 10 dígitos";
    }

    if (!this.validatorService.required(data["ocupacion"])) {
      error["ocupacion"] = this.errorService.required;
    }

    return error;
  }
}
