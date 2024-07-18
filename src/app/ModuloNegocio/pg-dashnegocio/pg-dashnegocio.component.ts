import { Component, HostListener, ViewEncapsulation  } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
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
  seccion: string = '2';
  title = 'GreenPoint';
  negocio: any = {};
  sidebarCollapsed = false;
  imgbase64: string = '';
  cant_pvs: number = 0;
  cant_ofts: number = 0;
  ngc: any;

  constructor(
    public  authService: AuthService, 
    public  variosServicios: ServiciviosVarios,
    private router: Router
  ) {}

  async ngOnInit() {
    this.negocio = await this.authService.getNegocio(); // Obtiene la información del usuario al inicializar el componente
    await this.ListadoInformacion();
    await this.Cant_Pverde();
    await this.Cant_Ofertas();
    //console.log('negocio info on init:', this.negocio); // Agregar log para debug
  }

  async Cant_Pverde(){  
    //Obtener los puntos verdes del negocio
    try {
      const data = await this.variosServicios.ListadoPuntoVerdeNegocio(this.ngc.negocio_id).toPromise();
      //console.log("PUNTOS VERDEEEEEE: "+ data)
      if (data) {
        this.cant_pvs = data.length;
        console.log("Cantidad de puntos verdes"+this.cant_pvs);
      }
    } catch (error) {
      console.error("Error obteniendo los puntos verdes del negocio: ", error);
    }
  }

  async Cant_Ofertas(){  
    //Obtener los puntos verdes del negocio
    try {
      const data = await this.variosServicios.ListadoOfertasActivasNegocio(this.ngc.negocio_id).toPromise();
      console.log("PUNTOS VERDEEEEEE: "+ data)
      
      if (data) {
        this.cant_ofts = data.length;
      }
      
    } catch (error) {
      console.error("Error obteniendo los puntos verdes del negocio: ", error);
    }
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
  SeccionVerOfertas(event: Event){
    event.preventDefault();
    this.seccion = '5';
  }
  SeccionGestionOfertas(event: Event){
    event.preventDefault();
    this.seccion = '6';
  }
  
}

