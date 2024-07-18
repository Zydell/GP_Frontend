import { Component, HostListener  } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-pg-gestionofertas',
  templateUrl: './pg-gestionofertas.component.html',
  styleUrls: [ './pg-gestionofertas.component.css',
    "./../../../assets/vendor/bootstrap-icons/bootstrap-icons.css"
    ]
})
export class PgGestionofertasComponent {
  seccion: string = '1';
  title = 'GreenPoint';
  descripcion: string = 'Nada fuera de lo normal';
  negocio: any = {};
  sidebarCollapsed = false;
  ngc: any;
  messages1: Message[] = [];
  messages2: Message[] = [];
  cantidad: number = 0;
  all_ofertas: any=[];

  constructor(
    public  authService: AuthService, 
    public  variosServicios: ServiciviosVarios, 
    private router: Router
  ) {}

  async ngOnInit() {
    this.negocio = this.authService.getNegocio(); // Obtiene la información del usuario al inicializar el componente
    await this.ListadoInformacion();
    await this.Obtener_Ofertas()
  }

  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoNegocio(this.negocio.negocio_id).subscribe((translated:any) => { resolve(translated) }));
    if (data) {
      this.ngc = data;
      //console.log("EEEEEEEEEEEEEEE"+ this.ngc.negocio_id);    
    }
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

  async Obtener_Ofertas(){  
    //Obtener los puntos verdes del negocio
    try {
      const data = await this.variosServicios.ListadoOfertas().toPromise();
      console.log("OFERTAAAAAAAAAAASSSSSSS XD: ", (data));
      this.all_ofertas = data;
      /*
      if (data) {
        this.all_ofertas = data.map((pv: any) => ({
          name: pv.descripcion,
          code: pv.punto_verde_id
        }));
      }*/
      
    } catch (error) {
      console.error("Error obteniendo las ofertas: ", error);
    }
  }

  
}