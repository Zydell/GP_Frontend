import { Component, HostListener, ViewEncapsulation  } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-dashuser',
  templateUrl: './pg-dashuser.component.html',
  styleUrls: [ './pg-dashuser.component.css',
    "./../../../assets/vendor/bootstrap-icons/bootstrap-icons.css"
    ]//,
    //encapsulation: ViewEncapsulation.ShadowDom
})
export class PgDashuserComponent {
  title = 'GreenPoint';
  user: any = {};
  sidebarCollapsed = false;

  constructor(
    public  authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser(); // Obtiene la información del usuario al inicializar el componente
    console.log('User info on init:', this.user); // Agregar log para debug
  }
  /*
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
    }
  }
 
    toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const mainContent = document.getElementById('main');
      if (sidebar && mainContent) {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
      }
    }*/
  
  
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}

