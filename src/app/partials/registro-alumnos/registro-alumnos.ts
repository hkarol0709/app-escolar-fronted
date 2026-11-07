import { Component, inject, Input, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Location } from '@angular/common';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AlumnosService } from '../../services/alumnos-service';
import { DatosAlumno } from '../../interfaces/usuarios.interfaces';

@Component({
  selector: 'app-registro-alumnos',
  imports: [
    ...SHARED_IMPORTS,
    MatDatepickerModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' }
  ],
  templateUrl: './registro-alumnos.html',
  styleUrl: './registro-alumnos.scss',
})
export class RegistroAlumnos implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: DatosAlumno = {} as DatosAlumno;

  private location = inject(Location);
  private alumnosService = inject(AlumnosService);

  public alumno: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public idUser: number = 0;

  public fechaMax: Date = new Date(new Date().getFullYear() - 18, 12, 0);
  public fechaMin: Date = new Date(1950, 0, 1);

  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor() { }

  ngOnInit(): void {
    this.alumno = this.alumnosService.esquemaAlumno();
  }

  public regresar(): void {
    this.location.back();
  }

  public showPassword(): void {
    if (this.inputType_1 === 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    } else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public showPwdConfirmar(): void {
    if (this.inputType_2 === 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    } else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public registrar() {
    this.errors = {};
    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar);

    if (Object.keys(this.errors).length > 0) {
      return;
    }
  }

  public actualizar() {
    this.errors = {};
    this.errors = this.alumnosService.validarAlumno(this.alumno, this.editar);

    if (Object.keys(this.errors).length > 0) {
      return;
    }
  }

  public onFechaChange(fecha: Date | null): void {
    if (fecha) {
      this.alumno.fecha_nacimiento = fecha;
    }
  }

  public soloLetras(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (
      !(charCode >= 65 && charCode <= 90) &&
      !(charCode >= 97 && charCode <= 122) &&
      charCode !== 32
    ) {
      event.preventDefault();
    }
  }
}
