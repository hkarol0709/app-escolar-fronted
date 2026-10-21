import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

@Component({
  selector: 'app-registro-usuarios-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-usuarios-screen.html',
  styleUrl: './registro-usuarios-screen.scss',
})
export class RegistroUsuariosScreen implements OnInit {
  // Declarar variables globales que se utilizarán en el componente
  public editar: boolean = false;
  // JSON para almacenar los datos del usuario que se está registrando o editando
  public user: any = {};

  constructor() {}

  ngOnInit(): void {}

  public goBack(){

  }

  public radioChange(event: any) {

  }

}
