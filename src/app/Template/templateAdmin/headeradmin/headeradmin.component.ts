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
    title = 'GreenPoint';
    user: any = {};
    sidebarCollapsed = false;
    cdn: any;

    constructor(
        public  authService: AuthService, 
        private router: Router
    ) {}

    ngOnInit(): void {
        this.user = this.authService.getUser(); // Obtiene la información del usuario al inicializar el componente
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
    
      logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
      
}
