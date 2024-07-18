import { Component, HostListener, ViewChild } from '@angular/core';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pg-dashpuntosverdesnegocio',
  templateUrl: './pg-dashpuntosverdesnegocio.component.html',
  styleUrls: ['./pg-dashpuntosverdesnegocio.component.css', './../../../assets/vendor/bootstrap-icons/bootstrap-icons.css']
})
export class PgDashpuntosverdesnegocioComponent {
  @ViewChild('dt1') table!: Table;
  visibleEditar: boolean=false;
  visibleEstado: boolean=false;
  visibleNuevo: boolean=false;
  checked: boolean = false;
  newpvs: string  = '';
  objSeleccion:any="-1";
  title = 'GreenPoint';
  direccion: string = '';
  negocio: any = {};
  sidebarCollapsed = false;
  ngc: any;
  messages1: Message[] = [];
  messages2: Message[] = [];
  loading: boolean = false;
  ngc_pvs: any;

  constructor(
    public authService: AuthService,
    public variosServicios: ServiciviosVarios,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.negocio = this.authService.getNegocio(); // Obtiene la información del usuario al inicializar el componente
    await this.ListadoInformacion();
    await this.PverdesNegocio();
    await this.addFormValidation();
  }

  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.authService.getInfoNegocio(this.negocio.negocio_id).subscribe((translated: any) => { resolve(translated); }));
    if (data) {
      this.ngc = data;
    }
  }

  async PverdesNegocio(){  
    //Obtener los puntos verdes del negocio
    try {
      const data = await this.variosServicios.ListadoPuntoVerdeNegocio(this.ngc.negocio_id).toPromise();
      //console.log("PUNTOS VERDEEEEEE: "+ data)
      if (data) {
        this.ngc_pvs = data;
        console.log("Cantidad de puntos verdes"+this.ngc_pvs);
      }
    } catch (error) {
      console.error("Error obteniendo los puntos verdes del negocio: ", error);
    }
  }

  ModalNuevoInformacion() {
    this.newpvs="";
    this.direccion="";
    this.visibleNuevo = true;
  }

    ModalEditarInformacion(seleccion:any) {
      this.objSeleccion = seleccion;
      this.newpvs = this.objSeleccion.descripcion;
      this.direccion = this.objSeleccion.direccion;
      this.visibleEditar = true;
    }

    ModalCambiarEstado(seleccion:any) {
      this.objSeleccion=seleccion;
      this.newpvs = this.objSeleccion.descripcion;
      //console.log(this.objSeleccion)
      this.visibleEstado = true;
    }

    async addFormValidation() {
      setTimeout(() => {
        const forms = document.querySelectorAll('.needs-validation');
        Array.prototype.slice.call(forms).forEach((form: HTMLFormElement) => {
          form.addEventListener('submit', (event: Event) => {
              if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }
            form.classList.add('was-validated');
          }, false);
        });
      });
    }

  async RegistrarNuevo(form: NgForm){
    if (form.valid){ 
      try {
        console.log("ID DE LA OFERTA:"+this.objSeleccion.ofertas_id);
        const data = await this.variosServicios.NuevoPuntoVerde(this.newpvs, this.direccion, this.negocio, this.negocio.negocio_id, this.negocio.negocio_id, true).toPromise();
        this.messages2 = [{severity:'success', summary:'Éxito', detail:'Oferta registrada exitosamente'}];
        this.autoCloseMessages('messages2');
        await this.PverdesNegocio();
        this.visibleNuevo =false;

      } catch (error) {
        console.error("Error al crear la oferta: ", error);
        //this.messages1 = [{severity:'error', summary:'Error', detail: "Error al crear la oferta "}];
        if (error instanceof HttpErrorResponse) {
          this.messages1 = [{severity:'error', summary:'Error', detail: error.error.message}];
        } else {
          this.messages1 = [{severity:'error', summary:'Error', detail: "Error desconocido"}];
        }
        this.autoCloseMessages('messages1');
      }
    }else{
      this.messages1 = [{severity:'error', summary:'Error', detail:'Formulario inválido'}];
      this.autoCloseMessages('messages1');
    }
  }

  async RegistrarActualizacion(form: NgForm){
    if (form.valid){ 
      try {
        console.log("ID DE LA OFERTA:"+this.objSeleccion.ofertas_id);
        const data = await this.variosServicios.ActualizacionPuntoVerde(this.objSeleccion.punto_verde_id,this.newpvs, this.direccion, this.negocio, this.negocio.negocio_id, this.negocio.negocio_id, true).toPromise();
        this.messages2 = [{severity:'success', summary:'Éxito', detail:'Oferta actualizada exitosamente'}];
        this.autoCloseMessages('messages2');
        await this.PverdesNegocio();
        this.visibleEditar =false;

      } catch (error) {
        //console.error("Error al actualizar la oferta: ", error);
        //this.messages1 = [{severity:'error', summary:'Error', detail: "Error al crear la oferta "}];
        if (error instanceof HttpErrorResponse) {
          this.messages1 = [{severity:'error', summary:'Error', detail: error.error.message}];
        } else {
          this.messages1 = [{severity:'error', summary:'Error', detail: "Error desconocido"}];
        }
        this.autoCloseMessages('messages1');
      }
    }else{
      this.messages1 = [{severity:'error', summary:'Error', detail:'Formulario inválido'}];
      this.autoCloseMessages('messages1');
    }
  }

  async DesactivarOferta(){
    try {
      console.log("ID DE LA OFERTA:"+this.objSeleccion.ofertas_id);
      const data = await this.variosServicios.DesactivarOfert(this.objSeleccion.ofertas_id).toPromise();
    } catch (error) {
      console.error("Error al desactivar la oferta: ", error);
    } finally {
      this.loading = false;
    }
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

  autoCloseMessages(messageType: 'messages1' | 'messages2') {
    setTimeout(() => {
      if (messageType === 'messages1') {
        this.messages1 = [];
      } else if (messageType === 'messages2') {
        this.messages2 = [];
      }
    }, 3000); // Tiempo en milisegundos (3000 ms = 3 segundos)
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.table.filterGlobal(input.value, 'contains');
    }
  }

  clear(table: Table) {
    table.clear();
  }

}
