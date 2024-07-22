import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from '../../ModuloServiciosWeb/Servicio.Auth';
import { SortingService } from '../../sorting.service'; // Adjust the path as needed

@Component({
  selector: 'app-pg-ciudadanos',
  templateUrl: './pg-ciudadanos.component.html',
  styleUrls: ['./pg-ciudadanos.component.css'],
  providers: [MessageService]
})
export class PgCiudadanosComponent {
  @ViewChild('dt1') table!: Table;

  lsListado:any=[];
  objSeleccion:any="-1";

  nombre:string="";
  correo:string="";
  clave:string="";
  strEstado:any="";
  
  combinedName: string="";

  visibleEditar: boolean=false;
  visibleEstado: boolean=false;
  visibleNuevo: boolean=false;
  visibleEliminar: boolean=false;
  constructor
  (
    public  authService: AuthService, 
    private servicios: ServiciviosVarios,
    private messageService: MessageService,
    private mensajes:Mensajes,
    private sortingService: SortingService
  ) { }

  async ngOnInit() {
    await this.ListadoInformacion();
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

  ModalEditarInformacion(seleccion:any) {
    this.objSeleccion = { ...seleccion };
    console.log(this.objSeleccion)
    this.visibleEditar = true;
  }

  ModalCambiarEstado(seleccion:any) {
    this.objSeleccion=seleccion;
    if(this.objSeleccion.estado){
      this.strEstado="Desactivar";
    }else{
      this.strEstado="Activar";
    }
    this.combinedName = `${this.objSeleccion.nombre} ${this.objSeleccion.apellido}`;
    console.log(this.objSeleccion)
    this.visibleEstado = true;
  }

  ModalEliminar(seleccion:any) {
    this.objSeleccion=seleccion;
    if(this.objSeleccion.estado){
      this.strEstado="Desactivar";
    }else{
      this.strEstado="Activar";
    }
    console.log(this.objSeleccion)
    this.visibleEliminar = true;
  }

  async ListadoInformacion() {
    try {
      const data = await new Promise<any>(resolve =>
        this.servicios.ListadoCiudadanos().subscribe(translated => resolve(translated))
      );
      console.log(data);
  
      if (data) {
        for (let ciudadano of data) {
          // Buscar el correo del admin
          const correo = await this.BuscarcorreoCiudadano(ciudadano.ciudadano_id);
          if (correo) {
            ciudadano.correo = correo.correo_electronico;
            ciudadano.idcredencial = correo.credencial_id;
          } else {
            ciudadano.correo = 'No email found';
            ciudadano.idcredencial = 'No credential found';
          }
        }
        this.lsListado = this.sortingService.ordenarPorIdAscendente(data,'ciudadano_id') ;
      }
    } catch (error) {
      console.error('Error in ListadoInformacion:', error);
    }
  }
  
  
  async BuscarcorreoCiudadano(id: number): Promise<any> {
    try {
      const data = await this.servicios.CredencialIduserType(id, 1).toPromise();
      return data;
    } catch (error) {
      console.error('Error in Busca rcorreo :', error);
      return null;
    }
  }
  

  /*async RegistrarNuevo(){
    try {
      if(this.nombre.trim() && this.correo.trim() && this.clave.trim()){
        console.log("aqui")
        this.servicios.NuevoAdmin(this.nombre, this.correo,this.clave)
        .subscribe(() => {
          this.ListadoInformacion();
          this.showMessage( 'success', 'Success',  this.mensajes.RegistroExitoso );
          this.visibleNuevo = false;
        },
        err => {
          console.error(err);
          this.showMessage( 'error', 'Error',  this.mensajes.RegistroError );
        }
      );        
      }else{
        this.showMessage( 'info',  'Info',  'Formulario Invalido');
      }
    } catch (error) {
      this.showMessage( 'info',  'Info',  'Formulario Invalido');
    }
  }*/

  /*async RegistrarActualizacion(){
    if(this.objSeleccion.nombre.trim()){
      console.log("aqui")
      const data = await new Promise<any>(resolve => this.servicios.ActualizacionAdmin(this.objSeleccion.admin_id,this.objSeleccion.nombre).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data){
        await this.ListadoInformacion();
        this.showMessage('success', 'Success', this.mensajes.ActualizacionExitosa);
        this.visibleEditar = false;
      }else{
        this.showMessage( 'error', 'Error',  this.mensajes.ActualizacionError );
      }
    }else{
      this.showMessage( 'info',  'Info',  'Formulario Invalido' ); 
    }
  }*/

  async EstadoCambiarActualizacion(){
    let estado:any;
    if(this.objSeleccion.estado){
      estado=false;
    }else{
      estado=true;
    }
    console.log("aqui")
    const data = await new Promise<any>(resolve => this.servicios.ActualizacionEstadoCiudadano(this.objSeleccion.idcredencial,this.objSeleccion.ciudadano_id,estado).subscribe(translated => { resolve(translated) }));
    console.log(data)
    if (data) {
      await this.ListadoInformacion();
      this.showMessage('success', 'Success', this.mensajes.ActualizacionExitosa);
      this.visibleEstado = false;
    } else {
      this.showMessage('error', 'Error', this.mensajes.ActualizacionError);
    }
  }

  async EliminarAdministrador() {
    try {
      console.log(this.objSeleccion.idcredencial +"---" +this.objSeleccion.admin_id);

      this.servicios.EliminarAdmin(this.objSeleccion.idcredencial, this.objSeleccion.admin_id)
      .subscribe(() => {
        this.ListadoInformacion();
        this.showMessage('success', 'Success', 'Administrador eliminado exitosamente');
        this.visibleEliminar = false;
      },
      err => {
        console.error(err);
        this.showMessage('error', 'Error', 'Error al eliminar Administrador');
      }
      );
    } catch (error) {
      console.error('Error in EliminarAdministrador:', error);
      this.showMessage('error', 'Error', 'Error al eliminar Administrador');
    }
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }

}
