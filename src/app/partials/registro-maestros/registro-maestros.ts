import { Component, inject, Input, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Location } from '@angular/common';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaestrosService, AREAS_INVESTIGACION, MATERIAS } from '../../services/maestros-service';
import { DatosMaestro } from '../../interfaces/usuarios.interfaces';

@Component({
  selector: 'app-registro-maestros',
  imports: [
    ...SHARED_IMPORTS,
    MatDatepickerModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' }
  ],
  templateUrl: './registro-maestros.html',
  styleUrl: './registro-maestros.scss',
})
export class RegistroMaestros implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: DatosMaestro = {} as DatosMaestro;

  private location = inject(Location);
  private maestrosService = inject(MaestrosService);

  public maestro: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public idUser: number = 0;

  public areas = AREAS_INVESTIGACION;
  public materias = MATERIAS;

  public fechaMax: Date = new Date(new Date().getFullYear() - 18, 12, 0);
  public fechaMin: Date = new Date(1950, 0, 1);

  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor() { }

  ngOnInit(): void {
    this.maestro = this.maestrosService.esquemaMaestro();
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
    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);

    if (Object.keys(this.errors).length > 0) {
      return;
    }
  }

  public actualizar() {
    this.errors = {};
    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);

    if (Object.keys(this.errors).length > 0) {
      return;
    }
  }

  public onFechaChange(fecha: Date | null): void {
    if (fecha) {
      this.maestro.fecha_nacimiento = fecha;
    }
  }

  public revisarSeleccion(materia: string): boolean {
    return this.maestro.materias_json && this.maestro.materias_json.includes(materia);
  }

  public checkboxChange(event: any, materia: string): void {
    if (!this.maestro.materias_json) {
      this.maestro.materias_json = [];
    }
    if (event.target.checked) {
      if (!this.maestro.materias_json.includes(materia)) {
        this.maestro.materias_json.push(materia);
      }
    } else {
      const index = this.maestro.materias_json.indexOf(materia);
      if (index > -1) {
        this.maestro.materias_json.splice(index, 1);
      }
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
