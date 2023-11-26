import { FillLayer, ShapeSource, SymbolLayer } from "@rnmapbox/maps";
import { ParkingSlotList } from "../types/ParkingSlotList";

interface MapSlotsProps {
  slots: ParkingSlotList[];
  onPress: (feature: GeoJSON.Feature) => void;
}

const MapRoutes = ({ slots, onPress }: MapSlotsProps) => {
  const fillStyle = {
    fillColor: ["get", "color"],
    fillOpacity: 0.7,
  };

  const symbolStyle = {
    textField: ["get", "text"],
    textSize: 16,
    textColor: "#FFFFFF"
  }

  const shape: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: slots.map((slot) => ({
      type: "Feature",
      id: slot.id,
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            slot.coordinate1,
            slot.coordinate2,
            slot.coordinate3,
            slot.coordinate4,
            slot.coordinate1,
          ],
        ],
      },
      properties: {
        text: slot.id,
        color: slot.status === "FREE" ? "green" : "red",
      },
    })),
  };

  return (
    <ShapeSource
      id="route-source"
      shape={shape}
      onPress={(event) => onPress(event.features[0])}
    >
      <FillLayer id="slots-layer" style={fillStyle} />
      <SymbolLayer id="slots-numbers-layer" style={symbolStyle} />
    </ShapeSource>
  );
};

export default MapRoutes;
