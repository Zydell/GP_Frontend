import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SortingService } from '../../sorting.service'; // Adjust the path as needed


@Component({
  selector: 'app-pg-negocio',
  templateUrl: './pg-negocio.component.html',
  styleUrls: ['./pg-negocio.component.css'],
  providers: [MessageService]
})
export class PgNegocioComponent implements OnInit{
  @ViewChild('dt1') table!: Table;

  lsListado:any=[];
  objSeleccion:any="-1";

  nombre:any="";
  propietario :any="";
  tipo_negocio :any="";
  direccion:any="";
  telefono :any="";
  fecharegistro: Date | null = null;
  correo_electronico: string = "";
  contrasena: string = "";

  maxDate: string = '';
  uploadedFiles: any[] = [];

  strEstado:any="";
  visibleEditar: boolean=false;
  visibleEstado: boolean=false;
  visibleNuevo: boolean=false;
  selectedSize: any = 'p-datatable-sm';
  constructor
  (
    private servicios: ServiciviosVarios,
    private messageService: MessageService,
    private mensajes:Mensajes,
    private sortingService: SortingService
  ) { }
  
  async ngOnInit() {
    await this.ListadoInformacion();
    const today = new Date(new Date().setDate(new Date().getDate() -1));
    this.maxDate = this.formatDate(today);
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.table.filterGlobal(input.value, 'contains');
    }
  }

  clear(table: Table) {
    table.clear();
    this.ListadoInformacion();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFiles = [file];
      //this.messages2 = [{:'success', 'Éxito', 'Imagen cargada correctamente con el nuevo xd'}];
      //this.autoCloseMessages('messages2');
    }
  }

  ModalEditarInformacion(seleccion:any) {
    this.objSeleccion = { ...seleccion };
    this.objSeleccion.fecharegistro = this.formatDate(this.objSeleccion.fecharegistro);
    this.uploadedFiles = [];
    console.log(this.objSeleccion)
    this.visibleEditar = true;
  }

  ModalCambiarEstado(seleccion:any) {
    this.objSeleccion = { ...seleccion };
    if(this.objSeleccion.estado){
      this.strEstado="Desactivar";
    }else{
      this.strEstado="Activar";
    }
    console.log(this.objSeleccion)
    this.visibleEstado = true;
  }

  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.servicios.ListadoNegocios().subscribe(translated => { resolve(translated) }));
    console.log(data)
    if (data) {
      for (let negocio of data) {
        // Buscar el correo del admin
        const correo = await this.BuscarcorreoNegocio(negocio.negocio_id);
        if (correo) {
          negocio.correo = correo.correo_electronico;
          negocio.idcredencial = correo.credencial_id;
        } else {
          negocio.correo = 'No email found';
          negocio.idcredencial = 'No credential found';
        }
      }
      this.lsListado= this.sortingService.ordenarPorIdAscendente(data,'negocio_id') ;
    }
  }
  
  async BuscarcorreoNegocio(id: number): Promise<any> {
    try {
      const data = await this.servicios.CredencialIduserType(id,2).toPromise();
      return data;
    } catch (error) {
      console.error('Error in Busca rcorreo :', error);
      return null;
    }
  }

  formatDate(date: Date | string | null): string {
    if (!date) {
      return ''; // Retorna vacío si la fecha es null o undefined
    }
  
    // Si date es una cadena, intenta convertirla a un objeto Date
    if (typeof date === 'string') {
      date = new Date(date);
    }
  
    // Verifica que date sea realmente un objeto Date válido
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return ''; // Retorna vacío si no es una fecha válida
    }
  
    // Convertir la fecha a formato deseado
    const isoString = date.toISOString();
    const datePart = isoString.split('T')[0]; // Obtener YYYY-MM-DD de la cadena ISO
    return datePart;
  }
  
  async RegistrarActualizacion() {
    if (this.objSeleccion.nombre.length>9 &&
        this.objSeleccion.propietario.length>9 &&
        this.objSeleccion.tipo_negocio.length>5 &&
        this.objSeleccion.direccion.length>5 &&
        this.objSeleccion.telefono.length == 10) {
  
      console.log("aqui");
  
      const formData = new FormData();
      formData.append('nombre', this.objSeleccion.nombre);
      formData.append('propietario', this.objSeleccion.propietario);
      formData.append('tipo_negocio', this.objSeleccion.tipo_negocio);
      formData.append('direccion', this.objSeleccion.direccion);
      formData.append('telefono', this.objSeleccion.telefono);
  
      if (!(this.objSeleccion.fecharegistro instanceof Date)) {
        this.objSeleccion.fecharegistro = new Date(this.objSeleccion.fecharegistro);
      }
  
      if (this.objSeleccion.fecharegistro) {
        formData.append('fecharegistro', this.objSeleccion.fecharegistro.toISOString());
      }
  
      if (this.uploadedFiles.length > 0) {
        formData.append('image', this.uploadedFiles[0], this.uploadedFiles[0].name);
      }
  
      // Imprime el contenido del FormData para verificación
      for (const pair of (formData as any).entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
  
      try {
        const data = await new Promise<any>(resolve => 
          this.servicios.ActualizacionNegocio(this.objSeleccion.negocio_id, formData).subscribe(response => {
            resolve(response);
          })
        );
  
        console.log(data);
  
        if (data) {
          await this.ListadoInformacion();
          this.showMessage(  'success',  'Éxito',  this.mensajes.ActualizacionExitosa );
          this.visibleEditar = false;
        } else {
          this.showMessage( 'error',  'Error',  this.mensajes.ActualizacionError );
        }
      } catch (error) {
        this.showMessage('error',  'Error',  'Ocurrió un error al actualizar el negocio' );
        console.error(error);
      }
    } else {
      this.showMessage( 'info',  'Info',  'Por favor complete todos los campos' );
    }
  }

  async EstadoCambiarActualizacion(){
    var estado:any;
    if(this.objSeleccion.estado){
      estado=false;
    }else{
      estado=true;
    }
      console.log("aqui")
      const formData = new FormData();
      formData.append('estado', estado);
      const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarNegocio(this.objSeleccion.credencial_id,this.objSeleccion.negocio_id,formData).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data){
        await this.ListadoInformacion();
        this.showMessage('success',  'Success',  this.mensajes.ActualizacionExitosa );
        this.visibleEstado = false;
      }else{
        this.showMessage( 'error',  'Error',  this.mensajes.ActualizacionError);
      }
 
  }
  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }
}


