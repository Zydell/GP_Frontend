import { Component, HostListener, ViewEncapsulation  } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-dashnegocio',
  templateUrl: './pg-dashnegocio.component.html',
  styleUrls: [ './pg-dashnegocio.component.css',
    "./../../../assets/vendor/bootstrap-icons/bootstrap-icons.css"
    ]//,
    //encapsulation: ViewEncapsulation.ShadowDom
})
export class PgDashnegocioComponent {
  seccion: string = '3';
  title = 'GreenPoint';
  negocio: any = {};
  sidebarCollapsed = false;
  imgbase64: string = '';
  ngc: any;

  constructor(
    public  authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.negocio = this.authService.getNegocio(); // Obtiene la información del usuario al inicializar el componente
    this.ListadoInformacion();
    console.log('negocio info on init:', this.negocio); // Agregar log para debug
  }

  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoNegocio(this.negocio.negocio_id).subscribe((translated:any) => { resolve(translated) }));
    if (data) {
      //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      this.ngc = data;
      this.imgbase64 = this.convertBufferToBase64(data.image.data);     
    }
  }

  convertBufferToBase64(buffer: number[]): string {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64String = btoa(binary);
    return `data:image/png;base64,${base64String}`;
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

  SeccionDashboard(event: Event){
    event.preventDefault();
    this.seccion = '1';
  }
  SeccionPuntosVerdes(event: Event){
    event.preventDefault();
    this.seccion = '2';
  }
  SeccionRegistroReciclaje(event: Event){
    event.preventDefault();
    this.seccion = '3';
  }
  SeccionHistorial(event: Event){
    event.preventDefault();
    this.seccion = '4';
  }
  
}

