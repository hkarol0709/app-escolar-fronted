import { Component, inject, Input, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { Location } from '@angular/common';
import { AdministradoresService } from '../../services/administradores-service';
//Importar la interfaz de datos del administrador
import { DatosAdministrador } from '../../interfaces/usuarios.interfaces';
import { NotificationService } from '../../services/tools/notification-service';

@Component({
  selector: 'app-registro-admin',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-admin.html',
  styleUrl: './registro-admin.scss',
})
export class RegistroAdmin implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: DatosAdministrador = {} as DatosAdministrador;

  //Inyectar el servicio Location para poder regresar a la página anterior
  private location = inject(Location);
  //Inyectar el servicio de administradores para poder registrar y actualizar los datos del administrador
  private administradoresService = inject(AdministradoresService);
  //Inyectar el servicio de notificaciones para mostrar mensajes al usuario
  private notificationService = inject(NotificationService);


  //Declarar las variables para el formulario de registro
  public admin: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public idUser: number = 0;

  //Variables para el campo de contraseña
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor() { }

  ngOnInit(): void {
    //Si el rol es administrador, se inicializa el objeto admin con los datos del usuario
    this.admin = this.administradoresService.esquemaAdmin();
    console.log('Datos del administrador:', this.admin);
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

  public registrar(){
    // Lógica para validar si el usuario administrador trae datos o no en los campos del formulario
    this.errors = {};
    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar);

    console.log('Errores de validación:', this.errors);

    // Si hay errores de validación, no se procede con el registro o actualización
    if (Object.keys(this.errors).length > 0) {
      return;
    }

    //Validar que las contraseñas coincidan
    if (this.admin.password !== this.admin.confirmar_password) {
      this.errors['confirmar_password'] = 'Las contraseñas no coinciden';
      this.notificationService.error('Las contraseñas no coinciden');
      this.admin.password = '';
      this.admin.confirmar_password = '';
      return;
    }

    //Lógica para registrar o actualizar los datos del administrador
    this.administradoresService.registrarAdmin(this.admin).subscribe(
      (response) => {
        //Dentro del response se puede obtener el mensaje de éxito o error del backend, así como los datos del administrador registrado
        console.log('Respuesta del backend:', response);
        this.notificationService.success('Administrador registrado correctamente');
        this.regresar();
      }, (error) => {
        console.error('Error al registrar el administrador:', error);
        this.notificationService.error('Error al registrar el administrador');
      }
    )
  }

  public actualizar(){

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
