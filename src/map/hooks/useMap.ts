import { Map } from "ol";
import { Vector as LayerVector } from "ol/layer";
import { Vector as SourceVector } from "ol/source";
import { defaults, ScaleLine } from "ol/control";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";

import { useEffect, useMemo, useRef } from "react";

import { redMarker } from "../styles/markerStyles";
import { useInitMap } from "./useInitMap";
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

  const { markers, backgroundLayer, view } = useInitMap();

  console.log(markers);

  //set style from an array fetched from api
  markers.forEach((marker) => {
    marker.setStyle(redMarker);
  });

  const mapRef = useRef<Map | null>(null);
  const vectorSource = useMemo(() => {
    return new SourceVector({
      features: markers,
    });
  }, [markers]);

  const initialMarkerLayer = useMemo(() => {
    return new LayerVector({
      source: vectorSource,
    });
  }, [vectorSource]);

  useEffect(() => {
    if (!markers.length) return; // wait for markers to load then load map

    if (!mapRef.current) {
      mapRef.current = new Map({
        target: "map",
        controls: defaults().extend([
          new ScaleLine({
            units: "metric",
          }),
        ]),
        layers: [backgroundLayer, initialMarkerLayer],
        view: view,
      });
      setMap(mapRef.current);
    }

    mapRef.current.setTarget("map");

    const newMarkersLayer = new LayerVector({
      source: vectorSource,
    });

    let removeMarkerListener: (() => void) | null = null;

    if (isEditEnabled) {
      mapRef.current.addLayer(newMarkersLayer);
      removeMarkerListener = addMarker(mapRef.current, vectorSource);
    }

    markers.forEach((marker) => {
      if (mapRef.current) {
        onMarkerClick(mapRef.current, marker, setMarkerDetails);
      }
    });

    if (markers.length) {
      mapRef.current.render();
      vectorSource.changed();
    }

    return () => {
      if (removeMarkerListener) removeMarkerListener(); // Remove event listener when unmounting or disabling edit mode
      mapRef.current?.setTarget(undefined);
    };
  }, [
    backgroundLayer,
    markers,
    isEditEnabled, // Depend on this flag so effect re-runs when it changes
    initialMarkerLayer,
    setMap,
    setMarkerDetails,
    vectorSource,
    view,
  ]);
};

export default useMap;
