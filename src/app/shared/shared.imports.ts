// Módulos para formularios y directivas de Angular que se importan en los componentes standalone de la aplicación.
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
/* =========================
   Router
   ========================= */
import { RouterModule } from '@angular/router';

// Elementos de angular Material que se importan en los componentes standalone de la aplicación.

import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

/* =========================
   ngx-mask (inputs de código)
   ========================= */
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

/**
 * SHARED_IMPORTS
 * ---------------------------------------------------------
 * Colección de módulos/directivas reutilizables en
 * componentes standalone.
 *
 * Se importa así:
 * imports: [...SHARED_IMPORTS, HeaderApp, FooterApp]
 */
export const SHARED_IMPORTS = [
  /* Angular */
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgOptimizedImage,
  /* Angular Material */
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  /* ngx-mask */
  NgxMaskDirective,
  NgxMaskPipe
];
