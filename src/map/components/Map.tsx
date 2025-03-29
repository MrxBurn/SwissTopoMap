import "ol/ol.css";
import "../styles/mapStyles.css";
import { JSX } from "react";
import useMap from "../hooks/useMap";

function MapComponent(): JSX.Element {
  useMap();

  return <div id="map"></div>;
}

export default MapComponent;
