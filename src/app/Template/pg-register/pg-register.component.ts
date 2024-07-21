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
  //fechaCreacion: Date = new Date();
  //fechaCreacion: Date | null = null;
  fechaCreacion: string = '';
  term_condiciones: boolean=false;
  //private _fechaCreacion: Date = new Date();
  maxDate: string = '';
  lastname: string = '';
  name: string = '';
  name_neg: string = '';
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
  ruc: string = '';
  rucData: any = null;
  isLoading: boolean = false; // Estado de carga
  // Otros campos si es necesario

  constructor(private authService: AuthService, private router: Router, private js:EjecutarScript) {}

  async ngOnInit() {
    //this.js.CargarScriptLogin();
    await this.addFormValidation();
    // Establece la fecha máxima permitida a la fecha actual
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFiles = [file];
      //this.messages2 = [{severity:'success', summary:'Éxito', detail:'Imagen cargada correctamente con el nuevo xd'}];
      //this.autoCloseMessages('messages2');
    }
  }
  /*
  onUpload(event: any): void {
    this.uploadedFiles = event.files;
    console.log("XDXDXD "+ this.uploadedFiles);
    if (this.uploadedFiles){
      this.messages2 = [{severity:'success', summary:'Éxito', detail:'Imagen cargada correctamente'}];
      this.autoCloseMessages('messages2');
    }

  }*/

  autoCloseMessages(messageType: 'messages1' | 'messages2') {
    setTimeout(() => {
      if (messageType === 'messages1') {
        this.messages1 = [];
      } else if (messageType === 'messages2') {
        this.messages2 = [];
      }
    }, 3000); // Tiempo en milisegundos (5000 ms = 5 segundos)
  }

  ModalTerminosCondiciones(event: Event) {
    event.preventDefault();
    this.term_condiciones = true;
  }

    async addFormValidation() {
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
            this.autoCloseMessages('messages2');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000)  ; // Redirecciona después de 2 segundos 
          },
          err => {
            console.error(err);
            this.messages1 = [{severity:'error', summary:'Error', detail:err.error.error}];
            this.autoCloseMessages('messages1');
          }
        );
      }else{
        this.messages1 = [{severity:'error', summary:'Error', detail:'Formulario inválido'}];
        this.autoCloseMessages('messages1');
      }

    }else if (this.tipo === 'negocio-valido') {
      if (form.valid && this.termsAccepted && this.uploadedFiles.length > 0){
        const formData = new FormData();
        formData.append('nombre', this.name_neg);
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
            this.autoCloseMessages('messages2');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000)  ; // Redirecciona después de 2 segundos 
          },
          err => {
            console.error(err);
            this.messages1 = [{severity:'error', summary:'Error', detail:err.error.error}];
            this.autoCloseMessages('messages1');
          }
        );
      }else{
        if (form.valid && this.uploadedFiles.length == 0 && this.termsAccepted) {
          this.messages1 = [{severity:'error', summary:'Error', detail:'Debes subir una imagen del negocio'}];
          this.autoCloseMessages('messages1');
        }else{
          this.messages1 = [{severity:'error', summary:'Error', detail:'Formulario inválido'}];
          this.autoCloseMessages('messages1');
        } 
      }
    }
  }

  onTermsChange(event: any) {
    this.termsAccepted = event.target.checked;
  }

  async validateRuc() {
    await this.addFormValidation();
    this.isLoading = true;
    this.authService.validateRuc(this.ruc).subscribe(
      (data) => {
        this.rucData = data;
        this.fechaCreacion = data.fechaCreacion ? new Date(data.fechaCreacion).toISOString().split('T')[0] : '';
        this.name_neg = data.nombreNegocio || '';
        this.propietario = data.propietario || '';
        this.t_negocio = data.tipoNegocio || '';
        this.direccion = data.direccion || '';
        this.tipo = 'negocio-valido';
        this.messages2 = [{severity:'success', summary:'Éxito', detail:'RUC validada'}];
        this.autoCloseMessages('messages2');
        this.isLoading = false;
        //this.errorMessage = '';
      },
      (error) => {
        this.isLoading = false;
        this.rucData = null;
        //this.errorMessage = 'Error validating RUC';
        console.error(error);
        this.messages1 = [{severity:'error', summary:'Error', detail:error.error.error}];
        this.autoCloseMessages('messages1');
      }
    );
  }
}
