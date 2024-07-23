import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pg-historialciudadano',
  templateUrl: './pg-historialciudadano.component.html',
  styleUrls: ['./pg-historialciudadano.component.css', './../../../assets/vendor/bootstrap-icons/bootstrap-icons.css']
})
export class PgHistorialciudadanoComponent implements OnInit {
  @ViewChild('dt1') table!: Table;

  seccion: string = '1';
  title = 'GreenPoint';
  descripcion: string = 'Nada fuera de lo normal';
  user: any = {};
  sidebarCollapsed = false;
  cdn: any[] = [];
  messages1: Message[] = [];
  messages2: Message[] = [];
  cantidad: number = 0;
  all_historial: any[] = [];
  loading: boolean = false;

  menus: { [key: string]: boolean } = {};

  constructor(
    public authService: AuthService, 
    public variosServicios: ServiciviosVarios,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = this.authService.getUser(); // Obtiene la información del usuario al inicializar el componente
    await this.listadoInformacion();
    await this.Obtener_Historial();
    console.log('User info on init:', this.user); // Agregar log para debug
  }

  async listadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoHistorialReciclaje(this.user.ciudadano_id).subscribe((translated: any) => { resolve(translated) }));
    console.log("INFOOOOOOOOOO " + JSON.stringify(data, null, 2) + "XD" + this.user.ciudadano_id);
    if (data) {
      this.cdn = data; // Suponiendo que la respuesta de la API es un array de ofertas
      console.log("Ofertas:", this.cdn);
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

  async Obtener_Historial() {
    this.loading = true;
    try {
      const data = await this.variosServicios.HistorialCiudadano(this.user.ciudadano_id).toPromise();
      console.log("Datos recibidos del historial:", data); // Log para verificar la respuesta de la API
      this.all_historial = data.map((historial: any) => ({
        negocio: historial.tb_negocio.nombre,
        puntoVerde: historial.tb_puntos_verde.direccion,
        fecha: historial.fecha,
        greencoins: historial.greencoins_obtenidos,
      }));
      console.log("Historial mapeado:", this.all_historial); // Log para verificar el mapeo de datos
    } catch (error) {
      console.error("Error obteniendo el historial: ", error);
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
