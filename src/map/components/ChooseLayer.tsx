import { ChangeEvent, JSX } from "react";
import "../styles/chooseLayerStyles.css";
import { Map } from "ol";
import { changeMapLayer } from "../utils/changeMapLayer";

type ChooseLayerType = {
  map: Map | null;
  setIsEditEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isEditEnabled: boolean;
};

function ChooseLayer({
  map,
  setIsEditEnabled,
  isEditEnabled,
}: ChooseLayerType): JSX.Element {
  const onDropdownChange = (
    event: ChangeEvent<HTMLSelectElement> | undefined
  ) => {
    if (map) {
      console.log("cal");

      changeMapLayer(map, event?.currentTarget.value);
    }
  };

  return (
    <div id="layerToolbar">
      <h1>Choose a layer</h1>
      <label>
        <select name="layers" id="layers" onChange={(e) => onDropdownChange(e)}>
          <option value="">Select</option>
          <option value="ch.swisstopo.geologie-geologischer_atlas_profile">
            Geological profiles GA25
          </option>
          <option value="ch.bag.radioaktivitaet-atmosphaere">
            Radioactivity in the atmosphere
          </option>
          <option value="ch.swisstopo.landesschwerenetz">
            Gravimetric base network
          </option>
          <option value="ch.bazl.reflektierende-flaechen_flugplaetze">
            Reflective surfaces aerodromes
          </option>
        </select>
      </label>

      <button onClick={() => setIsEditEnabled(!isEditEnabled)}>
        <span id="buttonContent">
          <h1>Edit mode: </h1>
          <p id={isEditEnabled ? "on" : "off"}>
            {isEditEnabled ? "ON" : "OFF"}
          </p>
        </span>
      </button>
    </div>
  );
}

export default ChooseLayer;
