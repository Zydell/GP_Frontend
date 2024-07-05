import { Component } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { EjecutarScript } from './../../../Herramientas/EjecutarScript';

@Component({
  selector: 'app-pg-login',
  templateUrl: './pg-login.component.html',
  styleUrls: ['./pg-login.component.css',
    //'../../../assets/styles/layout.css'
   ]
})

export class PgLoginComponent {
  email: string = '';
  password: string = '';
  messages1: Message[] = [];

  constructor(private authService: AuthService, private router: Router, private js:EjecutarScript) {}

  ngOnInit() {
    this.js.CargarScriptLogin();
    this.addFormValidation();
  }

  addFormValidation() {
    document.addEventListener('DOMContentLoaded', function() {
      var forms = document.querySelectorAll('.needs-validation');
      
      Array.prototype.slice.call(forms)
        .forEach(function(form) {
          form.addEventListener('submit', function(event: Event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
    
            form.classList.add('was-validated');
          }, false);
        });
    });
  }
 
  login(form: NgForm) {
    if (form.valid) {
      this.authService.login({ correo_electronico: this.email, contrasena: this.password }).subscribe(
        () => this.router.navigate(['/user-menu']),
        err => {
          console.error(err);
          this.messages1 = [{severity:'error', summary:'Error', detail:'Usuario o contraseña incorrectos'}];
        }
      );
    }else {
      this.messages1 = [];
    }
  }
}
