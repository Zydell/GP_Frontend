import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';

let openInfoWindows: any[] = []; // Declare openInfoWindows as an array of google.maps.InfoWindow

@Component({
  selector: 'app-green-points-map',
  templateUrl: './green-points-map.component.html',
  styleUrls: ['./green-points-map.component.css']
})
export class GreenPointsMapComponent implements OnInit {
  
  constructor(private renderer: Renderer2, private http: HttpClient) { }

  ngOnInit(): void {
    this.loadGoogleMaps();
  }

  loadGoogleMaps(): void {
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBR6xZnxe2B4Kw9VvuKGLNk9RDN_X7O2DU&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = () => {
      this.initMap();
    };
    this.renderer.appendChild(document.body, script);
  }

  async initMap(): Promise<void> {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -1.6658965211679462, lng: -78.65942951207546 },
      zoom: 14,
    });

    try {
      const response = await this.http.get<any[]>('http://localhost:5000/api/puntos_verdes/activos').toPromise();
      if (!response) {
        throw new Error('Error al obtener los puntos verdes');
      }
      
      response.forEach(punto => {
        this.http.get<any>(`http://localhost:5000/api/negocios/${punto.negocio_id}`).subscribe(
          (negocio: any) => {
            const contentString = `
              <div>
                <h1>${negocio.nombre}</h1>
                <div>
                  <p>${punto.descripcion}</p>
                  <p>${punto.direccion}</p>
                </div>
              </div>`;
            const infoWindow = new google.maps.InfoWindow({
              content: contentString,
              ariaLabel: negocio.nombre,
            });
        
            const marker = new google.maps.Marker({
              position: { lat: punto.latitud, lng: punto.longitud },
              map,
              title: punto.descripcion,
              icon: {
                url: "assets/img/ubicacion.png",
                scaledSize: new google.maps.Size(60, 60)
              }
            });
            marker.addListener('click', () => {
              this.openInfoWindow(map, marker, infoWindow);
            });
          },
          (error: any) => {
            console.error('Error al obtener el negocio:', error.message);
          }
        );
      
      });
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }
  openInfoWindow(map: any, marker: any, infoWindow: any): void {
      // Close the oldest infoWindow if there are two open
      if (openInfoWindows.length >=1) {
        const oldestInfoWindow = openInfoWindows.shift();
        oldestInfoWindow?.close();
      }

      // Open the new infoWindow and add it to the array
      infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
      openInfoWindows.push(infoWindow);
    }
  }
