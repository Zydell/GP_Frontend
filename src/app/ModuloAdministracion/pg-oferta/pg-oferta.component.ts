import { Component,OnInit } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { SortingService } from '../../sorting.service'; // Adjust the path as needed


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
  minDate: string = '';
  minDatefin: string = this.minDate;
  maxDate: string = '';
  fecha_fin:Date=new Date(new Date().setDate(new Date().getDate() + 1));
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
 const today = new Date(new Date().setDate(new Date().getDate() -1));
  this.minDate = this.formatDate(today);
}

onNegocioChange(event: any) {
  this.negocio_id = event.target.value;
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
  const today = new Date();
  this.descripcion="";
  this.gc_necesarios = 0;
  this.fecha_inicio = (new Date());
  this.fecha_fin = new Date(new Date().setDate(new Date().getDate() + 1));
  this.visibleNuevo = true;
}
ModalEditarInformacion(seleccion:any) {
  this.objSeleccion = { ...seleccion };
  console.log(this.objSeleccion)
    this.visibleEditar = true;
}
ModalCambiarEstado(seleccion:any) {
  this.objSeleccion = { ...seleccion };
  if(this.objSeleccion.bl_estado){
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
      return `${data.nombre} - Propietario: ${data.propietario}`
    } catch (error) {
      return 'Error al buscar el negocio';
    }
  }
  

  async RegistrarNuevo() {
    if (this.descripcion && this.gc_necesarios > 0 && this.fecha_inicio && this.fecha_fin) {
      try {
        const response = await this.servicios.NuevaOferta(
          this.descripcion,
          this.gc_necesarios,
          this.negocio_id,
          this.fecha_inicio,
          this.fecha_fin
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
      }
    } else {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Por favor complete todos los campos' });
    }
  }
  

  async RegistrarActualizacion(){
    if(this.objSeleccion.int_valor!=""){
      console.log("aqui")
      const data = await new Promise<any>(resolve => this.servicios.ActualizacionDimension(this.objSeleccion.id_dimension,this.objSeleccion.int_valor).subscribe(translated => { resolve(translated) }));
      //const data = await new Promise<any>(resolve => this.servicios.ActualizacionDimension(this.strEstado,this.objSeleccion.ounombre).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data.success){
        await this.ListadoInformacion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.ActualizacionExitosa });
        this.visibleEditar = false;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.ActualizacionError });
      }
    }else{
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this.mensajes.IngreseNombre }); 
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