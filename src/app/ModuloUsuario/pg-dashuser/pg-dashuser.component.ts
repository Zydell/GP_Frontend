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
  cdn: any;

  constructor(
    public  authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser(); // Obtiene la información del usuario al inicializar el componente
    this.ListadoInformacion();
    console.log('User info on init:', this.user); // Agregar log para debug
  }

  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfo(this.user.ciudadano_id).subscribe((translated:any) => { resolve(translated) }));
    //console.log("INFOOOOOOOOOO " + data + "XD" + this.user.ciudadano_id)
    console.log("INFOOOOOOOOOO " + JSON.stringify(data, null, 2) + "XD" + this.user.ciudadano_id);
    console.log(data.greencoins);
    if (data) {
      this.cdn = data;
      console.log("OLAAAAAAAAAAAA"+this.cdn.greencoins)
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}

