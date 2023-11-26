import Mapbox, { Camera, MapView } from "@rnmapbox/maps";
import { BottomSheetScreenProps } from "@th3rdwave/react-navigation-bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SheetParams } from "../types/SheetParams";
import { useColors } from "../constants/Colors";
import MapSlots from "../components/MapSlots";
import { ParkingSlotList } from "../types/ParkingSlotList";
import { EmployeeTicket } from "../types/EmployeeTicket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bbox from "@turf/bbox";

Mapbox.setAccessToken(
  "pk.eyJ1IjoibnBzbG92ZW5za3lyYWoiLCJhIjoiY2trZm14aWpuMHZjbDJxcXRxa3ltbnNpZiJ9.Vf8AdcK9odZlcLxYU18XtQ"
);

const MapScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "map">) => {
  const cameraRef = useRef<Camera>(null);
  const colors = useColors();

  const [employeeToken, setEmployeeToken] = useState<number>();
  const [parkingSlots, setParkingSlots] = useState<ParkingSlotList[]>();
  const [employeeTicket, setEmployeeTicket] = useState<EmployeeTicket>();

  useEffect(() => {
    fetch("http://147.232.155.76:8080/parkingslot/all")
      .then((response) => response.json() as Promise<ParkingSlotList[]>)
      .then(setParkingSlots)
      .catch(console.log);

    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    const token = await AsyncStorage.getItem("token");
    setEmployeeToken(Number(token))

    if (!token) {
      return;
    }

    fetch(`http://147.232.155.76:8080/ticket/user/${token}`)
      .then((response) => response.json() as Promise<EmployeeTicket>)
      .then(setEmployeeTicket)
      .catch(console.log);
  };

  const onSlotPress = (feature: GeoJSON.Feature) => {
    if (!employeeToken) {
      return
    }

    const id = feature.id as number;
    const status = feature.properties?.status;
    const color = feature.properties?.color;
    navigation.navigate("slot", { token: employeeToken, id, status, color });
    
    const geometry = feature.geometry as GeoJSON.Polygon;
    const [minX, minY, maxX, maxY] = bbox(geometry);
    const southWest = [minX, minY];
    const northEast = [maxX, maxY];
    const padding = [50, 50, 200, 50];
    const animationDuration = 500;
    cameraRef.current?.fitBounds(
      northEast,
      southWest,
      padding,
      animationDuration
    );
  };

  if (!parkingSlots) {
    return <ActivityIndicator color={colors.tint} />;
  }

  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      scaleBarEnabled={false}
      compassEnabled={true}
      compassFadeWhenNorth={true}
    >
      <Camera
        ref={cameraRef}
        minZoomLevel={9}
        maxZoomLevel={20}
        defaultSettings={{
          centerCoordinate: [
            21.24904402565315,
            48.70667202394145
          ],
          zoomLevel: 19,
          padding: {
            paddingTop: 0,
            paddingBottom: 400,
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
      />
      <MapSlots
        slots={parkingSlots}
        employeeSlotId={employeeTicket?.parkingSlotID}
        onPress={onSlotPress}
      />
    </MapView>
  );
};

export default MapScreen;
