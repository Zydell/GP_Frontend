import { Component, HostListener, ViewEncapsulation  } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciosWeb } from '../../ModuloServiciosWeb/ServiciosTest.component';
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
  seccion: string = '1';
  title = 'GreenPoint';
  user: any = {};
  sidebarCollapsed = false;
  cdn: any;
  cant_ofer: number=0;
  cant_cod: any;

  constructor(
    public  authService: AuthService, 
    public servicios: ServiciosWeb,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = this.authService.getUser(); // Obtiene la información del usuario al inicializar el componente
    await this.ListadoInformacion();
    console.log('User info on init:', this.user); // Agregar log para debug
    await this.Cant_Ofertas();
    await this.Cant_Codigos();
  }

  async Cant_Codigos(){ 
    try {
      const data = await this.servicios.ListadoCodigosGenerado(this.cdn.ciudadano_id).toPromise();
      console.log("PUNTOS VERDEEEEEE: "+ data)
      if (data) {
        this.cant_cod = data.length;
      }
    } catch (error) {
      console.error("Error obteniendo los puntos verdes del negocio: ", error);
    }
  }

  async Cant_Ofertas() {  
    // Obtener los puntos verdes del negocio
    try {
      const dataObservable = this.servicios.ListadoOfertas();
      
      dataObservable.subscribe(
        (data: any[]) => {
          console.log("OFERTASSSSS: ", data);
          
          if (data) {
            this.cant_ofer = data.length;
          }
        },
        (error: any) => {
          console.error("Error obteniendo los puntos verdes del negocio: ", error);
        }
      );
      
    } catch (error) {
      console.error("Error: ", error);
    }
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
  
  async SeccionDashboard(event: Event){
    event.preventDefault();
    await this.ngOnInit();
    this.seccion = '1';
  }
  SeccionVerOfertas(event: Event){
    event.preventDefault();
    this.seccion = '2';
  }
  SeccionPuntosVerdes(event: Event){
    event.preventDefault();
    this.seccion = '3';
  }
  SeccionHistorialReciclaje(event: Event){
    event.preventDefault();
    this.seccion = '4';
  }
}