import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
//Dependencia para el HTTP Client, que nos permite hacer peticiones HTTP a un servidor
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
//Agregamos el masking para los inputs de los formularios
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    // Esta es la nueva forma de injectar el mask para que no le de errores
    // al momento de crear los formularios
    provideNgxMask(),
  ]
};
