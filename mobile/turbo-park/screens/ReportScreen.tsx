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
import NavigationBar from "../components/NavigationBar";
import Back from "../assets/back.svg";
import { useColors } from "../constants/Colors";

const ReportScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "report">) => {
  const colors = useColors();
  const [number, setNumber] = useState<string>();

  const report = () => {
    if (!number) {
      return;
    }
    navigation.goBack();
  };

  return (
    <View>
      <NavigationBar
        title={`Report Slot ${route.params.slotId}`}
        leftButtonAction={() => navigation.goBack()}
        LeftButtonIcon={Back}
      />

      <Text style={[styles.title, { color: colors.secondaryText }]}>
        Is there a vehicle with a different number plate parked at this
        location?
      </Text>

      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
        Take action!
      </Text>

      <TextInput
        style={[styles.input, { backgroundColor: colors.gray }]}
        selectionColor={colors.tint}
        value={number}
        onChangeText={setNumber}
        placeholder="License Plate Number"
        keyboardType="numeric"
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.red }]}
        onPress={report}
      >
        <Text style={styles.buttonText}>Report Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    alignSelf: "center",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 20,
  },
  input: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 15,
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFFFFF",
    alignSelf: "center",
  },
});

export const reportSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["40%"],
  backgroundComponent: (props) => <SheetBackground {...props} rounded={true} />,
  backdropComponent: (props) => (
    <BottomSheetBackdrop
      {...props}
      enableTouchThrough={true}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="none"
    />
  ),
};
