import Mapbox from "@rnmapbox/maps";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SheetNavigation from "./screens/SheetNavigation";

Mapbox.setAccessToken(
  "pk.eyJ1IjoibnBzbG92ZW5za3lyYWoiLCJhIjoiY2trZm14aWpuMHZjbDJxcXRxa3ltbnNpZiJ9.Vf8AdcK9odZlcLxYU18XtQ"
);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <SheetNavigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
