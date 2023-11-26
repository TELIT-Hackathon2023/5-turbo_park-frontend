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

interface SlotScreenProps extends BottomSheetScreenProps<SheetParams, "slot"> {
  day: Date,
  fromHour: number
  toHour: number,
  onBook: () => void
}

const SlotScreen = ({
  route,
  navigation,
  day,
  fromHour,
  toHour,
  onBook
}: SlotScreenProps) => {
  const colors = useColors();

  const report = () => {
    navigation.navigate("report", { slotId: route.params.id });
  };

  const book = async () => {
    const startDate = new Date(day)
    startDate.setHours(fromHour)

    const endDate = new Date(day)
    endDate.setHours(toHour)

    await fetch(`http://147.232.155.76:8080/ticket`, {
      method: "POST",
      body: JSON.stringify({
        employeeID: route.params.token,
        parkingSlotID: route.params.id,
        startDate,
        endDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log(`user update failed: ${response}`)
        return;
      }

      navigation.navigate("landing", { token: route.params.token });
    });
  };

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

        {route.params.status === "FREE" && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={book}
          >
            <Text style={styles.buttonText}>Book</Text>
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
