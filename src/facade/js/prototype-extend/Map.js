const extendMap = () => {
  /**
   * This function gets the MapboxStyle layers added to the map
   *
   * @function
   * @param {Array<string>|Array<Mx.parameters.Layer>} layersParam
   * @returns {Array<M.layer.MapboxStyle>} layers from the map
   * @api
   */
  M.Map.prototype.getMapboxStyle = function getMapboxStyle(layersParamVar) {
    let layersParam = layersParamVar;

    if (M.utils.isNull(layersParam)) {
      layersParam = [];
    } else if (!M.utils.isArray(layersParam)) {
      layersParam = [layersParam];
    }

    const layers = this.getImpl().getMapboxStyle(layersParam).sort(Map.LAYER_SORT);

    return layers;
  };

  /**
   * This function adds the MapboxStyle layers to the map
   *
   * @function
   * @param {Array<string>|Array<Mx.parameters.MapboxStyle>} layersParam
   * @returns {Map}
   * @api
   */
  M.Map.prototype.addMapboxStyle = function addMapboxStyle(layersParamVar) {
    let layersParam = layersParamVar;
    if (!M.utils.isNullOrEmpty(layersParam)) {
      if (!M.utils.isArray(layersParam)) {
        layersParam = [layersParam];
      }

      const mapboxstyleLayers = [];
      layersParam.forEach((layerParam) => {
        if (M.utils.isObject(layerParam) && layerParam.type === M.layer.type.MapboxStyle) {
          layerParam.setMap(this);
          mapboxstyleLayers.push(layerParam);
        }
      });

      this.getImpl().addMapboxStyle(mapboxstyleLayers);
      this.fire(M.evt.ADDED_MAPBOX_STYLE, [mapboxstyleLayers]);
    }
    return this;
  };

  /**
   * This function removes the MapboxStyle layers to the map
   *
   * @function
   * @param {Array<string>|Array<Mx.parameters.MapboxStyle>} layersParam
   * @returns {Map}
   * @api
   */
  M.Map.prototype.removeMapboxStyle = function removeMapboxStyle(layersParam) {
    if (!M.utils.isNullOrEmpty(layersParam)) {
      const mapboxstyleLayers = this.getMapboxStyle(layersParam);
      if (mapboxstyleLayers.length > 0) {
        this.getImpl().removeMapboxStyle(mapboxstyleLayers);
      }
    }
    return this;
  };
};


export default extendMap;
