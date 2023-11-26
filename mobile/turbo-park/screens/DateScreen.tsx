import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  BottomSheetNavigationOptions,
  BottomSheetScreenProps,
} from "@th3rdwave/react-navigation-bottom-sheet";
import { SheetParams } from "../types/SheetParams";
import SheetBackground from "../components/SheetBackground";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useColors } from "../constants/Colors";
import Calendar from "../assets/calendar.svg";
import Clock from "../assets/clock.svg";
import NavigationBar from "../components/NavigationBar";
import Back from "../assets/back.svg";

interface DateScreenProps extends BottomSheetScreenProps<SheetParams, "date"> {
  onSearch: (day: Date, fromHour: number, toHour: number) => void;
}

const DateScreen = ({ route, navigation, onSearch }: DateScreenProps) => {
  const colors = useColors();

  const zeroHours = (oldDate: Date) => {
    return new Date(oldDate.setHours(0, 0, 0, 0));
  };

  const zeroMinutes = (oldDate: Date) => {
    return new Date(oldDate.setMinutes(0, 0, 0));
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

  const getFromMinTime = () => {
    return new Date().getHours();
  };

  const getFromMaxTime = () => {
    return 23;
  };

  const getToMinTime = () => {
    return getFromMinTime() + 1;
  };

  const getToMaxTime = () => {
    return getFromMaxTime() + 1;
  };

  const search = () => {
    const startDate = new Date(day);
    startDate.setHours(fromHour);

    const endDate = new Date(day);
    endDate.setHours(toHour);

    navigation.navigate("availableSlots", {
      token: route.params.token,
      startDate,
      endDate,
    });
  };

  const [day, setDay] = useState(getMinDay());
  const [fromHour, setFromHour] = useState(getFromMinTime());
  const [toHour, setToHour] = useState(getFromMinTime() + 1);

  const fixUserInput = (text: string) => {
    const fixedText = text.replace(/[^0-9]/g, "");
    return Number(fixedText);
  };

  return (
    <>
      <NavigationBar
        title={"Pick a date"}
        leftButtonAction={() => navigation.goBack()}
        LeftButtonIcon={Back}
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
          onPress={() => onSearch(day, fromHour, toHour)}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DateScreen;

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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
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

export const dateSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["30%"],
  backgroundComponent: (props) => <SheetBackground {...props} rounded={true} />,
  // backdropComponent: (props) => (
  //   <BottomSheetBackdrop
  //     {...props}
  //     enableTouchThrough={true}
  //     appearsOnIndex={-1}
  //     disappearsOnIndex={-1}
  //     pressBehavior="collapse"
  //   />
  // ),
};
