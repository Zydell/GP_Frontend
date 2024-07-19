import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { SortingService } from '../../sorting.service'; // Adjust the path as needed
import { Table } from 'primeng/table';

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
    private mensajes:Mensajes
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
  }

  onUpload(event: any): void {
    this.uploadedFiles = event.files;
    console.log("XDXDXD "+ this.uploadedFiles);
  }

  ModalEditarInformacion(seleccion:any) {
    this.objSeleccion = { ...seleccion };
    console.log(this.objSeleccion)
    this.objSeleccion.fecharegistro = this.objSeleccion.fecharegistro, 'yyyy-MM-dd';
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
      this.lsListado=data;
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
    if (this.objSeleccion.nombre?.trim() &&
        this.objSeleccion.propietario?.trim() &&
        this.objSeleccion.tipo_negocio?.trim() &&
        this.objSeleccion.direccion?.trim() &&
        this.objSeleccion.telefono?.trim()) {
  
      console.log("aqui");
  
      const formData = new FormData();
      formData.append('nombre', this.objSeleccion.nombre.trim());
      formData.append('propietario', this.objSeleccion.propietario.trim());
      formData.append('tipo_negocio', this.objSeleccion.tipo_negocio.trim());
      formData.append('direccion', this.objSeleccion.direccion.trim());
      formData.append('telefono', this.objSeleccion.telefono.trim());
  
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
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: this.mensajes.ActualizacionExitosa });
          this.visibleEditar = false;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
        }
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al actualizar el negocio' });
        console.error(error);
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: "Formulario Inválido" });
    }
  }

  async EstadoCambiarActualizacion(){
    var estado:any;
    if(this.objSeleccion.bl_estado){
      estado=false;
    }else{
      estado=true;
    }
      console.log("aqui")
      //const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarDimension(this.objSeleccion.id_dimension,estado).subscribe(translated => { resolve(translated) }));
      const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarDimension(this.objSeleccion.id_dimension,estado).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data.success){
        await this.ListadoInformacion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
        this.visibleEstado = false;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
      }
 
  }
}


