import TileLayer from "ol/layer/Tile";
import { TileWMS } from "ol/source";
import { TileGrid } from "ol/tilegrid";
import { Map } from "ol";
import {
  TILEGRID_ORIGIN,
  TILEGRID_RESOLUTIONS,
  WMS_TILE_SIZE,
} from "../../config";

export const changeMapLayer = (map: Map, layerId?: string): void => {
  map
    .getLayers()
    .getArray()
    .forEach((layer) => {
      if (layer instanceof TileLayer && layer.getSource() instanceof TileWMS) {
        map.removeLayer(layer);
      }
    });

  const tiledWmsLayer = new TileLayer({
    opacity: 0.8,
    source: new TileWMS({
      params: [],
      url: `https://wms0.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=${layerId}&LANG=en`,
      gutter: 120,
      tileGrid: new TileGrid({
        // projection: "EPSG:2056",
        tileSize: WMS_TILE_SIZE,
        origin: TILEGRID_ORIGIN,
        resolutions: TILEGRID_RESOLUTIONS,
      }),
    }),
  });
  map.addLayer(tiledWmsLayer);
};
