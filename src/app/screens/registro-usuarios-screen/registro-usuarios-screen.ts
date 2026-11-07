import { Component, inject, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { AuthService } from '../../services/auth-service';
import { Location } from '@angular/common';
import { RegistroAdmin } from '../../partials/registro-admin/registro-admin';
import { RegistroAlumnos } from '../../partials/registro-alumnos/registro-alumnos';
import { RegistroMaestros } from '../../partials/registro-maestros/registro-maestros';

@Component({
  selector: 'app-registro-usuarios-screen',
  imports: [
    ...SHARED_IMPORTS,
    RegistroAdmin,
    RegistroAlumnos,
    RegistroMaestros
  ],
  templateUrl: './registro-usuarios-screen.html',
  styleUrl: './registro-usuarios-screen.scss',
})
export class RegistroUsuariosScreen implements OnInit {
  //Realizamos la inyección de dependencias para los servicios que se utilizarán en el componente
  // Inyectamos el servicio de autenticación para manejar la sesión del usuario
  public authService: AuthService = inject(AuthService);
  private location = inject(Location)

  // Declarar variables globales que se utilizarán en el componente
  public editar: boolean = false;
  // JSON para almacenar los datos del usuario que se está registrando o editando
  public user: any = {};


  //Banderas para el tipo de usuario
  public isAdmin:boolean = false;
  public isAlumno:boolean = false;
  public isMaestro:boolean = false;

  public tipo_user:string = "";
  public tipo:string = "registro-usuarios";
  public rol:string = "";

  constructor() {}

  ngOnInit(): void {}

  public goBack(){
    this.location.back();
  }

  public radioChange(event: any) {
    if(event.value === "administrador"){
      this.isAdmin = true;
      this.isAlumno = false;
      this.isMaestro = false;
      this.tipo_user = "administrador";
    }else if (event.value === "alumno"){
      this.isAdmin = false;
      this.isAlumno = true;
      this.isMaestro = false;
      this.tipo_user = "alumno";
    }else if (event.value === "maestro"){
      this.isAdmin = false;
      this.isAlumno = false;
      this.isMaestro = true;
      this.tipo_user = "maestro";
    }
  }

}
