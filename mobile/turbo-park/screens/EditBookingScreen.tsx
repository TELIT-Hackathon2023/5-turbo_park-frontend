import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  BottomSheetNavigationOptions,
  BottomSheetScreenProps,
} from "@th3rdwave/react-navigation-bottom-sheet";
import SheetBackground from "../components/SheetBackground";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { SheetParams } from "../types/SheetParams";
import NavigationBar from "../components/NavigationBar";
import Back from "../assets/back.svg";
import Delete from "../assets/delete.svg";
import { useColors } from "../constants/Colors";
import Clock from "../assets/clock.svg";
import { EmployeeTicket } from "../types/EmployeeTicket";
import DateTimePicker from "@react-native-community/datetimepicker";
import Calendar from "../assets/calendar.svg";

const EditBookingScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "editBooking">) => {
  const colors = useColors();

  const [day, setDay] = useState<Date>(
    new Date(route.params.employeeTicket.startDate)
  );
  const [fromHour, setFromHour] = useState<number>(
    new Date(route.params.employeeTicket.startDate).getHours()
  );
  const [toHour, setToHour] = useState<number>(
    new Date(route.params.employeeTicket.endDate).getHours()
  );

  const zeroHours = (oldDate: Date) => {
    return new Date(oldDate.setHours(0, 0, 0, 0));
  };
  const getMinDay = () => {
    return zeroHours(new Date());
  };

  const getMaxDay = () => {
    const minUnix = getMinDay().getTime();
    const oneDay = 86400000;
    const twoDaysAhead = minUnix + oneDay * 2;
    return new Date(twoDaysAhead);
  };

  const fixUserInput = (text: string) => {
    const fixedText = text.replace(/[^0-9]/g, "");
    return Number(fixedText);
  };

  const save = () => {
    if (!day || !fromHour || !toHour) return;

    const startDate = new Date(day);
    startDate.setHours(fromHour);

    const endDate = new Date(day);
    endDate.setHours(toHour);

    fetch(`http://147.232.155.76:8080/ticket/${route.params.employeeTicket.id}`, {
      method: "PUT",
      body: JSON.stringify({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log({ response });
        return;
      }
      navigation.goBack();
    });
  };

  const deleteTicket = () => {
    fetch(`http://147.232.155.76:8080/ticket/${route.params.employeeTicket.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log({ response });
        return;
      }
      navigation.goBack();
    });
  };

  if (!day) {
    return <ActivityIndicator color={colors.tint} />;
  }

  return (
    <View>
      <NavigationBar
        title={"Edit Booking"}
        leftButtonAction={() => navigation.goBack()}
        LeftButtonIcon={Back}
        rightButtonAction={deleteTicket}
        RightButtonIcon={Delete}
      />

      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Calendar height={32} width={32} color={colors.tint} />
          <Text style={styles.subtitle}>Day</Text>

          <DateTimePicker
            mode="date"
            value={day}
            accentColor={colors.tint}
            minimumDate={getMinDay()}
            maximumDate={getMaxDay()}
            onChange={(event) => {
              setDay(new Date(event.nativeEvent.timestamp));
            }}
          />
        </View>

        <View style={styles.hourInputs}>
          <Clock height={32} width={32} color={colors.tint} />
          <Text style={styles.subtitle}>Time</Text>

          <TextInput
            style={[styles.input, { backgroundColor: colors.gray }]}
            selectionColor={colors.tint}
            keyboardType="numeric"
            value={`${fromHour}`}
            onChangeText={(text) => {
              const number = fixUserInput(text);
              if (!number) return;
              setFromHour(number);
            }}
          />

          <Text> - </Text>

          <TextInput
            style={[styles.input, { backgroundColor: colors.gray }]}
            selectionColor={colors.tint}
            keyboardType="numeric"
            value={`${toHour}`}
            onChangeText={(text) => {
              const number = Number(text);
              if (!number) return;
              setToHour(number);
            }}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={save}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditBookingScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 10,
    gap: 15,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 18,
    marginLeft: 4,
    flex: 1,
  },
  input: {
    fontSize: 18,
    padding: 10,
    borderRadius: 10,
  },
  hourInputs: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: 15,
    paddingVertical: 15,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFFFFF",
    alignSelf: "center",
  },
});

export const editBookingSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["30%"],
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
function getFromMinTime(): any {
  throw new Error("Function not implemented.");
}
