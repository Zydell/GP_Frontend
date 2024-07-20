import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SortingService } from '../../sorting.service'; // Adjust the path as needed


@Component({
  selector: 'app-pg-puntoverde',
  templateUrl: './pg-puntoverde.component.html',
  styleUrls: ['./pg-puntoverde.component.css'],
  providers: [MessageService]
})
export class PgPuntoverdeComponent implements OnInit{
  @ViewChild('dt1') table!: Table;

  lsListado:any=[];

  objSeleccion:any="-1";
  
  descripcion:any="";

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

/*ModalEditarInformacion(seleccion:any) {
  this.objSeleccion = { ...seleccion };
  console.log(this.objSeleccion)
    this.visibleEditar = true;
}*/

ModalCambiarEstado(seleccion:any) {
  this.objSeleccion=seleccion;
  if(this.objSeleccion.estado){
    this.strEstado="Desactivar";
  }else{
    this.strEstado="Activar";
  }
  console.log(this.objSeleccion)
  this.visibleEstado = true;
}

  async ListadoInformacion() {

    const data = await new Promise<any>(resolve => this.servicios.ListadoPuntosVerdes().subscribe(translated => { resolve(translated) }));
    console.log(data)

    if (data) {
      for (let puntoverde of data) {
        const negocioInfo = await this.Buscarnegocio(puntoverde.negocio_id);
        puntoverde.negocioInfo = negocioInfo;
      }
      this.lsListado=this.sortingService.ordenarPorIdAscendente(data,'punto_verde_id');
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
      return `${data.nombre} - Propietario: ${data.propietario} - Dirección: ${data.direccion}`
    } catch (error) {
      console.error('Error al buscar el negocio:', error);
      return 'Error al buscar el negocio';
    }
  }
  /*async RegistrarNuevo(){
    if(this.descripcion!=""){
      console.log("aqui")
      const data = await new Promise<any>(resolve => this.servicios.NuevoPuntoVerde(this.descripcion,this.).subscribe(translated => { resolve(translated) }));
      console.log(data)
      if(data.success){
        await this.ListadoInformacion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.mensajes.RegistroExitoso });
        this.visibleNuevo = false;
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.mensajes.RegistroError });
      }
    }else{
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this.mensajes.IngreseNombre });
      
    }


  }
  async RegistrarActualizacion(){
    if(this.objSeleccion.descripcion!=""){
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
  }*/
  async EstadoCambiarActualizacion(){
    var estado:any;
    if(this.objSeleccion.estado){
      estado=false;
    }else{
      estado=true;
    }
      console.log("aqui")
      //const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarDimension(this.objSeleccion.id_dimension,estado).subscribe(translated => { resolve(translated) }));
      const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarPuntoVerde(this.objSeleccion.punto_verde_id,estado).subscribe(translated => { resolve(translated) }));
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