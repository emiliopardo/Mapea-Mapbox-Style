import { MapboxStyle } from 'facade/index.js';

const osm = new M.layer.OSM();

const ortofoto2016_color = new M.layer.WMS({
  url: 'https://ideandalucia.es/wms/ortofoto2016?',
  name: 'ortofotografia_2016_rgb',
  legend: 'Ortofoto 2016 Color ',
  version: '1.1.1',
  transparent: false,
  tiled: true
});

const ortofoto2016_pancromatica = new M.layer.WMS({
  url: 'https://ideandalucia.es/wms/ortofoto2016?',
  name: 'ortofotografia_2016_pancromatico',
  legend: 'Ortofoto 2016 Escala de Grises',
  version: '1.1.1',
  transparent: false,
  tiled: true
});

const fondo_blanco = new M.layer.WMS({
  url: 'https://www.ideandalucia.es/services/andalucia/wms?',
  name: 'andalucia:btn100_0101s_uni_admin_paises',
  legend: 'Sin Fondo',
  version: '1.1.1',
  transparent: false,
  tiled: true
})

fondo_blanco.setOpacity(0)

// Capa MVT
const mapa_andalucia_color = new MapboxStyle({
  url: 'https://ws205.juntadeandalucia.es/tileserver/data/mapa_andalucia/{z}/{x}/{y}.pbf',
  style: 'https://ws205.juntadeandalucia.es/tileserver/styles/mapa_andalucia/style.json',
  name: 'Mapa de Andalucia',
  sourceName: 'mapa_andalucia',
  projection: 'EPSG:3857',
});

const mapa_andalucia_fondo_negro = new MapboxStyle({
  url: 'https://ws205.juntadeandalucia.es/tileserver/data/mapa_andalucia/{z}/{x}/{y}.pbf',
  style: 'https://factorylab02.ieca.junta-andalucia.es/tileserver/styles/mapa_andalucia_gray_scale_fondo_negro/style.json',
  name: 'Mapa de Andalucia fondo negro',
  sourceName: 'mapa_andalucia',
  projection: 'EPSG:3857',
});


const osm_andalucia_color = new MapboxStyle({
  url: 'https://ws205.juntadeandalucia.es/tileserver/data/mapa_andalucia_osm/{z}/{x}/{y}.pbf',
  style: 'https://ws205.juntadeandalucia.es/tileserver/styles/style-osm-bright/style.json',
  name: 'Open Street Maps',
  sourceName: 'mapa_andalucia_osm',
  projection: 'EPSG:3857',
});



const mapjs = M.map({
  container: 'map',
  projection: 'EPSG:3857*m',
  center: {
    x: -575849.044,
    y: 4497865.157,
    draw: false
  },
  controls: ['layerswitcher', 'panzoombar', 'mouse'],
  layers: [osm, ortofoto2016_color, ortofoto2016_pancromatica, fondo_blanco],
  // layers: [[mapa_andalucia_color,osm_andalucia_color,mapa_andalucia_fondo_negro]],
  zoom: 6
});

mapjs.addLayers([mapa_andalucia_color, osm_andalucia_color, mapa_andalucia_fondo_negro]);

// console.log(mapjs.getLayers())