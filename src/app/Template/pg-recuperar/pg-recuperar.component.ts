import { Component } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pg-recuperar',
  templateUrl: './pg-recuperar.component.html',
  styleUrls: ['./pg-recuperar.component.css'
   ]
})

export class PgRecuperarComponent {
  paso: number = 1;
  visibleNuevo: boolean=true;
  email: string = '';
  password: string = '';
  token: string = '';
  messages1: Message[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
  }

  ngOnInit() {
    this.addFormValidation();
  }

  ModalNuevoInformacion() {
    this.email="";
      this.visibleNuevo = true;
  }

  onSubmit() {
    this.http.post('http://localhost:5000/api/reset-password', { password: this.password, token: this.token, email: this.email })
      .subscribe(
        response => {
          console.log('Contraseña restablecida', response);
        },
        error => {
          console.error('Error al restablecer la contraseña', error);
        }
      );
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

  recuperar(form: NgForm) {
    if (form.valid) {
      this.authService.recuperar({ correo_electronico: this.email }).subscribe(
        response => {
          console.log("Correo enviado");
          this.ModalNuevoInformacion();
        },
        error => {
          console.error('Error al enviar el email de recuperación', error);
        }
      );
    } else {
      console.error("Formulario no válido");
    }
  }

}
