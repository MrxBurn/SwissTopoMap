import { Map } from "ol";
import { Vector as LayerVector } from "ol/layer";
import { Vector as SourceVector } from "ol/source";
import { defaults, ScaleLine } from "ol/control";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";

import { useEffect } from "react";

import { redMarker } from "../components/markerStyles";
import { initMap } from "../utils/initMap";
import { onMapClick } from "../utils/onMapClick";

const useMap = (): void => {
  useEffect(() => {
    proj4.defs(
      "EPSG:2056",
      "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
    );
    register(proj4);

    const { iconFeature, backgroundLayer, view } = initMap();

    //set style from an array fetched from api
    iconFeature.setStyle(redMarker);

    const vectorSource = new SourceVector({
      features: [iconFeature],
    });

    const markerLayer = new LayerVector({
      source: vectorSource,
    });

    const map = new Map({
      target: "map",
      controls: defaults().extend([
        new ScaleLine({
          units: "metric",
        }),
      ]),
      layers: [
        backgroundLayer,
        //How to add marker
        markerLayer,
      ],
      view: view,
    });

    onMapClick(map, iconFeature, vectorSource);

    // map.addLayer(tiledWmsLayer);

    return () => map.setTarget(undefined);
  }, []);
};

export default useMap;
