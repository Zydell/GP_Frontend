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
  fechaCreacion: Date = new Date();
  term_condiciones: boolean=false;
  //private _fechaCreacion: Date = new Date();
  maxDate: string = '';
  lastname: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  tipo: string = '';
  propietario: string = '';
  t_negocio: string = '';
  direccion: string = '';
  messages1: Message[] = [];
  messages2: Message[] = [];
  uploadedFiles: any[] = [];
  errorMessage: string = '';
  imageBase64: string | null = null;
  termsAccepted: boolean = false;
  // Otros campos si es necesario

  constructor(private authService: AuthService, private router: Router, private js:EjecutarScript) {}

  ngOnInit() {
    this.js.CargarScriptLogin();
    this.addFormValidation();
    // Establece la fecha máxima permitida a la fecha actual
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  onUpload(event: any): void {
    this.uploadedFiles = event.files;
    console.log("XDXDXD "+ this.uploadedFiles);
  }

  ModalTerminosCondiciones(event: Event) {
    event.preventDefault();
    this.term_condiciones = true;
  }

    addFormValidation() {
      setTimeout(() => {
        const forms = document.querySelectorAll('.needs-validation');
        Array.prototype.slice.call(forms).forEach((form: HTMLFormElement) => {
          form.addEventListener('submit', (event: Event) => {
            if (this.tipo === 'ciudadano'){
              if (!form.checkValidity() || !this.termsAccepted) {
                event.preventDefault();
                event.stopPropagation();
                //if (!this.termsAccepted) {
                //  this.messages1.push({severity:'error', summary:'Error', detail:'Debes aceptar los términos y condiciones'});
                //}
              }
            }else{
              if (!form.checkValidity() || this.uploadedFiles.length == 0 || !this.termsAccepted) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
            form.classList.add('was-validated');
          }, false);
        });
      });
    }
    
  register(form: NgForm) {
    if (this.tipo === 'ciudadano') {
      if (form.valid && this.termsAccepted){
        //this.messages1 = [{severity:'error', summary:'Error', detail:'Form valido'}];
        this.authService.registerCiudadano({ fecha_nac: this.fechaNacimiento, telefono: this.telefono, apellido: this.lastname, nombre: this.name, correo_electronico: this.email, contrasena: this.password })
        .subscribe(() => {
            this.messages2 = [{severity:'success', summary:'Éxito', detail:'Usuario registrado correctamente'}];
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000)  ; // Redirecciona después de 2 segundos 
          },
          err => {
            console.error(err);
            this.messages1 = [{severity:'error', summary:'Error', detail:err.error.message}];
          }
        );
      }else{
        this.messages1 = [{severity:'error', summary:'Error', detail:'Formulario inválido'}];
      }

    }else if (this.tipo === 'negocio') {
      if (form.valid && this.termsAccepted && this.uploadedFiles.length > 0){
        const formData = new FormData();
        formData.append('nombre', this.name);
        formData.append('correo_electronico', this.email);
        formData.append('contrasena', this.password);
        formData.append('propietario', this.propietario);
        formData.append('tipo_negocio', this.t_negocio);
        formData.append('direccion', this.direccion);
        formData.append('telefono', this.telefono);
        formData.append('fechacreacion', this.fechaNacimiento.toISOString());

        // Agregar la imagen si se ha cargado
        if (this.uploadedFiles.length > 0) {
          formData.append('image', this.uploadedFiles[0], this.uploadedFiles[0].name);
        }

        this.authService.registerNegocio(formData).subscribe(
          () => {
            this.messages2 = [{severity:'success', summary:'Éxito', detail:'Negocio registrado correctamente'}];
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000)  ; // Redirecciona después de 2 segundos 
          },
          err => {
            console.error(err);
            this.messages1 = [{severity:'error', summary:'Error', detail:err.error.message}];
          }
        );
      }else{
        if (form.valid && this.uploadedFiles.length == 0 && this.termsAccepted) {
          this.messages1 = [{severity:'error', summary:'Error', detail:'Debes subir una imagen del negocio'}];
        }else{
          this.messages1 = [{severity:'error', summary:'Error', detail:'Formulario inválido'}];
        } 
      }
    }
  }

  onTermsChange(event: any) {
    this.termsAccepted = event.target.checked;
  }

}
