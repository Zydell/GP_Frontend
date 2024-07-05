import { Component } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { EjecutarScript } from './../../../Herramientas/EjecutarScript';

@Component({
  selector: 'app-pg-register',
  templateUrl: './pg-register.component.html',
  styleUrls: ['./pg-register.component.css'
   ]
})

export class PgRegisterComponent {
  email: string = '';
  password: string = '';
  // Otros campos si es necesario

  constructor(private authService: AuthService, private js:EjecutarScript) {}

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
  

  register() {
    this.authService.register({ email: this.email, password: this.password }).subscribe(
      response => console.log('Usuario registrado correctamente!', response),
      err => console.error(err)
    );
  }
}
