import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import Circle from "ol/style/Circle";

export const redMarker = new Style({
  image: new Circle({
    radius: 10,
    fill: new Fill({
      color: "red",
    }),
    stroke: new Stroke({
      color: "white",
      width: 2,
    }),
  }),
});
