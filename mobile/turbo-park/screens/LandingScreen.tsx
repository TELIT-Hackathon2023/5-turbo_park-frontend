import {
  BottomSheetNavigationOptions,
  BottomSheetScreenProps,
} from "@th3rdwave/react-navigation-bottom-sheet";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SheetBackground from "../components/SheetBackground";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import BookSlot from "../components/BookSlot";
import EditSlot from "../components/EditSlot";
import { SheetParams } from "../types/SheetParams";

const LandingScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "landing">) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/telekom-logo.jpg")}
      />

      <TouchableOpacity style={styles.profileButton}>
        <Text>Profile</Text>
      </TouchableOpacity>

      <BookSlot name="John" onPress={() => {

      }} />

      {/* <EditSlot
        name="John"
        slotId="1"
        time="9-18"
        plate="KE0000AA"
        onPress={() => {}}
      /> */}
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    width: 64,
    height: 64,
  },
  profileButton: {
    position: "absolute",
    right: 20,
    top: 0,
  },
});

export const landingSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["35%"],
  backgroundComponent: (props) => <SheetBackground {...props} rounded={true} />,
  backdropComponent: (props) => (
    <BottomSheetBackdrop
      {...props}
      enableTouchThrough={true}
      appearsOnIndex={2}
      disappearsOnIndex={1}
      pressBehavior="collapse"
    />
  ),
};
