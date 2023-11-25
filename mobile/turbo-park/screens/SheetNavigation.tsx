import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import { SheetParams } from "../types/SheetParams";
import MapScreen from "./MapScreen";
import LandingScreen, { landingSheetOptions } from "./LandingScreen";

const Sheet = createBottomSheetNavigator<SheetParams>();

const SheetNavigation = () => {
  const navigationRef = createNavigationContainerRef<SheetParams>();

  return (
    <NavigationContainer ref={navigationRef}>
      <Sheet.Navigator
        screenOptions={{
          enablePanDownToClose: false,
        }}
      >
        <Sheet.Screen name="map" component={MapScreen} />
        <Sheet.Screen name="landing" component={LandingScreen} options={landingSheetOptions} />
      </Sheet.Navigator>
    </NavigationContainer>
  );
};

export default SheetNavigation;
