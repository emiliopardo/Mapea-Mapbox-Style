import { MapboxStyle } from 'facade/index.js';

const mapjs = M.map({
  container: 'map',
  projection: 'EPSG:3857*m',
  center: {
    x: -575849.044,
    y: 4497865.157,
    draw: false
  },
  controls: ['layerswitcher', 'panzoombar', 'mouse'],
  layers: [new M.layer.OSM(),new M.layer.WMS({
      url: 'https://ideandalucia.es/wms/ortofoto2016?',
      name: 'ortofotografia_2016_rgb',
      legend: 'Ortofoto 2016',
      version: '1.1.1',
      transparent: false,
      tiled: true
    })],
  zoom: 6
});



// Capa MVT
let mapa_andalucia_color = new MapboxStyle({
  url: 'https://ws205.juntadeandalucia.es/tileserver/data/mapa_andalucia/{z}/{x}/{y}.pbf',
  style: 'https://ws205.juntadeandalucia.es/tileserver/styles/mapa_andalucia/style.json',
  name: 'Mapa de Andalucia',
  sourceName: 'mapa_andalucia',
  projection: 'EPSG:3857',
});

let mapa_andalucia_fondo_negro = new MapboxStyle({
  url: 'https://ws205.juntadeandalucia.es/tileserver/data/mapa_andalucia/{z}/{x}/{y}.pbf',
  style: 'https://factorylab02.ieca.junta-andalucia.es/tileserver/styles/mapa_andalucia_gray_scale_fondo_negro/style.json',
  name: 'Mapa de Andalucia fondo negro',
  sourceName: 'mapa_andalucia',
  projection: 'EPSG:3857',
});


let osm_andalucia_color = new MapboxStyle({
  url: 'https://factorylab02.ieca.junta-andalucia.es/tileserver/data/mapa_andalucia_osm/{z}/{x}/{y}.pbf',
  style: 'https://factorylab02.ieca.junta-andalucia.es/tileserver/styles/style-osm-bright/style.json',
  name: 'Open Street Maps',
  sourceName: 'mapa_andalucia_osm',
  projection: 'EPSG:3857',
});

mapjs.addLayers([mapa_andalucia_color,osm_andalucia_color,mapa_andalucia_fondo_negro]);
// mapjs.addLayers([mapa_andalucia_color]);
// mapjs.addLayers([mapa_andalucia_fondo_negro]);
// mapa_andalucia_fondo_negro.transparent = false;
// osm_andalucia_color.transparent = false;
//  osm_andalucia_color.transparent = false;
// mapjs.getLayers()[0].setOpacity(0);

console.log(mapjs.getLayers())