import { Feature, Map } from "ol";
import { Point } from "ol/geom";
import { Vector as SourceVector } from "ol/source";
import { redMarker } from "../components/markerStyles";

export const onMapClick = (
  map: Map,
  iconFeature: Feature,
  vectorSource: SourceVector
) => {
  map.on("click", function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });
    if (feature === iconFeature) {
      //get values of object - open popup
      // console.log(iconFeature.getProperties().name);
    }

    //add marker on click
    const location = evt.coordinate;

    const x = location[0];
    const y = location[1];

    const createdMarker = new Feature({
      geometry: new Point([x, y]),
      name: "add a meaningful name",
    });

    createdMarker.setStyle(redMarker);
    vectorSource.addFeature(createdMarker);
  });
};
