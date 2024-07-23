
import { Component, HostListener, OnInit   } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-pg-perfilnegocio',
  templateUrl: './pg-perfilnegocio.component.html',
  styleUrls: [ './pg-perfilnegocio.component.css',
    "./../../../assets/vendor/bootstrap-icons/bootstrap-icons.css"
    ]
  })
export class PgPerfilnegocioComponent {
  seccion: string = '1';
  title = 'GreenPoint';
  negocio: any = {};
  sidebarCollapsed = false;
  imgbase64: string = '';
  cant_pvs: number = 0;
  cant_ofts: number = 0;
  ngc: any;

  constructor(
    public  authService: AuthService, 
    public  variosServicios: ServiciviosVarios,
    private router: Router
  ) {}

  async ngOnInit() {
    this.negocio = await this.authService.getNegocio(); // Obtiene la información del usuario al inicializar el componente
    await this.ListadoInformacion();
    //console.log('negocio info on init:', this.negocio); // Agregar log para debug
  }


  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoNegocio(this.negocio.negocio_id).subscribe((translated:any) => { resolve(translated) }));
    if (data) {
      //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      this.ngc = data;
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+JSON.stringify(this.ngc, null, 2));
      this.imgbase64 = this.convertBufferToBase64(data.image.data);     
    }
  }

  convertBufferToBase64(buffer: number[]): string {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64String = btoa(binary);
    return `data:image/png;base64,${base64String}`;
  }
  
  toggleSidebar(event: Event) {
    event.stopPropagation();
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  menus: { [key: string]: boolean } = {};  

  toggleMenu(menu: string, event: Event) {
    this.menus[menu] = !this.menus[menu];
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (window.innerWidth <= 1199) {
      if (this.sidebarCollapsed) {
        this.sidebarCollapsed = false;
      }
    }

    Object.keys(this.menus).forEach(menu => {
      this.menus[menu] = false;
    });
  }


}