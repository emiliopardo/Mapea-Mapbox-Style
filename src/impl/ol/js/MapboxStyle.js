/**
 * @module M/impl/layer/MapboxStyle
 */

/**
 * @classdesc
 * @api
 */
class MapboxStyle extends M.impl.layer.MVT {
  /**
   * @classdesc
   * Main constructor of the class. Creates a MapboxStyle implementation layer
   * with parameters specified by the user
   *
   * @constructor
   * @implements {M.impl.Layer}
   * @param {Mx.parameters.LayerOptions} options custom options for this layer
   * @param {Object} vendorOptions vendor options for the base library
   * @api
   */
  constructor(parameters, options = {}, vendorOptions = {}) {
    // calls the super constructor
    super(options, vendorOptions);
    /**
     *
     * @private
     * @type {ol.format.MVT}
     */
    this.formater_ = null;

    /**
     *
     * @private
     * @type {Number}
     */
    this.lastZoom_ = -1;

    /**
     * Projection of the layer.
     *
     * @private
     * @type {ol.proj.Projection}
     */
    this.projection_ = parameters.projection || 'EPSG:3857';

    /**
     * Features of the openlayers source
     * @private
     * @type {ol.render.Feature | ol.Feature}
     */
    this.features_ = [];

    /**
     * Render mode of the layer. Possible values: 'render' | 'feature'.
     *
     * @private
     * @type {string}
     */
    this.mode_ = parameters.mode;

    /**
     * Loaded flag attribute
     *
     * @private
     * @type {bool}
     */
    this.loaded_ = false;
  }

  /**
   * This function checks if an object is equals
   * to this layer
   *
   * @public
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
}

export default MapboxStyle;
