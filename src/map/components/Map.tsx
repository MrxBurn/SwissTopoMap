import "ol/ol.css";
import "../styles/mapStyles.css";
import { JSX, useState } from "react";
import useMap from "../hooks/useMap";
import ChooseLayer from "./ChooseLayer";
import MarkerInfo from "./MarkerInfo";
import { Map } from "ol";
import { MarkerDetails } from "../utils/onMarkerClick";

function MapComponent(): JSX.Element {
  const [map, setMap] = useState<Map | null>(null);
  const [markerDetails, setMarkerDetails] = useState<MarkerDetails | null>(
    null
  );
  const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);

  useMap(setMap, setMarkerDetails, isEditEnabled);

  return (
    <div>
      <div id="map">
        {map && (
          <ChooseLayer
            map={map}
            setIsEditEnabled={setIsEditEnabled}
            isEditEnabled={isEditEnabled}
          />
        )}
        {markerDetails && <MarkerInfo {...markerDetails} />}
      </div>
    </div>
  );
}

export default MapComponent;
