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
import { useEffect } from "react";

const SlotScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "slot">) => {
  const colors = useColors();
  
  const report = () => {
    navigation.navigate("report", { slotId: route.params.id })
  }

  return (
    <>
      <NavigationBar
        title={`Slot ${route.params.id}`}
        leftButtonAction={() => navigation.goBack()}
        LeftButtonIcon={Back}
      />

      <View style={styles.container}>
        <View style={styles.row}>
          <View
            style={[styles.status, { backgroundColor: route.params.color }]}
          />

          <View style={styles.info}>
            <Text style={styles.text}>Status</Text>
            {route.params.status && <Text>{route.params.status}</Text>}

            {route.params.fromHour && (
              <Text style={styles.time}>
                {`${route.params.fromHour}:00 - ${route.params.toHour}:00`}
              </Text>
            )}
          </View>
        </View>

        {route.params.status !== "FREE" && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.red }]}
            onPress={report}
          >
            <Text style={styles.buttonText}>Report Vehicle</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default SlotScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  info: {
    marginLeft: 10,
  },
  status: {
    width: 32,
    height: 56,
    borderRadius: 5,
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
