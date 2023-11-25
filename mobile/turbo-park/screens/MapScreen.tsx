import Mapbox, { Camera, MapView } from "@rnmapbox/maps";
import { BottomSheetScreenProps } from "@th3rdwave/react-navigation-bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SheetParams } from "../types/SheetParams";
import { useColors } from "../constants/Colors";

Mapbox.setAccessToken(
  "pk.eyJ1IjoibnBzbG92ZW5za3lyYWoiLCJhIjoiY2trZm14aWpuMHZjbDJxcXRxa3ltbnNpZiJ9.Vf8AdcK9odZlcLxYU18XtQ"
);

const MapScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "map">) => {
  const sideInset = 10;
  const topInset = useSafeAreaInsets().top + sideInset;
  const bottomInset = 400; // percentual padding
  const cameraRef = useRef<Camera>(null);
  const colors = useColors();

  useEffect(() => {
    navigation.navigate("landing")
  }, [])

  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      scaleBarEnabled={false}
      compassEnabled={false}
    >
      <Camera
        ref={cameraRef}
        minZoomLevel={9}
        maxZoomLevel={20}
        defaultSettings={{
          centerCoordinate: [
            21.24783183853421,
            48.70616417660523
          ],
          zoomLevel: 17,
          padding: {
            paddingTop: 0,
            paddingBottom: bottomInset,
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
      />

    </MapView>
  );
};

export default MapScreen;
