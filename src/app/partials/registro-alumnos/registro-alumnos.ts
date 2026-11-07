import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-alumnos',
  imports: [],
  templateUrl: './registro-alumnos.html',
  styleUrl: './registro-alumnos.scss',
})
export class RegistroAlumnos implements OnInit {

  @Input() rol: string = '';
  @Input() datos_user: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
