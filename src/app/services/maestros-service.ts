import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { ErrorsService } from './tools/errors-service';
import { ValidatorService } from './tools/validator-service';
import { DatosMaestro } from '../interfaces/usuarios.interfaces';

export const AREAS_INVESTIGACION: string[] = [
  'Desarrollo Web',
  'Programación',
  'Bases de datos',
  'Redes',
  'Matemáticas',
];

export const MATERIAS: string[] = [
  'Aplicaciones Web',
  'Programación 1',
  'Bases de datos',
  'Tecnologías Web',
  'Minería de datos',
  'Desarrollo móvil',
  'Estructuras de datos',
  'Administración de redes',
  'Ingeniería de Software',
  'Administración de S.O.',
];

@Injectable({
  providedIn: 'root',
})
export class MaestrosService {
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

  public esquemaMaestro(): DatosMaestro {
    return {
      rol: '',
      id_trabajador: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      fecha_nacimiento: '',
      telefono: '',
      rfc: '',
      cubiculo: '',
      area_investigacion: '',
      materias_json: []
    };
  }

  public validarMaestro(data: DatosMaestro, editar: boolean) {
    const error: any = {};

    const regexLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;
    const regexRfc = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;

    if (!this.validatorService.required(data["id_trabajador"])) {
      error["id_trabajador"] = this.errorService.required;
    } else if (!this.validatorService.numeric(data["id_trabajador"])) {
      error["id_trabajador"] = "El formato es solo números";
    } else if (!this.validatorService.max(data["id_trabajador"], 15)) {
      error["id_trabajador"] = this.errorService.max(15);
    }

    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    } else if (!regexLetras.test(String(data["first_name"]).trim())) {
      error["first_name"] = "El nombre solo admite letras y espacios";
    } else if (!this.validatorService.max(data["first_name"], 50)) {
      error["first_name"] = this.errorService.max(50);
    }

    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    } else if (!regexLetras.test(String(data["last_name"]).trim())) {
      error["last_name"] = "Los apellidos solo admiten letras y espacios";
    } else if (!this.validatorService.max(data["last_name"], 50)) {
      error["last_name"] = this.errorService.max(50);
    }

    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.max(data["email"], 40)) {
      error["email"] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      } else if (!this.validatorService.min(data["password"], 8)) {
        error["password"] = this.errorService.min(8);
      } else if (!this.validatorService.max(data["password"], 20)) {
        error["password"] = this.errorService.max(20);
      } else if (!/[A-Z]/.test(data["password"]) || !/[a-z]/.test(data["password"]) || !/\d/.test(data["password"]) || !/[^A-Za-z0-9]/.test(data["password"])) {
        error["password"] = "La contraseña debe incluir mayúscula, minúscula, número y carácter especial";
      }

      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      } else if (data["confirmar_password"] !== data["password"]) {
        error["confirmar_password"] = "Las contraseñas no coinciden";
      }
    }

    // Validación exacta de mayoría de edad y año mínimo 1950
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

        if (mesActual < mesNac || (mesActual === mesNac && hoy.getDate() < fechaNac.getDate())) {
          edad--;
        }

        if (edad < 18) {
          error["fecha_nacimiento"] = "Debes ser mayor de 18 años";
        }
      }
    }

    if (!this.validatorService.required(data["telefono"])) {
      error["telefono"] = this.errorService.required;
    } else if (String(data["telefono"]).replace(/\D/g, '').length !== 10) {
      error["telefono"] = "El teléfono debe tener 10 dígitos";
    }

    if (!this.validatorService.required(data["rfc"])) {
      error["rfc"] = this.errorService.required;
    } else if (!this.validatorService.min(data["rfc"], 12)) {
      error["rfc"] = this.errorService.min(12);
    } else if (!this.validatorService.max(data["rfc"], 13)) {
      error["rfc"] = this.errorService.max(13);
    } else if (!regexRfc.test(String(data["rfc"]).trim().toUpperCase())) {
      error["rfc"] = "El RFC no tiene un formato válido";
    }

    if (!this.validatorService.required(data["cubiculo"])) {
      error["cubiculo"] = this.errorService.required;
    } else if (!this.validatorService.max(data["cubiculo"], 20)) {
      error["cubiculo"] = this.errorService.max(20);
    }

    if (!this.validatorService.required(data["area_investigacion"])) {
      error["area_investigacion"] = this.errorService.required;
    }

    if (!data["materias_json"] || data["materias_json"].length == 0) {
      error["materias_json"] = "Debes seleccionar al menos una materia";
    }

    return error;
  }
}
