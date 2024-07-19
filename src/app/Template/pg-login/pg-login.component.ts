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
  remember: boolean = false;
  messages1: Message[] = [];
  messages2: Message[] = [];

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
        response => {
          try{
            const userType = response.user.tipousuario; // Assuming the response contains user type info
            if (userType === 1) { //Ciudadano
              this.router.navigate(['/user-menu']);
            } else if (userType === 2) { //Negocio
              this.router.navigate(['/user-negocio']);
            } else if (userType === 3) { //Administrador
              this.router.navigate(['/dashadmin/principaladmin']);
            } else {
              console.error('Unknown user type');
            }
          }
          catch{
            this.messages1 = [{severity: 'error', summary: 'Error', detail: 'Logueo inválido'}];
            this.autoCloseMessages('messages1');
          }
        },
        err => {
          console.error(err);
          this.messages1 = [{severity: 'error', summary: 'Error', detail: 'Logueo inválido'}];
          this.autoCloseMessages('messages1');
        }
      );
    } else {
      this.messages1 = [{severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos'}];
      this.autoCloseMessages('messages1');
    }
  }

  autoCloseMessages(messageType: 'messages1' | 'messages2') {
    setTimeout(() => {
      if (messageType === 'messages1') {
        this.messages1 = [];
      } else if (messageType === 'messages2') {
        this.messages2 = [];
      }
    }, 4000); // Tiempo en milisegundos (3000 ms = 3 segundos)
  }
}
