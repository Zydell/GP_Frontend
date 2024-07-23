import { Component } from '@angular/core';

@Component({
  selector: 'app-server-error',
  template: `
    <div class="error-message">
      <h1>Servidor no disponible</h1>
      <p>El servidor no se encuentra encendido en este momento. Por favor, inténtelo más tarde.</p>
    </div>
  `,
  styles: [`
    .error-message {
      text-align: center;
      margin-top: 50px;
    }
  `]
})
export class ServerErrorComponent {}
