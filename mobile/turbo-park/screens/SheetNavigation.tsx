import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import { SheetParams } from "../types/SheetParams";
import MapScreen from "./MapScreen";
import LandingScreen, { landingSheetOptions } from "./LandingScreen";
import SignInScreen, { signInSheetOptions } from "./SignInScreen";
import SignUpScren, { signUpSheetOptions } from "./SignUpScren";
import EditBookingScreen, { editBookingSheetOptions } from "./EditBookingScreen";
import ProfileScreen, { profileSheetOptions } from "./ProfileScreen";
import DateScreen, { dateSheetOptions } from "./DateScreen";
import SlotScreen, { slotSheetOptions } from "./SlotScreen";

const Sheet = createBottomSheetNavigator<SheetParams>();

const SheetNavigation = () => {
  const navigationRef = createNavigationContainerRef<SheetParams>();

  return (
    <NavigationContainer ref={navigationRef} onReady={() =>
      navigationRef.navigate("slot", { id: 1 })
    }>
      <Sheet.Navigator
        screenOptions={{
          enablePanDownToClose: false,
        }}
      >
        <Sheet.Screen name="map" component={MapScreen} />
        <Sheet.Screen name="signIn" component={SignInScreen} options={signInSheetOptions} />
        <Sheet.Screen name="signUp" component={SignUpScren} options={signUpSheetOptions} />
        <Sheet.Screen name="landing" component={LandingScreen} options={landingSheetOptions} />
        <Sheet.Screen name="date" component={DateScreen} options={dateSheetOptions} />
        <Sheet.Screen name="slot" component={SlotScreen} options={slotSheetOptions} />
        <Sheet.Screen name="editBooking" component={EditBookingScreen} options={editBookingSheetOptions} />
        <Sheet.Screen name="profile" component={ProfileScreen} options={profileSheetOptions} />
      </Sheet.Navigator>
    </NavigationContainer>
  );
};

export default SheetNavigation;
