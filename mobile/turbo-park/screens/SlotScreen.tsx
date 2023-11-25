import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SheetParams } from "../types/SheetParams";
import {
  BottomSheetNavigationOptions,
  BottomSheetScreenProps,
} from "@th3rdwave/react-navigation-bottom-sheet";
import NavigationBar from "../components/NavigationBar";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import SheetBackground from "../components/SheetBackground";
import { useColors } from "../constants/Colors";
import Back from "../assets/back.svg";

const SlotScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "slot">) => {
  const colors = useColors();

  return (
    <>
      <NavigationBar
        title={`Slot ${route.params.id}`}
        leftButtonAction={() => navigation.goBack()}
        LeftButtonIcon={Back}
      />

      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.status} />

          <View style={styles.info}>
            {route.params.fromHour && route.params.toHour && (
              <Text>
                `${route.params.fromHour}:${route.params.toHour}`
              </Text>
            )}
            <Text>Status</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tint }]}
        >
          <Text style={styles.buttonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SlotScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  slot: {
    fontSize: 22,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  info: {
    marginLeft: 10,
  },
  status: {
    width: 32,
    height: 56,
    borderRadius: 5,
    backgroundColor: "#00B3677F",
    borderColor: "#00B367FF",
    borderWidth: 4,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#FFFFFF",
  },
});

export const slotSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["27%"],
  backgroundComponent: (props) => <SheetBackground {...props} rounded={true} />,
  backdropComponent: (props) => (
    <BottomSheetBackdrop
      {...props}
      enableTouchThrough={true}
      appearsOnIndex={0}
      disappearsOnIndex={0}
      pressBehavior="none"
    />
  ),
};
