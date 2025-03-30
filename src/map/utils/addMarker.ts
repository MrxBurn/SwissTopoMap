import { Feature, Map, MapBrowserEvent } from "ol";
import { Point } from "ol/geom";
import { Vector as SourceVector } from "ol/source";
import { redMarker } from "../styles/markerStyles";

export const addMarker = (
  map: Map,
  vectorSource: SourceVector
): (() => void) => {
  const clickHandler = (evt: MapBrowserEvent<UIEvent>) => {
    const location = evt.coordinate;
    const x = location[0];
    const y = location[1];

    const createdMarker = new Feature({
      geometry: new Point([x, y]),
      name: "add a meaningful name",
    });

    createdMarker.setStyle(redMarker);
    vectorSource.addFeature(createdMarker);
  };

  map.on("click", clickHandler);

  return () => {
    map.un("click", clickHandler);
  };
};
