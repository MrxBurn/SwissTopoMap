import { Feature, Map } from "ol";
import { Point } from "ol/geom";
import { Vector as SourceVector } from "ol/source";
import { redMarker } from "../styles/markerStyles";

export const addMarker = (map: Map, vectorSource: SourceVector): void => {
  map.on("click", function (evt) {
    //add marker on click
    const location = evt.coordinate;

    console.log("cal");

    const x = location[0];
    const y = location[1];

    const createdMarker = new Feature({
      geometry: new Point([x, y]),
      name: "add a meaningful name",
    });

    createdMarker.setStyle(redMarker);
    vectorSource.addFeature(createdMarker);

    vectorSource.changed();
  });
};
