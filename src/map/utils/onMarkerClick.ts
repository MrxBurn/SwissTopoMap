import { Feature, Map } from "ol";

export type MarkerDetails = {
  title?: string;
  description?: string;
};

export const onMarkerClick = (
  map: Map,
  iconFeature: Feature,
  setMarkerDetails: React.Dispatch<React.SetStateAction<MarkerDetails | null>>
): void => {
  map.on("click", function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });

    if (feature === iconFeature) {
      //get values of object - open popup
      const selectedMarker = iconFeature.getProperties() as MarkerDetails;

      setMarkerDetails(selectedMarker);
    }
    if (!feature) {
      setMarkerDetails(null);
    }
  });
};
