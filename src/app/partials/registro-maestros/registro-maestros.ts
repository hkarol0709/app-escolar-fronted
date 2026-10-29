import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-maestros',
  imports: [],
  templateUrl: './registro-maestros.html',
  styleUrl: './registro-maestros.scss',
})
export class RegistroMaestros implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
