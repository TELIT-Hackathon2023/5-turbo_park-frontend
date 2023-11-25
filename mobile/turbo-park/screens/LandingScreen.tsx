import { BottomSheetNavigationOptions } from "@th3rdwave/react-navigation-bottom-sheet";
import { StyleSheet, Text, View } from "react-native";
import SheetBackground from "../components/SheetBackground";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const LandingScreen = () => {
  return (
    <View>
      <Text>LandingScreen</Text>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({});

export const landingSheetOptions: BottomSheetNavigationOptions = {
  index: 1,
  snapPoints: ["30%", "55%", "90%"],
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
