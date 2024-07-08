import { Component, AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';
import { EjecutarScript } from './../../../Herramientas/EjecutarScript';
import { Message } from 'primeng/api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pg-register',
  templateUrl: './pg-register.component.html',
  styleUrls: ['./pg-register.component.css'
   ]
})

export class PgRegisterComponent {
  @ViewChild('ciudadanoform') ciudadanoform!: NgForm;
  @ViewChild('negocioform') negocioform!: NgForm;
  telefono:  string = '';
  fechaNacimiento: Date = new Date();
  lastname: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  tipo: string = '';
  propietario: string = '';
  t_negocio: string = '';
  direccion: string = '';
  messages1: Message[] = [];
  uploadedFiles: any[] = [];
  // Otros campos si es necesario

  constructor(private authService: AuthService, private router: Router, private js:EjecutarScript) {}

  ngOnInit() {
    this.js.CargarScriptLogin();
    this.addFormValidation();
  }

  onUpload(event: any): void {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles);
  }

  addFormValidation() { 
    setTimeout(() => {
      const forms = document.querySelectorAll('.needs-validation');
      Array.prototype.slice.call(forms).forEach(function (form: HTMLFormElement) {
        form.addEventListener('submit', function (event: Event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    });
  }
    
  register(form: NgForm) {
    if (form.valid) {
      this.messages1 = [{severity:'error', summary:'Error', detail:'Form valido'}];
      if (this.tipo === 'ciudadano') {
        this.authService.registerCiudadano({ fecha_nac: this.fechaNacimiento, telefono: this.telefono, apellido: this.lastname, nombre: this.name, correo_electronico: this.email, contrasena: this.password }).subscribe(
          //response => console.log('Ciudadano registrado correctamente!', response),
          () => this.router.navigate(['/user-menu']),
          err => {
            console.error(err);
            this.messages1 = [{severity:'error', summary:'Error', detail:err.error.message}];
          }
        );
      } else if (this.tipo === 'negocio') {

        const formData = new FormData();
        formData.append('email', this.email);
        formData.append('password', this.password);

        if (this.uploadedFiles.length > 0) {
          formData.append('image', this.uploadedFiles[0], this.uploadedFiles[0].name);
        }

        this.authService.registerNegocio(formData).subscribe(
          response => console.log('Negocio registrado correctamente!', response),
          err => console.error(err)
        );
      }
    }else{
      //this.messages1 = [{severity:'error', summary:'Error', detail:'Form invalido'}];
    }
  }

}
