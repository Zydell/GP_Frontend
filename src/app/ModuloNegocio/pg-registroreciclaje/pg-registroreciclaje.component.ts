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
  selectedPuntoVerde: any;
  selectedMaterial: any;
  descripcion: string = 'Nada fuera de lo normal';
  negocio: any = {};
  sidebarCollapsed = false;
  imgbase64: string = '';
  ngc: any;
  messages1: Message[] = [];
  messages2: Message[] = [];
  materiales: any[] = [];
  puntosverdes: any[] = [];
  cantidad: number = 0;

  constructor(
    public  authService: AuthService, 
    public  variosServicios: ServiciviosVarios, 
    private router: Router
  ) {}

  async ngOnInit() {
    this.negocio = this.authService.getNegocio(); // Obtiene la información del usuario al inicializar el componente
    await this.ListadoInformacion();
    await this.Obtener_Materiales();
    await this.Obtener_Pverde();
    await this.addFormValidation();
  }

  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoNegocio(this.negocio.negocio_id).subscribe((translated:any) => { resolve(translated) }));
    if (data) {
      this.ngc = data;
      //console.log("EEEEEEEEEEEEEEE"+ this.ngc.negocio_id);
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

  autoCloseMessages(messageType: 'messages1' | 'messages2') {
    setTimeout(() => {
      if (messageType === 'messages1') {
        this.messages1 = [];
      } else if (messageType === 'messages2') {
        this.messages2 = [];
      }
    }, 3000); // Tiempo en milisegundos (5000 ms = 5 segundos)
  }

  async addFormValidation() {
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
        const selectedPuntoVerdeCode = this.selectedPuntoVerde ? this.selectedPuntoVerde.code : null;
        const selectedMaterialCode = this.selectedMaterial ? this.selectedMaterial.code : null;
        //console.log("Punto verde seleccionado: " + selectedPuntoVerdeCode + " material: " + selectedMaterialCode);

        this.variosServicios.RegReciclaje({  correo_electronico: this.email, negocio_id: this.ngc.negocio_id, punto_verde_id:selectedPuntoVerdeCode, cantidad:this.cantidad, material_id:selectedMaterialCode, descripcion:this.descripcion })
        .subscribe(() => {
            this.messages2 = [{severity:'success', summary:'Éxito', detail:'Reciclaje registrado exitosamente'}];
            this.autoCloseMessages('messages2');
            setTimeout(() => {
              //this.router.navigate(['/login']);
              //this.email = '';
            }, 2000)  ; // Redirecciona después de 2 segundos 
          },
          err => {
            console.error(err);
            this.messages1 = [{severity:'error', summary:'Error', detail:"Correo electronico invalido"}];
            this.autoCloseMessages('messages1');
          }
        );
      }else{
        this.messages1 = [{severity:'error', summary:'Error', detail:'Formulario inválido'}];
        this.autoCloseMessages('messages1');
      }
  }

  async Obtener_Materiales(){
    //Obtener los materiales activos
    try {
      const data = await this.variosServicios.ListadoMaterial().toPromise();
      //console.log("MATERIALES XD: ", JSON.stringify(data));
  
      if (data) {
        //console.log("Materiales mapeados XXXXXXXXXXXXXX: ", this.materiales);
        this.materiales = data.map((mat: any) => ({
          name: mat.tipo,
          code: mat.materiales_id
        }));
      }
      
    } catch (error) {
      console.error("Error obteniendo materiales: ", error);
    }
  }

  async Obtener_Pverde(){  
    //Obtener los puntos verdes del negocio
    try {
      const data = await this.variosServicios.ListadoPuntoVerdeNegocio(this.ngc.negocio_id).toPromise();
      //console.log("PUNTOS VERDES XD: ", JSON.stringify(data));
  
      if (data) {
        this.puntosverdes = data.map((pv: any) => ({
          name: pv.descripcion,
          code: pv.punto_verde_id
        }));
        //console.log("Puntos verdes mapeados XXXXXXXXXXXXXX: ", this.puntosverdes);
      }
      
    } catch (error) {
      console.error("Error obteniendo los puntos verdes del negocio: ", error);
    }
  }

  
}