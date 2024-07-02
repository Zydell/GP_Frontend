import { Component } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';
import { EjecutarScript } from './../../../Herramientas/EjecutarScript';

@Component({
  selector: 'app-pg-login',
  templateUrl: './pg-login.component.html',
  styleUrls: ['./pg-login.component.css']
})
/*
export class PgLoginComponent {
}*/
export class PgLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private js:EjecutarScript) {}

  ngOnInit() {
   
    this.js.CargarScriptLogin();
  }
 
  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      () => this.router.navigate(['/protected']),
      err => console.error(err)
    );
  }
}
