export {};

declare global {
  interface Window {
    initMap: () => void;
  }

  var google: {
    maps: {
      Map: any;
      Marker: any;
      Size: any;
      InfoWindow: any;
    };
  };
}
