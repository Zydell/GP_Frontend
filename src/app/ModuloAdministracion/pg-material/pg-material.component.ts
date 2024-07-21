import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciviosVarios } from '../../ModuloServiciosWeb/ServiciosTestVarios.component';
import { Mensajes } from '../../ModuloHerramientas/Mensajes.component';
import { MessageService } from 'primeng/api';
import { SortingService } from '../../sorting.service'; // Adjust the path as needed
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pg-material',
  templateUrl: './pg-material.component.html',
  styleUrls: ['./pg-material.component.css'],
  providers: [MessageService]
})
export class PgMaterialComponent implements OnInit {
  @ViewChild('dt1') table!: Table;

  lsListado: any[] = [];
  objSeleccion: any = "-1";
  intvalor: number = 0;
  strnombre: string = "";
  strEstado: string = "";
  visibleEditar: boolean = false;
  visibleEstado: boolean = false;
  visibleNuevo: boolean = false;

  constructor(
    private servicios: ServiciviosVarios,
    private messageService: MessageService,
    private mensajes: Mensajes,
    private sortingService: SortingService
  ) {}

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

  ModalNuevoInformacion() {
    this.intvalor = 0;
    this.strnombre = "";
    this.visibleNuevo = true;
  }

  ModalEditarInformacion(seleccion: any) {
    this.objSeleccion = { ...seleccion };
    console.log(this.objSeleccion)
    this.visibleEditar = true;
  }

  ModalCambiarEstado(seleccion: any) {
    this.objSeleccion = seleccion;
    if (this.objSeleccion.estado) {
      this.strEstado = "Desactivar";
    } else {
      this.strEstado = "Activar";
    }
    console.log(this.objSeleccion)
    this.visibleEstado = true;
  }

  async ListadoInformacion() {
    const data = await new Promise<any>(resolve => this.servicios.ListadoMaterial().subscribe(translated => { resolve(translated) }));
    console.log(data)

    if (data) {
      this.lsListado = this.sortingService.ordenarPorIdAscendente(data, 'materiales_id'); // Default sorting by ID Ascending
    }
  }

  async RegistrarNuevo() {
    if (this.intvalor > 0 && this.strnombre != "") {
      console.log("aqui")
      const data = await new Promise<any>(resolve => this.servicios.NuevoMaterial(this.intvalor, this.strnombre).subscribe(translated => { resolve(translated) }));
      console.log(data)
      this.showMessage('success', 'Success', this.mensajes.RegistroExitoso);
      if (data) {
        await this.ListadoInformacion();
        this.visibleNuevo = false;
      } else {
        this.showMessage('error', 'Error', this.mensajes.RegistroError);
      }
    } else {
      this.showMessage('error', 'Error', "Formulario Inválido");
    }
  }

  async RegistrarActualizacion() {
    if (this.objSeleccion.tipo != "" && this.objSeleccion.valor_por_libra > 0) {
      console.log("aqui")
      const data = await new Promise<any>(resolve => this.servicios.ActualizacionMaterial(this.objSeleccion.materiales_id, this.objSeleccion.tipo, this.objSeleccion.valor_por_libra).subscribe(translated => { resolve(translated) }));
      console.log(data)
      this.showMessage('success', 'Success', this.mensajes.ActualizacionExitosa);
      if (data) {
        await this.ListadoInformacion();
        this.visibleEditar = false;
      } else {
        this.showMessage('error', 'Error', this.mensajes.ActualizacionError);
      }
    } else {
      this.showMessage('error', 'Error', "Formulario Inválido");
    }
  }

  async EstadoCambiarActualizacion() {
    let estado: any;
    if (this.objSeleccion.estado) {
      estado = false;
    } else {
      estado = true;
    }
    console.log("aqui")
    const data = await new Promise<any>(resolve => this.servicios.EstadoCambiarMaterial(this.objSeleccion.materiales_id, estado).subscribe(translated => { resolve(translated) }));
    console.log(data)
    if (data) {
      await this.ListadoInformacion();
      this.showMessage('success', 'Success', this.mensajes.ActualizacionExitosa);
      this.visibleEstado = false;
    } else {
      this.showMessage('error', 'Error', this.mensajes.ActualizacionError);
    }
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }
}
