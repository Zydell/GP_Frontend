import { Component, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pg-gestionofertas',
  templateUrl: './pg-gestionofertas.component.html',
  styleUrls: ['./pg-gestionofertas.component.css', './../../../assets/vendor/bootstrap-icons/bootstrap-icons.css']
})
export class PgGestionofertasComponent {
  @ViewChild('dt1') table!: Table;

  seccion: string = '1';
  title = 'GreenPoint';
  descripcion: string = 'Nada fuera de lo normal';
  negocio: any = {};
  sidebarCollapsed = false;
  ngc: any;
  messages1: Message[] = [];
  messages2: Message[] = [];
  cantidad: number = 0;
  all_ofertas: any[] = [];
  loading: boolean = false;

  constructor(
    public authService: AuthService,
    public variosServicios: ServiciviosVarios,
    private router: Router
  ) {}

  async ngOnInit() {
    this.negocio = this.authService.getNegocio(); // Obtiene la información del usuario al inicializar el componente
    await this.ListadoInformacion();
    await this.Obtener_Ofertas();
  }

  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoNegocio(this.negocio.negocio_id).subscribe((translated: any) => { resolve(translated); }));
    if (data) {
      this.ngc = data;
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
    }, 3000); // Tiempo en milisegundos (3000 ms = 3 segundos)
  }

  async Obtener_Ofertas() {
    this.loading = true;
    try {
      const data = await this.variosServicios.ListadoOfertasActivasNegocio(this.negocio.negocio_id).toPromise();
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
