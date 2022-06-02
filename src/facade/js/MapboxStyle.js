/* eslint-disable no-console */
/* eslint-disable  no-loop-func */
/**
 * @module M/layer/MapboxStyle
 */
import MapboxStyleImpl from 'impl/MapboxStyle.js';
import { applyStyle } from 'ol-mapbox-style';
/**
 * Possibles modes of MapboxStyle
 *
 * @const
 * @public
 * @api
 */
export const mode = {
  RENDER: 'render',
  FEATURE: 'feature',
};

/**
 * @classdesc
 * Main constructor of the class. Creates a MapboxStyle layer
 * with parameters specified by the user
 * @api
 */
class MapboxStyle extends M.layer.Vector {
  constructor(userParameters = {}, options = {}, vendorOptions = {}) {
    M.layer.type.registerLayerType(M.layer.type.MapboxStyle);
    const impl = new MapboxStyleImpl(userParameters, options, vendorOptions);
    super(userParameters, options, vendorOptions, impl);
    this.setMapboxStyle(userParameters.style, userParameters.sourceName);
  }

  /**
   * @getter
   * @api
   */
  get type() {
    return M.layer.type.MapboxStyle;
  }

  /**
   * @setter
   * @api
   */
  set type(newType) {
    if (!M.utils.isUndefined(newType) &&
      !M.utils.isNullOrEmpty(newType) && (newType !== M.layer.type.MapboxStyle)) {
      M.eException('El tipo de capa debe ser \''.concat(M.layer.type.MapboxStyle).concat('\' pero se ha especificado \'').concat(newType).concat('\''));
    }
  }

  /**
   * This method calculates the maxExtent of this layer:
   * 1. Check if the user specified a maxExtent parameter
   * 2. Gets the map maxExtent
   * 3. Sets the maxExtent from the map projection
   *
   * @function
   * @api
   */
  getMaxExtent() {
    let maxExtent = this.userMaxExtent; // 1
    if (M.utils.isNullOrEmpty(maxExtent)) {
      maxExtent = this.map_.userMaxExtent; // 2
      if (M.utils.isNullOrEmpty(maxExtent)) {
        maxExtent = this.map_.getProjection().getExtent(); // 3
      }
    }
    return maxExtent;
  }

  /**
   * This method calculates the maxExtent of this layer:
   * 1. Check if the user specified a maxExtent parameter
   * 2. Gets the map maxExtent
   * 3. Sets the maxExtent from the map projection
   * Async version of getMaxExtent
   *
   * @function
   * @api
   */
  calculateMaxExtent() {
    return new Promise(resolve => resolve(this.getMaxExtent()));
  }

  /**
   * This function sets the style to layer
   *
   * @function
   * @public
   * @param {M.Style}
   * @param {bool}
   */
  setStyle(styleParam, applyToFeature = false, defaultStyle = MapboxStyle.DEFAULT_OPTIONS_STYLE) {
    super.setStyle(styleParam, applyToFeature, defaultStyle);
  }


  setMapboxStyle(mapboxStyle, sourceName) {
    this.once(M.evt.LOAD, () => {
      if (!mapboxStyle) {
        this.setStyle();
      } else {
        fetch(mapboxStyle).then(response => response.json())
          .then((data) => {
            const layers = data.layers;
            let find = false;
            do {
              for (let index = 0; index < layers.length; index += 1) {
                // const layer = layers[index];
                // const mapcontainer = document.getElementsByClassName('m-mapea-container');
                // if (layer.id === 'background') {
                //   mapcontainer[0].style.backgroundColor = Object.values(layer.paint)[0];
                //   find = true;
                // }
                // } else {
                //   mapcontainer[0].style.backgroundColor = 'transparent';
                // }
              }
              find = true;
            } while (!find);
            const style = data;
            const olmvt = this.getImpl();
            applyStyle(olmvt.ol3Layer, style, sourceName, 'fixtures/osm-liberty/');
          });
      }
    });
  }

  /**
   * This function gets the projection of the map.
   * @function
   * @public
   * @api
   */
  getProjection() {
    return this.getImpl().getProjection();
  }

  /**
   * Gets the geometry type of the layer.
   * @function
   * @public
   * @return {string} geometry type of layer
   * @api
   */
  getGeometryType() {
    let geometry = null;
    const features = this.getFeatures();
    if (!M.utils.isNullOrEmpty(features)) {
      const firstFeature = features[0];
      if (!M.utils.isNullOrEmpty(firstFeature)) {
        geometry = firstFeature.getType();
      }
    }
    return geometry;
  }

  /**
   * Returns all features.
   *
   * @function
   * @public
   * @return {Array<M.RenderFeature>} Features
   * @api
   */
  getFeatures() {
    const features = this.getImpl().getFeatures();

    return features.map(olFeature => M.impl.RenderFeature.olFeature2Facade(olFeature));
  }

  /**
   * This function checks if an object is equals
   * to this layer
   *
   * @function
   * @api
   */
  equals(obj) {
    let equals = false;

    if (obj instanceof MapboxStyle) {
      equals = this.name === obj.name;
    }
    return equals;
  }

  setFilter() { }

  addFeatures() { }

  removeFeatures() { }

  refresh() { }

  redraw() { }

  toGeoJSON() { }
}

/**
 * Style options by default for this layer
 *
 * @const
 * @type {object}
 * @public
 * @api
 */
MapboxStyle.DEFAULT_PARAMS = {
  fill: {
    color: '#fff',
    opacity: 0.6,
  },
  stroke: {
    color: '#827ec5',
    width: 2,
  },
  radius: 5,
};

/**
 * Default generic style for this layer
 * @const
 * @type {object}
 * @public
 * @api
 */
MapboxStyle.DEFAULT_OPTIONS_STYLE = {
  point: {
    ...MapboxStyle.DEFAULT_PARAMS,
  },
  line: {
    ...MapboxStyle.DEFAULT_PARAMS,
  },
  polygon: {
    ...MapboxStyle.DEFAULT_PARAMS,
  },
};

export default MapboxStyle;
