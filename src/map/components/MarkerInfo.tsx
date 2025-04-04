import React from "react";

import "../styles/markerInfoStyles.css";
import { MarkerDetails } from "../utils/onMarkerClick";

function MarkerInfo(markerDetails: MarkerDetails | null): React.JSX.Element {
  return (
    <div id="markerToolbar">
      <h1>Marker info</h1>
      <p>Title: {markerDetails?.title}</p>
      <p>Description: {markerDetails?.description} </p>
    </div>
  );
}

export default MarkerInfo;
