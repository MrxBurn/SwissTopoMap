import { View } from "ol";
import Feature from "ol/Feature";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import { XYZ } from "ol/source";
import { redMarker } from "../styles/markerStyles";
import { Point } from "ol/geom";
import { useCallback, useEffect, useState } from "react";

export type ResponseMarkersType = {
  title: string;
  description: string;
  longitude: number;
  latitude: number;
};

export const useInitMap = (): {
  backgroundLayer: TileLayer;
  view: View;
  markers: Feature[];
} => {
  const [markers, setMarkers] = useState<Feature[]>([]);

  const url = "http://localhost/getMarkers";

  const fetchMarkers = useCallback(async () => {
    try {
      return await fetch(url);
    } catch (e) {
      console.log(e);
    }
  }, [url]);

  useEffect(() => {
    if (!markers.length) {
      fetchMarkers().then(async (res) =>
        setMarkers(
          ((await res?.json()) as ResponseMarkersType[]).map(
            (marker) =>
              new Feature({
                geometry: new Point(
                  fromLonLat([marker.longitude, marker.latitude])
                ),
                title: marker.title,
                description: marker.description,
                style: redMarker,
              })
          )
        )
      );
    }
  }, [fetchMarkers, markers]);

  const backgroundLayer = new TileLayer({
    source: new XYZ({
      url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg`,
    }),
  });

  const view = new View({
    projection: "EPSG:3857",
    center: [900000, 5900000],
    zoom: 8.5,
  });

  return {
    backgroundLayer,
    view,
    markers,
  };
};
