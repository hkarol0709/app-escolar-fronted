import { Component, inject, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from 'express';

@Component({
  selector: 'app-login-screen',
  imports: [...SHARED_IMPORTS],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen implements OnInit {
  //Se definen las variables globales que se utilizarán en el componente
  public username: string = '';
  public password: string = '';
  public load: boolean = false;
  public errors: any = {};

  // Tipo de campo para la contraseña
  public typeInput: 'password' | 'text' = 'password';

  constructor() {}

  ngOnInit(): void {}

  public login() {}

  // Función para mostrar y ocultar la contraseña
  showPassword(): void {
    this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
  }

  public registrar() {}

  public olvideContrasena() {}
}
