
import { Component, HostListener, OnInit   } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-pg-perfilnegocio',
  templateUrl: './pg-perfilnegocio.component.html',
  styleUrls: [ './pg-perfilnegocio.component.css',
    "./../../../assets/vendor/bootstrap-icons/bootstrap-icons.css"
    ]
  })
export class PgPerfilnegocioComponent {
  seccion: string = '1';
  title = 'GreenPoint';
  negocio: any = {};
  sidebarCollapsed = false;
  imgbase64: string = '';
  cant_pvs: number = 0;
  cant_ofts: number = 0;
  ngc: any;
  currentPassword: string = '';
  newPassword: string = '';
  renewPassword: string = '';
  messages1: Message[] = [];
  messages2: Message[] = [];

  constructor(
    public  authService: AuthService, 
    public  variosServicios: ServiciviosVarios,
    private router: Router
  ) {}

  async ngOnInit() {
    this.negocio = await this.authService.getNegocio(); // Obtiene la información del usuario al inicializar el componente
    await this.ListadoInformacion();
    //console.log('negocio info on init:', this.negocio); // Agregar log para debug
  }

  async cambiarclave(): Promise<void> {
    this.currentPassword = '';
    this.newPassword = '';
    this.renewPassword = '';
  }  

  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoNegocio(this.negocio.negocio_id).subscribe((translated:any) => { resolve(translated) }));
    if (data) {
      //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      this.ngc = data;
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+JSON.stringify(this.ngc, null, 2));
      this.imgbase64 = this.convertBufferToBase64(data.image.data);     
    }
  }

  convertBufferToBase64(buffer: number[]): string {
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64String = btoa(binary);
    return `data:image/png;base64,${base64String}`;
  }
  
  toggleSidebar(event: Event) {
    event.stopPropagation();
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  menus: { [key: string]: boolean } = {};  

  toggleMenu(menu: string, event: Event) {
    this.menus[menu] = !this.menus[menu];
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (window.innerWidth <= 1199) {
      if (this.sidebarCollapsed) {
        this.sidebarCollapsed = false;
      }
    }

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
    }, 4000); // Tiempo en milisegundos (5000 ms = 5 segundos)
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
    return passwordRegex.test(password);
  }

  CambioClave(): void {
    if (!this.validatePassword(this.newPassword)) {
      this.messages1 = [{severity:'error', summary:'Error', detail:"Contraseña nueva inválida (al menos una mayuscula y numero - 8 caracteres)"}];
        this.autoCloseMessages('messages1');
      return;
    }

    if (this.newPassword !== this.renewPassword) {
      this.messages1 = [{severity:'error', summary:'Error', detail:"Las contraseñas nuevas no coinciden"}];
        this.autoCloseMessages('messages1');
      return;
    }

    if (this.newPassword === this.currentPassword) {
      this.messages1 = [{severity:'error', summary:'Error', detail:"La contraseña actual es Incorrecta"}];
      this.autoCloseMessages('messages1');
      return;
    }

    this.CambiarContrasena(this.negocio.correo_electronico, this.currentPassword, this.newPassword);
  }

  CambiarContrasena(correo: string, claveActual: string, nuevaClave: string): void {
    this.variosServicios.CambiarContrasena(correo, claveActual, nuevaClave).subscribe(
      response => {
        //this.showMessage('success', 'Success', 'Contraseña actualizada con éxito');
        this.messages2 = [{severity:'success', summary:'Éxito', detail:'Contraseña actualizada con éxito'}];
        this.autoCloseMessages('messages2');
        this.logout();
      },
      error => {
        //this.showMessage('error', 'Error', 'La contraseña actual es Incorrecta');
        this.messages1 = [{severity:'error', summary:'Error', detail:"La contraseña actual es Incorrecta"}];
        this.autoCloseMessages('messages1');
      }
    );
  }

  logout() {
    this.authService.logout();
    //this.showMessage('success', 'Success', 'Contraseña actualizada con éxito');
    this.messages2 = [{severity:'success', summary:'Éxito', detail:'Contraseña actualizada con éxito'}];
    this.autoCloseMessages('messages2');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500) 
  }

}