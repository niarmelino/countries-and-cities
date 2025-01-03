import { crearMenu } from './interfaz.js';

var osm = new L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 1
  }
);

var mapaDeReferencia = L.map('mapa', {
    center: ["-20.3308", "-60.1277"],
    zoom: 3,
    layers: [osm]
});

crearMenu(mapaDeReferencia);
