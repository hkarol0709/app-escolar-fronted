import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private readonly defaultDuration = 4000;
  private readonly snackBar = inject(MatSnackBar);

  // Método privado para mostrar notificaciones con configuración personalizada
  private show(message: string, panelClass: string): void {
    const config: MatSnackBarConfig = {
      duration: this.defaultDuration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [panelClass],
    };

    this.snackBar.open(message, '✕', config);
  }

  // Método para mostrar notificaciones
  success(message: string): void {
    this.show(message, 'notif-success');
  }

  error(message: string): void {
    this.show(message, 'notif-error');
  }

  info(message: string): void {
    this.show(message, 'notif-info');
  }

}
