import { crearMenu } from './interfaz.js';

const osm = new L.tileLayer('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 1
  }
);

const mapaDeGoogle = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',{
  minZoom:1
});

const darkm = new L.tileLayer('http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  minZoom: 1,
  maxZoom: 16
});

const mapaIGN = new L.tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
  minZoom: 1,
  maxZoom: 16
});

const mapaDeReferencia = L.map('mapa', {
    center: ["-20.3308", "-60.1277"],
    zoom: 3,
    layers: [mapaDeGoogle]
});

const baseLayers = {
  "Google Satelite": mapaDeGoogle,
  "Dark Matter": darkm,
  "OSM": osm,
  "Mapa IGN": mapaIGN
};

// Agrego los controles
L.control.scale().addTo(mapaDeReferencia);
L.control.layers(baseLayers).addTo(mapaDeReferencia);

crearMenu(mapaDeReferencia);
