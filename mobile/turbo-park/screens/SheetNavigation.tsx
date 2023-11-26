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
import EditBookingScreen, {
  editBookingSheetOptions,
} from "./EditBookingScreen";
import ProfileScreen, { profileSheetOptions } from "./ProfileScreen";
import DateScreen, { dateSheetOptions } from "./DateScreen";
import SlotScreen, { slotSheetOptions } from "./SlotScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReportScreen, { reportSheetOptions } from "./ReportScreen";
import AvailableSlotsScreen, {
  availableSlotsSheetOptions,
} from "./AvailableSlotsScreen";
import { useState } from "react";

const Sheet = createBottomSheetNavigator<SheetParams>();

const SheetNavigation = () => {
  const navigationRef = createNavigationContainerRef<SheetParams>();

  const [day, setDay] = useState<Date>();
  const [fromHour, setFromHour] = useState<number>();
  const [toHour, setToHour] = useState<number>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          console.log(`Loaded token: ${token}`);
          navigationRef.navigate("landing", { token: Number(token) });
        } else {
          console.log("Could not load token");
          navigationRef.navigate("signIn");
        }
      }}
    >
      <Sheet.Navigator
        screenOptions={{
          enablePanDownToClose: false,
        }}
      >
        <Sheet.Screen name="map">
          {props => <MapScreen {...props} />}
        </Sheet.Screen>

        <Sheet.Screen
          name="signIn"
          component={SignInScreen}
          options={signInSheetOptions}
        />
        <Sheet.Screen
          name="signUp"
          component={SignUpScren}
          options={signUpSheetOptions}
        />
        <Sheet.Screen
          name="landing"
          component={LandingScreen}
          options={landingSheetOptions}
        />
        {/* <Sheet.Screen
          name="date"
          component={(props) => (
            <DateScreen>
              {props => } 
            </DateScreen>
          )}
          options={dateSheetOptions}
        /> */}
        <Sheet.Screen name="date" options={dateSheetOptions}>
          {(props) => (
            <DateScreen
              {...props}
              onSearch={(day, fromHour, toHour) => {
                setDay(day);
                setFromHour(fromHour);
                setToHour(toHour);
              }}
            />
          )}
        </Sheet.Screen>
        <Sheet.Screen name="slot" options={slotSheetOptions}>
          {(props) => (
            <SlotScreen
              {...props}
              day={day}
              fromHour={fromHour}
              toHour={toHour}
              onBook={() => {}}
            />
          )}
        </Sheet.Screen>
        <Sheet.Screen
          name="editBooking"
          component={EditBookingScreen}
          options={editBookingSheetOptions}
        />
        <Sheet.Screen
          name="profile"
          component={ProfileScreen}
          options={profileSheetOptions}
        />
        <Sheet.Screen
          name="report"
          component={ReportScreen}
          options={reportSheetOptions}
        />
        <Sheet.Screen
          name="availableSlots"
          component={AvailableSlotsScreen}
          options={availableSlotsSheetOptions}
        />
      </Sheet.Navigator>
    </NavigationContainer>
  );
};

export default SheetNavigation;
