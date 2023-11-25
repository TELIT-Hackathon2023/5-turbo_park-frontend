import {
  BottomSheetNavigationOptions,
  BottomSheetScreenProps,
} from "@th3rdwave/react-navigation-bottom-sheet";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NavigationBar from "../components/NavigationBar";
import { SheetParams } from "../types/SheetParams";
import SheetBackground from "../components/SheetBackground";

const SettingsScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "settings">) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <>
      <NavigationBar
        style={{ paddingTop: safeAreaInsets.top + 10 }}
        title={"Settings"}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;

export const settingsSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["100%"],
  handleComponent: () => null,
  backgroundComponent: (props) => (
    <SheetBackground {...props} rounded={false} />
  ),
};
