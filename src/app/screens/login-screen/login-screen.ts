import { Component, inject, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Router } from 'express';

@Component({
  selector: 'app-login-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen implements OnInit {

  //Se definen las variables globales que se utilizarán en el componente
  public username: string = '';
  public password: string = '';
  public load: boolean = false;
  public errors: any = {};
  public typeInput: string = "password";

  constructor() { }

  ngOnInit(): void {

  }

  public login() {

  }

  public showPassword() {

  }

  public registrar(){

  }

  public olvideContrasena(){

  }

}
