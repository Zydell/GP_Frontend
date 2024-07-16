import { Component, HostListener  } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pg-registroreciclaje',
  templateUrl: './pg-registroreciclaje.component.html',
  styleUrls: [ './pg-registroreciclaje.component.css',
    "./../../../assets/vendor/bootstrap-icons/bootstrap-icons.css"
    ]
})
export class PgRegistroreciclajeComponent {
  seccion: string = '1';
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
      this.ngc = data;
      //console.log("EEEEEEEEEEEEEEE"+ this.ngc.nombre);
      this.imgbase64 = this.convertBufferToBase64(data.image.data);     
    }
  }

  convertBufferToBase64(buffer: number[]): string {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64String = btoa(binary);
    return `data:image/png;base64,${base64String}`;
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

  
}