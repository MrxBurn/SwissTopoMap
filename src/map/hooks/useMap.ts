import { Map } from "ol";
import { Vector as LayerVector } from "ol/layer";
import { Vector as SourceVector } from "ol/source";
import { defaults, ScaleLine } from "ol/control";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";

import { useEffect, useMemo, useRef } from "react";

import { redMarker } from "../styles/markerStyles";
import { initMap } from "../utils/initMap";
import { MarkerDetails, onMarkerClick } from "../utils/onMarkerClick";
import { addMarker } from "../utils/addMarker";

const useMap = (
  setMap: React.Dispatch<React.SetStateAction<Map | null>>,
  setMarkerDetails: React.Dispatch<React.SetStateAction<MarkerDetails | null>>,
  isEditEnabled: boolean
): void => {
  proj4.defs(
    "EPSG:2056",
    "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
  );
  register(proj4);

  const { iconFeature, backgroundLayer, view } = initMap();

  //set style from an array fetched from api
  iconFeature.setStyle(redMarker);

  const mapRef = useRef<Map | null>(null);
  // const vectorSource = useMemo(() => {
  //   return new SourceVector({
  //     features: [iconFeature],
  //   });
  // }, [iconFeature]);

  // const markerLayer = useMemo(() => {
  //   return new LayerVector({
  //     source: vectorSource,
  //   });
  // }, [vectorSource]);

  useEffect(() => {
    const vectorSource = new SourceVector({
      features: [iconFeature],
    });

    const markerLayer = new LayerVector({
      source: vectorSource,
    });

    if (!mapRef.current) {
      mapRef.current = new Map({
        target: "map",
        controls: defaults().extend([
          new ScaleLine({
            units: "metric",
          }),
        ]),
        layers: [backgroundLayer, markerLayer],
        view: view,
      });
      setMap(mapRef.current);
    }

    mapRef.current.setTarget("map");

    //TODO: FIX THIS now working with edit mode
    // if (isEditEnabled) addMarker(mapRef.current, vectorSource);

    onMarkerClick(mapRef.current, iconFeature, setMarkerDetails);

    return () => mapRef.current?.setTarget(undefined);
  }, [
    backgroundLayer,
    iconFeature,
    isEditEnabled,
    setMap,
    setMarkerDetails,
    view,
  ]);
};

export default useMap;
