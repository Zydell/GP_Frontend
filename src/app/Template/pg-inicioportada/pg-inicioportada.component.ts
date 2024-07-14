import { Component, OnInit } from '@angular/core';
import { EjecutarScript } from './../../../Herramientas/EjecutarScript';

@Component({
  selector: 'app-pg-inicioportada',
  templateUrl: './pg-inicioportada.component.html',
  styleUrls: ['./pg-inicioportada.component.css',
    "./../../../assets/vendor/bootstrap-icons/bootstrap-icons.css"]
})

export class PgInicioportadaComponent implements OnInit {
  constructor(private js:EjecutarScript) { }
  ngOnInit() {
   
    this.js.CargarScriptLogin();
  }
}
