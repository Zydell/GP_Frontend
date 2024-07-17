import { Component, OnInit,HostListener} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.css',
    "./../../../../assets/vendor/bootstrap-icons/bootstrap-icons.css"]
})
export class HeaderadminComponent implements OnInit {
  user: any = {};
  sidebarCollapsed = false;
  cdn: any;
  showProfileMenu = false; // Variable para controlar la visibilidad del dropdown

  constructor(
    public  authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser(); // Obtiene la información del usuario al inicializar el componente
    console.log('User info on init:', this.user); // Agregar log para debug
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
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
