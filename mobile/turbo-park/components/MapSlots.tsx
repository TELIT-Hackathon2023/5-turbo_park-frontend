import { FillLayer, ShapeSource } from "@rnmapbox/maps";

interface MapSlotsProps {
  // slots: [RouteList];
  onPress: (feature: GeoJSON.Feature) => void;
}

const MapRoutes = ({ onPress }: MapSlotsProps) => {
  const style = {
    fillColor: ["get", "color"],
    fillOpacity: 0.7,
  };

  const shape: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        id: "1",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [21.249190139128046,48.706464410791426],
              [21.249110028143008,48.70644595440345],
              [21.24912187888114,48.70642077237204],
              [21.249202463894164,48.706439541589106]
            ],
          ],
        },
        properties: {
          color: "#00B367",
        },
      },
    ],
  };

  return (
    <ShapeSource
      id="route-source"
      shape={shape}
      onPress={(event) => onPress(event.features[0])}
    >
      <FillLayer id="slots-layer" style={style} />
    </ShapeSource>
  );
};

export default MapRoutes;
