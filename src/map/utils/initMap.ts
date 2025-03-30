import { View } from "ol";
import Feature from "ol/Feature";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import { redMarker } from "../styles/markerStyles";
import { Point } from "ol/geom";

export const initMap = (): {
  iconFeature: Feature;
  backgroundLayer: TileLayer;
  view: View;
} => {
  //can add any properties
  const iconFeature = new Feature({
    geometry: new Point(fromLonLat([8.53, 47.37])),
    title: "Zurich",
    description: "This is a marker for a place in Zurich",
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

  return {
    iconFeature,
    backgroundLayer,
    view,
  };
};
