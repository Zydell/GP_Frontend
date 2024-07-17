import { Component, HostListener  } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-pg-registroreciclaje',
  templateUrl: './pg-registroreciclaje.component.html',
  styleUrls: [ './pg-registroreciclaje.component.css',
    "./../../../assets/vendor/bootstrap-icons/bootstrap-icons.css"
    ]
})
export class PgRegistroreciclajeComponent {
  seccion: string = '1';
  title = 'GreenPoint';
  email: string = '';
  negocio: any = {};
  sidebarCollapsed = false;
  imgbase64: string = '';
  ngc: any;
  messages1: Message[] = [];
  messages2: Message[] = [];
  materiales: any[] = [];

  constructor(
    public  authService: AuthService, 
    public  variosServicios: ServiciviosVarios, 
    private router: Router
  ) {}

  async ngOnInit() {
    await this.Obtener_Material_Pverde();
    this.negocio = this.authService.getNegocio(); // Obtiene la información del usuario al inicializar el componente
    this.addFormValidation();
    this.ListadoInformacion();
    //console.log('negocio info on init:', this.negocio); // Agregar log para debug
  }

  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoNegocio(this.negocio.negocio_id).subscribe((translated:any) => { resolve(translated) }));
    if (data) {
      this.ngc = data;
      //console.log("EEEEEEEEEEEEEEE"+ this.ngc.nombre);
      this.imgbase64 = this.convertBufferToBase64(data.image.data);     
    }
  }

  convertBufferToBase64(buffer: number[]): string {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64String = btoa(binary);
    return `data:image/png;base64,${base64String}`;
  }

  menus: { [key: string]: boolean } = {};  

  toggleMenu(menu: string, event: Event) {
    this.menus[menu] = !this.menus[menu];
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    Object.keys(this.menus).forEach(menu => {
      this.menus[menu] = false;
    });
  }

  addFormValidation() {
    setTimeout(() => {
      const forms = document.querySelectorAll('.needs-validation');
      Array.prototype.slice.call(forms).forEach((form: HTMLFormElement) => {
        form.addEventListener('submit', (event: Event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
              //if (!this.termsAccepted) {
              //  this.messages1.push({severity:'error', summary:'Error', detail:'Debes aceptar los términos y condiciones'});
              //}
            }
          form.classList.add('was-validated');
        }, false);
      });
    });
  }

  RegistroReciclaje(form: NgForm) {
      if (form.valid){
        //this.messages1 = [{severity:'error', summary:'Error', detail:'Form valido'}];
        this.variosServicios.RegReciclaje({  correo_electronico: this.email })
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
  }

  async Obtener_Material_Pverde(){
    //Obtener los materiales activos
    try {
      const data = await this.variosServicios.ListadoMaterial().toPromise();
      console.log("MATERIALES XD: ", JSON.stringify(data));
  
      if (data) {
        console.log("Materiales mapeados XXXXXXXXXXXXXX: ", this.materiales);
        this.materiales = data.map((mat: any) => ({
          name: mat.tipo,
          code: mat.id_materiales
        }));
      }
      
    } catch (error) {
      console.error("Error obteniendo materiales: ", error);
    }
    //Obtener las secciones activas
    /*const data1 = await new Promise<any>(resolve => this.servicios_ir.ListadoSeccionActivos().subscribe(translated => { resolve(translated) }));
    if (data1.success) {
      this.seccion = data1.datos.map((sec: any) => ({
        name: sec.str_nombre,
        code: sec.id_recomendacion
      })); 
    }*/
  }

  
}