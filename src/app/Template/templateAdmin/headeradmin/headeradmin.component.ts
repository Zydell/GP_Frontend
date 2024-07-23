import { Component, OnInit,HostListener} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';
import { ServiciviosVarios } from '../../../ModuloServiciosWeb/ServiciosTestVarios.component';


@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.css',
    "./../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css"]
})
export class HeaderadminComponent implements OnInit {
  seccion: string = '1';
  collapsed: boolean = true; // O `false` según tu estado inicial
  activeMenu: string = ''; // Variable para rastrear el menú activo
  activeSection: string = ''; // Variable para rastrear la sección activa
  dato: any = {};
  user: any = {};

  ofertAct: number = 0;
  ofertIna: number = 0;
  PuntoAct: number = 0;
  PuntoIna: number = 0;
  negocioAct: number = 0;
  negocioIna: number = 0;
  ciudadanoAct: number = 0;
  ciudadanoIna: number = 0;

  sidebarCollapsed = false;
  cdn: any;
  showProfileMenu = false; // Variable para controlar la visibilidad del dropdown

  constructor(
    public  authService: AuthService, 
    private servicios: ServiciviosVarios,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dato = this.authService.getUser(); // Obtiene la información del usuario al inicializar el componente
    this.loadUserData(this.dato.admin_id);
    console.log('User info on init:', this.user); // Agregar log para debug
    this.collapsed = !this.collapsed;
    this.loadOfertas(); // Cargar las ofertas
    this.loadPuntos();
    this.loadNegocios();
    this.loadCiudadanos();
  }

  loadCiudadanos() {
    this.CiudadanosAct();
    this.CiudadanosIna();
  }

  loadOfertas() {
    this.OfertasAct();
    this.OfertasIna();
  }

  loadPuntos() {
    this.PuntosVerdesAct();
    this.PuntosVerdesIna();
  }
  loadNegocios() {
    this.NegociosAct();
    this.NegociosIna();
  }

  CiudadanosAct() {
    this.servicios.ListadoCiudadanossActive().subscribe(
      (response) => {
        this.ciudadanoAct = response.length;
        console.log('Ofertas activas:', this.ciudadanoAct);
      },
      (error) => {
        console.error('Error fetching active offers:', error);
      }
    );
  }

  CiudadanosIna() {
    this.servicios.ListadoCiudadanossInactive().subscribe(
      (response) => {
        this.ciudadanoIna = response.length;
        console.log('Ofertas inactivas:', this.ciudadanoIna);
      },
      (error) => {
        console.error('Error fetching inactive offers:', error);
      }
    );
  }


  NegociosAct() {
    this.servicios.ListadoNegociosActive().subscribe(
      (response) => {
        this.negocioAct = response.length;
        console.log('Ofertas activas:', this.negocioAct);
      },
      (error) => {
        console.error('Error fetching active offers:', error);
      }
    );
  }

  NegociosIna() {
    this.servicios.ListadoNegociosInactive().subscribe(
      (response) => {
        this.negocioIna = response.length;
        console.log('Ofertas inactivas:', this.negocioIna);
      },
      (error) => {
        console.error('Error fetching inactive offers:', error);
      }
    );
  }

  OfertasAct() {
    this.servicios.ListadoOfertasActivas().subscribe(
      (response) => {
        this.ofertAct = response.length;
        //console.log('Ofertas activas:', this.ofertAct);
      },
      (error) => {
        console.error('Error fetching active offers:', error);
      }
    );
  }

  OfertasIna() {
    this.servicios.ListadoOfertasInactivas().subscribe(
      (response) => {
        this.ofertIna = response.length;
        //console.log('Ofertas inactivas:', this.ofertIna);
      },
      (error) => {
        console.error('Error fetching inactive offers:', error);
      }
    );
  }

  PuntosVerdesAct() {
    this.servicios.ListadoPuntosActivas().subscribe(
      (response) => {
        this.PuntoAct = response.length;
      },
      (error) => {
        console.error('Error fetching active offers:', error);
      }
    );
  }

  PuntosVerdesIna() {
    this.servicios.ListadoPuntosInactivas().subscribe(
      (response) => {
        this.PuntoIna = response.length;
      },
      (error) => {
        console.error('Error fetching inactive offers:', error);
      }
    );
  }
  async loadUserData(id: number): Promise<void> {
    try {
      const data = await this.servicios.AdminPorId(id).toPromise();
      this.user = data;
      console.log(this.user);
    } catch (error) {
      console.error('Error in loadUserData:', error);
    }
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
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
   // Función para cerrar el dropdown cuando se hace clic fuera de él
   @HostListener('document:click', ['$event'])
   onClick(event: MouseEvent) {
     if (!(event.target as HTMLElement).closest('.profile')) {
       this.showProfileMenu = false;
     }
   }
   private setActiveMenu(menu: string) {
    this.activeMenu = menu;
  }
  private setActiveSection(section: string) {
    this.activeSection = section;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  SeccionPanelPrincipal(event: Event) {
    this.setActiveMenu('dashboard'); // Marca el menú "Panel Principal" como activo
    this.setActiveSection(''); // Limpia la sección activa
    event.preventDefault();
    this.seccion = '1';
  }

  SeccionMateriales(event: Event){
    event.preventDefault();
    this.seccion = '2';
    this.setActiveSection('materiales');
    this.setActiveMenu(''); 
  }
  SeccionOfertas(event: Event){
    event.preventDefault();
    this.seccion = '3';
    this.setActiveSection('ofertas');
    this.setActiveMenu(''); 
  }  
  SeccionPuntosVerdes(event: Event){
    event.preventDefault();
    this.seccion = '4';
    this.setActiveSection('puntosverdes');
    this.setActiveMenu(''); 
  }  
  SeccionNegocios(event: Event){
    event.preventDefault();
    this.seccion = '5';
    this.setActiveSection('negocios');
    this.setActiveMenu(''); 
  }  
  SeccionAdmins(event: Event){
    event.preventDefault();
    this.seccion = '6';
    this.setActiveSection('admins');
    this.setActiveMenu(''); 
  }  
  SeccionCiudadanos(event: Event){
    event.preventDefault();
    this.seccion = '7';
    this.setActiveSection('ciudadanos');
    this.setActiveMenu(''); 
}  
SeccionPerfil(event: Event) {
  event.preventDefault();
  this.setActiveMenu('profile'); // Marca el menú "Perfil" como activo
  this.setActiveSection(''); // Limpia la sección activa
  this.collapsed = true; // Colapsa la sección de gestión
  this.seccion = '8';
}

  
}
