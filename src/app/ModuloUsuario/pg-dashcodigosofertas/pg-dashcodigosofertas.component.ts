import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Table } from 'primeng/table';
declare var bootstrap: any; // Asegúrate de que Bootstrap está disponible

@Component({
  selector: 'app-pg-dashcodigosofertas',
  templateUrl: './pg-dashcodigosofertas.component.html',
  styleUrls: ['./pg-dashcodigosofertas.component.css', './../../../assets/vendor/bootstrap-icons/bootstrap-icons.css']
})
export class PgDashcodigosofertasComponent implements OnInit {
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
  ofertas: any[] = [];
  selectedOffer: any = null; // Variable para almacenar la oferta seleccionada

  menus: { [key: string]: boolean } = {};

  constructor(
    public authService: AuthService, 
    public variosServicios: ServiciviosVarios,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.Obtener_Historial();
    console.log('User info on init:', this.user);
  }

  async Obtener_Historial() {
    this.loading = true;
    try {
      const data = await this.variosServicios.HistorialOfertas(this.user.correo_electronico).toPromise();
      console.log("Datos recibidos del historial:", data); // Log para verificar la respuesta de la API
      this.ofertas = data; // Aquí asignamos los datos directamente
      console.log("Ofertas:", this.ofertas); // Log para verificar el mapeo de datos
    } catch (error) {
      console.error("Error obteniendo el historial: ", error);
    } finally {
      this.loading = false;
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

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.table.filterGlobal(input.value, 'contains');
    }
  }

  clear(table: Table) {
    table.clear();
  }

  openModal(offer: any): void {
    this.selectedOffer = offer;
    const modalElement = document.getElementById('codeModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
