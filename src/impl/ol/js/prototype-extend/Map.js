const extendMap = () => {
  M.impl.Map.Z_INDEX[M.layer.type.MapboxStyle] = 9999;
  /**
   * This function gets the MapboxStyle layers added to the map
   *
   * @function
   * @param {Array<M.Layer>} filters to apply to the search
   * @returns {Array<M.layer.MapboxStyle>} layers from the map
   */
  M.impl.Map.prototype.getMapboxStyle = function getMapboxStyle(filtersParam) {
    let foundLayers = [];
    let filters = filtersParam;

    const allLayers = this.layers_;
    const mapboxstyleLayers = allLayers.filter((layer) => {
      return (layer.type === M.layer.type.MapboxStyle);
    });

    if (M.utils.isNullOrEmpty(filters)) {
      filters = [];
    }
    if (!M.utils.isArray(filters)) {
      filters = [filters];
    }

    if (filters.length === 0) {
      foundLayers = mapboxstyleLayers;
    } else {
      filters.forEach((filterLayer) => {
        const filteredMapboxStyleLayers = mapboxstyleLayers.filter((mbtileLayer) => {
          let layerMatched = true;
          if (!foundLayers.includes(mbtileLayer)) {
            // type
            if (!M.utils.isNullOrEmpty(filterLayer.type)) {
              layerMatched = (layerMatched && (filterLayer.type === mbtileLayer.type));
            }
            // URL
            if (!M.utils.isNullOrEmpty(filterLayer.url)) {
              layerMatched = (layerMatched && (filterLayer.url === mbtileLayer.url));
            }
            // name
            if (!M.utils.isNullOrEmpty(filterLayer.name)) {
              layerMatched = (layerMatched && (filterLayer.name === mbtileLayer.name));
            }
            // legend
            if (!M.utils.isNullOrEmpty(filterLayer.legend)) {
              layerMatched = (layerMatched && (filterLayer.legend === mbtileLayer.legend));
            }
          } else {
            layerMatched = false;
          }
          return layerMatched;
        });
        foundLayers = foundLayers.concat(filteredMapboxStyleLayers);
      });
    }
    return foundLayers;
  };

  /**
   * This function adds the MapboxStyle layers to the map
   *
   * @function
   * @param {Array<M.layer.MapboxStyle>} layers
   * @returns {Map}
   */
  M.impl.Map.prototype.addMapboxStyle = function addMapboxStyle(layers) {
    const baseLayers = this.getBaseLayers();
    const existsBaseLayer = (baseLayers.length > 0);

    layers.forEach((layer) => {
      // checks if layer is WFS and was added to the map
      if (layer.type === M.layer.type.MapboxStyle) {
        if (!M.utils.includes(this.layers_, layer)) {
          layer.getImpl().addTo(this.facadeMap_);
          this.layers_.push(layer);
          layer.setZIndex(layer.getZIndex());
          if (layer.getZIndex() == null) {
            const zIndex = this.layers_.length + M.impl.Map.Z_INDEX[M.layer.type.MapboxStyle];
            layer.setZIndex(zIndex);
          }
          if (!existsBaseLayer) {
            this.updateResolutionsFromBaseLayer();
          }
        }
      }
    });

    return this;
  };

  /**
   * This function removes the MapboxStyle layers to the map
   *
   * @function
   * @param {Array<M.layer.MapboxStyle>} layers
   * @returns {Map}
   */
  M.impl.Map.prototype.removeMapboxStyle = function removeMapboxStyle(layers) {
    const mapboxstyleMapLayers = this.getMapboxStyle(layers);
    mapboxstyleMapLayers.forEach((mapboxstyleLayers) => {
      this.layers_ = this.layers_.filter(layer => !layer.equals(mapboxstyleLayers));
      mapboxstyleLayers.getImpl().destroy();
      mapboxstyleLayers.fire(M.evt.REMOVED_FROM_MAP, [mapboxstyleLayers]);
    });

    return this;
  };

  M.impl.Map.registerExternalFunction('addMapboxStyle', 'addLayers');
  M.impl.Map.registerExternalFunction('getMapboxStyle', 'getLayers');
  M.impl.Map.registerExternalFunction('removeMapboxStyle', 'removeLayers');
};


export default extendMap;
