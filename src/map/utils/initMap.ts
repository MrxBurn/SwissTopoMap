import { View } from "ol";
import Feature from "ol/Feature";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import { redMarker } from "../components/markerStyles";
import { Point } from "ol/geom";

export const initMap = (): {
  iconFeature: Feature;
  backgroundLayer: TileLayer;
  view: View;
} => {
  //can add any properties
  const iconFeature = new Feature({
    geometry: new Point(fromLonLat([8.53, 47.37])),
    name: "Zurich",

    style: redMarker,
  });

  const backgroundLayer = new TileLayer({
    source: new XYZ({
      url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg`,
    }),
  });

  const view = new View({
    projection: "EPSG:3857",
    center: [900000, 5900000],
    zoom: 8.5,
  });

  // const layerId = "ch.bafu.wasser-gebietsauslaesse";
  // const tiledWmsLayer = new TileLayer({
  //   opacity: 0.8,
  //   source: new TileWMS({
  //     params: [],
  //     url: `https://wms0.geo.admin.ch/?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=${layerId}&LANG=en`,
  //     gutter: 120,
  //     tileGrid: new TileGrid({
  //       // projection: "EPSG:2056",
  //       tileSize: WMS_TILE_SIZE,
  //       origin: TILEGRID_ORIGIN,
  //       resolutions: TILEGRID_RESOLUTIONS,
  //     }),
  //   }),
  // });

  return {
    iconFeature,
    backgroundLayer,
    view,
  };
};
