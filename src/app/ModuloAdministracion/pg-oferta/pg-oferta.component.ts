import { Component,OnInit } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { SortingService } from '../../sorting.service'; // Adjust the path as needed
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse


@Component({
  selector: 'app-pg-oferta',
  templateUrl: './pg-oferta.component.html',
  styleUrls: ['./pg-oferta.component.css'],
  providers: [MessageService]
})
export class PgOfertaComponent implements OnInit{

  lsListado:any=[];
  sortOrder: number = 1; // 1 for asc, -1 for desc
  sortField: string = '';
  
  objSeleccion:any="-1";
  descripcion:string="";
  gc_necesarios:number=0;
  negocio_id:number=0;
  fecha_inicio: Date = new Date();
  fecha_fin: Date = new Date();

  minDate: string = '';
  maxDate: string = '';
  minDatefin: string = '';
  maxDatefin: string = '';
  
  estado:boolean=true;

  negocios: any[] = [];

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
  const today = new Date();
  const maxtoday = new Date(new Date().setDate(new Date().getDate() +90));
  //minDate = this.formatDate(this.today);
  this.minDate = this.formatDate(today); // Format today to yyyy-MM-dd
  this.maxDate = this.formatDate(maxtoday);
}

onNegocioChange(event: any) {
  this.negocio_id = event.target.value;
}

onNegocioChangeAct(event: any) {
  this.objSeleccion.negocio_id = event.target.value;
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

async cargarNegocios() {
  try {
    this.negocios = await new Promise<any[]>((resolve, reject) => {
      this.servicios.ListadoNegocios().subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err)
      });
    });
  } catch (error) {
    console.error('Error al cargar los negocios:', error);
  }
}

ModalNuevoInformacion() {
  this.cargarNegocios();
  this.fecha_fin = new Date();
  this.fecha_inicio =  new Date();
  this.descripcion = "";
  this.negocio_id = 0;
  this.gc_necesarios = 0;
  this.visibleNuevo = true;
}

onFechaInicioChange(event: any): void {
  const selectedDate = new Date(event.target.value);
  selectedDate.setDate(selectedDate.getDate() + 7);
  this.minDatefin = this.formatDate(selectedDate);
  const maxDate = new Date(selectedDate);
  maxDate.setDate(maxDate.getDate() + 83);
  this.maxDatefin = this.formatDate(maxDate);
}

onFechaInicioChangeAct(event: any): void {
  const selectedDate = new Date(event.target.value);
  selectedDate.setDate(selectedDate.getDate() + 7);
  this.minDatefin = this.formatDate(selectedDate);
  const maxDate = new Date(selectedDate);
  maxDate.setDate(maxDate.getDate() + 83);
  this.maxDatefin = this.formatDate(maxDate);
}

