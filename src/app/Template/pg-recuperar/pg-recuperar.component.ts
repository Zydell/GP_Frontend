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
  visibleNuevo: boolean=false;
  email: string = '';
  //email: string = 'cristhiantotoymorales@gmail.com';
  password: string = '';
  token: string = '';
  messages1: Message[] = [];
  messages2: Message[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    //this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    //this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
  }

  ngOnInit() {
    this.addFormValidation();
  }

  ModalNuevoInformacion() {
    //this.email="";
      this.visibleNuevo = true;
  }

  autoCloseMessages(messageType: 'messages1' | 'messages2') {
    setTimeout(() => {
      if (messageType === 'messages1') {
        this.messages1 = [];
      } else if (messageType === 'messages2') {
        this.messages2 = [];
      }
    }, 3000); // Tiempo en milisegundos (5000 ms = 5 segundos)
  }

  validateToken() {
    console.log("Verificar el correo y token: "+ this.email+" - "+this.token)
    this.http.post('http://localhost:5000/api/validate-token', { token: this.token, correo_electronico: this.email })
      .subscribe(
        response => {
          console.log('Código válido', response);
          this.messages2 = [{severity:'success', summary:'Éxito', detail:"Código válido"}];
          this.autoCloseMessages('messages2');
          this.paso = 2; // Cambia al paso 2 si el código es válido
        },
        error => {
          console.error('Código inválido', error);
          this.messages1 = [{severity:'error', summary:'Error', detail:"Código inválido"}];
          this.autoCloseMessages('messages1');
        }
      );
  }

  changePassword(form: NgForm) {
    if (form.valid) {
      this.http.post('http://localhost:5000/api/reset-password', { password: this.password, token: this.token, correo_electronico: this.email })
        .subscribe(
            () => {
              this.messages2 = [{severity:'success', summary:'Éxito', detail:'Contraseña restablecida'}];
              this.autoCloseMessages('messages2');
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1000)  ; // Redirecciona después de 2 segundos 
            },
          error => {
            console.error('Error al restablecer la contraseña', error);
            this.messages1 = [{severity:'error', summary:'Error', detail:"Error al restablecer la contraseña"}];
            this.autoCloseMessages('messages1');
          }
        );
    } else {
      console.error("Contraseña no válida");
      this.messages1 = [{severity:'error', summary:'Error', detail:"Contraseña no válida"}];
      this.autoCloseMessages('messages1');
    }
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
      this.authService.recuperar(this.email).subscribe(
        response => {
          console.log("Correo enviado");
          this.messages2 = [{severity:'success', summary:'Éxito', detail:"Correo enviado"}];
          this.autoCloseMessages('messages2');
          this.ModalNuevoInformacion();
        },
        error => {
          console.error('Error al enviar el email de recuperación', error);
          this.messages1 = [{severity:'error', summary:'Error', detail:"Error al enviar el email de recuperación"}];
          this.autoCloseMessages('messages1');
        }
      );
    } else {
      console.error("Formulario no válido");
    }
  }

}
