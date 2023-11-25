import { BottomSheetNavigationOptions, BottomSheetScreenProps } from "@th3rdwave/react-navigation-bottom-sheet";
import { StyleSheet, Text, View } from "react-native";
import SheetBackground from "../components/SheetBackground";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { SheetParams } from "../types/SheetParams";

const SignUpScren = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "signUp">) => {
  return (
    <View>
      <Text>SignUpScren</Text>
    </View>
  );
};

export default SignUpScren;

const styles = StyleSheet.create({});

export const signUpSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["40%"],
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
