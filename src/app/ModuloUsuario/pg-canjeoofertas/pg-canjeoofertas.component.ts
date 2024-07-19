import { Component, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pg-canjeoofertas',
  templateUrl: './pg-canjeoofertas.component.html',
  styleUrls: ['./pg-canjeoofertas.component.css', './../../../assets/vendor/bootstrap-icons/bootstrap-icons.css']
})
export class PgCanjeoofertasComponent {
  @ViewChild('dt1') table!: Table;

  seccion: string = '1';
  title = 'GreenPoint';
  descripcion: string = 'Nada fuera de lo normal';
  user: any = {};
  sidebarCollapsed = false;
  cdn: any;
  messages1: Message[] = [];
  messages2: Message[] = [];
  cantidad: number = 0;
  all_ofertas: any[] = [];
  loading: boolean = false;
  visibleNuevo: boolean=false;
  objSeleccion:any="-1";
  des_oferta: string  = '';
  gcn_oferta: any="-1";
  ngc_oferta: string = '';
  fecha_inicio_oferta: string = '';
  fecha_fin_oferta: string = '';

  
  email: string = '';


  constructor(
    public authService: AuthService,
    public variosServicios: ServiciviosVarios,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = this.authService.getUser();
    await this.listadoInformacion();
    await this.Obtener_Ofertas();
  }

  ModalInformacion(seleccion:any) {
    this.objSeleccion = seleccion;
    this.des_oferta = this.objSeleccion.descripcion;
    this.gcn_oferta = this.objSeleccion.gc_necesarios;
    this.ngc_oferta = this.objSeleccion.negocio;
    this.fecha_inicio_oferta = this.objSeleccion.fecha_inicio;
    this.fecha_fin_oferta = this.objSeleccion.fecha_fin;
    this.visibleNuevo = true;
  }

  async listadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfo(this.user.ciudadano_id).subscribe((translated: any) => { resolve(translated) }));
    console.log("INFOOOOOOOOOO " + JSON.stringify(data, null, 2) + "XD" + this.user.ciudadano_id);
    if (data) {
      this.cdn = data; // Suponiendo que la respuesta de la API es un array de ofertas
      console.log("Ofertas:", this.cdn.greencoins);
    }
  }


  menus: { [key: string]: boolean } = {};

  onCancel() {
    this.visibleNuevo = false;
  }
  
  async CanjearOferta() {
    try {
      const result = await new Promise<any>((resolve, reject) => {
        this.variosServicios.CanjearOferta(this.user.correo_electronico, this.objSeleccion.ofertas_id)
          .subscribe({
            next: (translated: any) => resolve(translated),
            error: (err: any) => reject(err)
          });
      });
  
      this.messages2 = [{ severity: 'success', summary: 'Éxito', detail: 'Oferta canjeada exitosamente' }];
      this.autoCloseMessages('messages2');
      await this.Obtener_Ofertas();
      this.visibleNuevo = false;
      this.listadoInformacion();
    } catch (error) {
      console.log("HOLAAAAAAAAAA");
      console.error("Error canjeando la oferta: ", error);
      if (error instanceof HttpErrorResponse) {
        this.messages1 = [{ severity: 'error', summary: 'Error', detail: error.error.error }];
      } else {
        this.messages1 = [{ severity: 'error', summary: 'Error', detail: "Error desconocido" }];
      }
      this.autoCloseMessages('messages1');
    }
  }
  

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
    }, 3000); // Tiempo en milisegundos (3000 ms = 3 segundos)
  }

  async Obtener_Ofertas() {
    this.loading = true;
    try {
      const data = await this.variosServicios.ListadoOfertasActivas().toPromise();
      console.log("OFERTASSSS"+data);
      this.all_ofertas = data;
    } catch (error) {
      console.error("Error obteniendo las ofertas: ", error);
    } finally {
      this.loading = false;
    }
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.table.filterGlobal(input.value, 'contains');
    }
  }

  clear(table: Table) {
    table.clear();
  }
}