ModalEditarInformacion(seleccion:any) {
  this.objSeleccion = { ...seleccion };
  this.cargarNegocios();
  this.minDatefin = this.formatDate(this.objSeleccion.fecha_fin);
  console.log("ObjSeleccion"+this.objSeleccion)
  if (this.objSeleccion && this.objSeleccion.negocio_id) {
    this.negocio_id = this.objSeleccion.negocio_id;
    this.objSeleccion.fecha_inicio = this.formatDate(this.objSeleccion.fecha_inicio);
    this.objSeleccion.fecha_fin = this.formatDate(this.objSeleccion.fecha_fin)
  }
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
    const data = await new Promise<any>(resolve => this.servicios.ListadoOfertas().subscribe(translated => { resolve(translated) }));
    console.log(data)
    for (let oferta of data) {
      const negocioInfo = await this.Buscarnegocio(oferta.negocio_id);
      oferta.negocioInfo = negocioInfo;
    }
    this.lsListado = this.sortingService.ordenarPorIdAscendente(data, 'ofertas_id'); // Default sorting by ID Ascending
  }

  onSortChange(field: string) {
    if (this.sortField !== field) {
      this.sortOrder = this.sortOrder * -1; // Toggle sort order
    } else {
      this.sortField = field;
      this.sortOrder = 1; // Default to ascending
    }
    if (this.sortOrder === 1) {
      this.lsListado = this.sortingService.ordenarPorIdAscendente(this.lsListado, 'this.sortField');
    } else {
      this.lsListado = this.sortingService.ordenarPorIdDescendente(this.lsListado, 'this.sortField');
    }
  }

  async Buscarnegocio(idNegocio: number): Promise<string> {
    try {
      const data = await new Promise<any>((resolve, reject) => {
        this.servicios.NegocioId(idNegocio).subscribe({
          next: (translated) => resolve(translated),
          error: (err) => reject(err)
        });
      });
      return `${data.nombre} - Propietario: ${data.propietario} - Direccion: ${data.direccion}`
    } catch (error) {
      return 'Error al buscar el negocio';
    }
  }
  
  async RegistrarNuevo() {
    if (this.descripcion && this.gc_necesarios > 0 && this.negocio_id && this.fecha_inicio && this.fecha_fin) {
      try {
        const fechaFinISO = new Date(this.fecha_fin).toISOString(); // Add current time and convert to ISO 8601 format
        const fechaIniISO = new Date(this.fecha_inicio).toISOString();
        console.log(fechaIniISO+"+"+fechaFinISO+"-");
        console.log(this.fecha_fin+"+"+this.fecha_fin+"-");

        const response = await this.servicios.NuevaOferta(
          this.descripcion,
          this.gc_necesarios,
          this.negocio_id,
          this.fecha_inicio,
          this.fecha_fin
          /*fechaIniISO,
          fechaFinISO*/
        ).toPromise();
  
        if (response) {
          await this.ListadoInformacion();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.RegistroExitoso });
          this.visibleNuevo = false;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
        }
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar la oferta' });
        console.error('Error al registrar la oferta:', error);
        console.log(this.fecha_inicio+"+"+this.fecha_fin+"-");
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Por favor complete todos los campos' });
    }
  }
  

  async RegistrarActualizacion() {
    if (this.objSeleccion.descripcion && this.objSeleccion.gc_necesarios && this.objSeleccion.negocio_id && this.objSeleccion.fecha_inicio) {
      try {
        console.log("aqui");
        const data = await new Promise<any>((resolve, reject) => {
          this.servicios.ActualizarOferta(
            this.objSeleccion.ofertas_id,
            this.objSeleccion.descripcion,
            this.objSeleccion.gc_necesarios,
            this.objSeleccion.negocio_id,
            this.objSeleccion.fecha_inicio,
            this.objSeleccion.fecha_fin
          ).subscribe({
            next: (translated) => resolve(translated),
            error: (err) => reject(err)
          });
        });
  
        console.log(data);
        if (data) {
          await this.ListadoInformacion();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
          this.visibleEditar = false;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
        }
      } catch (error) {
        // Verificar si el error tiene las propiedades que esperamos
        if (this.isHttpErrorResponse(error)) {
          if (error.status === 400 && error.error.message) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la oferta' });
          }
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la oferta' });
        }
        console.error('Error al actualizar la oferta:', error);
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this.mensajes.IngreseNombre });
    }
  }
  
  // Método de ayuda para verificar si el error es un HttpErrorResponse
  private isHttpErrorResponse(error: any): error is HttpErrorResponse {
    return error && error.status !== undefined && error.error !== undefined;
  }
  
  

  async EstadoCambiarActualizacion() {
    let estado: boolean;
    
    if (this.objSeleccion.estado) {
      // If the current state is active, toggle to inactive
      estado = false;
    } else {
      // If the current state is inactive, toggle to active
      estado = true;
  
      // Check if fecha_fin is greater than the current date
      const today = new Date();
      const fechaFin = new Date(this.objSeleccion.fecha_fin);
      
      if (fechaFin <= today) {
        // If fecha_fin is not greater than today's date, show an error message
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Error', 
          detail: 'Actualice la fecha para poder Activarlo' 
        });
        return; // Exit the function early
      }
    }
    
    console.log("Estado:", estado);
    console.log("aqui")
    //const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarDimension(this.objSeleccion.id_dimension,estado).subscribe(translated => { resolve(translated) }));
    const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarOfertas(this.objSeleccion.ofertas_id,estado).subscribe(translated => { resolve(translated) }));
    console.log(data)
    if(data){
      await this.ListadoInformacion();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
      this.visibleEstado = false;
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
    }
  }
}  