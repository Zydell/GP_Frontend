import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  constructor() { }

  ordenarPorIdAscendente(lista: any[], idField: string): any[] {
    return lista.sort((a: any, b: any) => a[idField] - b[idField]);
  }

  ordenarPorIdDescendente(lista: any[], idField: string): any[] {
    return lista.sort((a: any, b: any) => b[idField] - a[idField]);
  }

  ordenarPorNombreAscendente(lista: any[], nameField: string): any[] {
    return lista.sort((a: any, b: any) => {
      const nameA = a[nameField].toLowerCase();
      const nameB = b[nameField].toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  ordenarPorNombreDescendente(lista: any[], nameField: string): any[] {
    return lista.sort((a: any, b: any) => {
      const nameA = a[nameField].toLowerCase();
      const nameB = b[nameField].toLowerCase();
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    });
  }
  ordenarPorFechaAscendente(lista: any[], dateField: string): any[] {
    return lista.sort((a: any, b: any) => new Date(a[dateField]).getTime() - new Date(b[dateField]).getTime());
  }

  ordenarPorFechaDescendente(lista: any[], dateField: string): any[] {
    return lista.sort((a: any, b: any) => new Date(b[dateField]).getTime() - new Date(a[dateField]).getTime());
  }
}
