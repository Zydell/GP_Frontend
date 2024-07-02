import { Component } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { EjecutarScript } from './../../../Herramientas/EjecutarScript';

@Component({
  selector: 'app-pg-register',
  templateUrl: './pg-register.component.html',
  styleUrls: ['./pg-register.component.css']
})
/*
export class PgRegisterComponent {
}*/
export class PgRegisterComponent {
  email: string = '';
  password: string = '';
  // Otros campos si es necesario

  constructor(private authService: AuthService, private js:EjecutarScript) {}

  ngOnInit() {
   
    this.js.CargarScriptLogin();
  }

  register() {
    this.authService.register({ email: this.email, password: this.password }).subscribe(
      response => console.log('User registered successfully!', response),
      err => console.error(err)
    );
  }
}
