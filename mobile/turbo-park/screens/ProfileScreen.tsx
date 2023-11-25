import {
  BottomSheetNavigationOptions,
  BottomSheetScreenProps,
} from "@th3rdwave/react-navigation-bottom-sheet";
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NavigationBar from "../components/NavigationBar";
import { SheetParams } from "../types/SheetParams";
import SheetBackground from "../components/SheetBackground";
import Back from "../assets/back.svg";
import Add from "../assets/add.svg";
import {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useColors } from "../constants/Colors";
import { useEffect, useState } from "react";

const ProfileScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "profile">) => {
  const safeAreaInsets = useSafeAreaInsets();
  const colors = useColors();
  const [username, setUsername] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [emailAddress, setEmailAddres] = useState<string>();
  const [identifier, setIdentifier] = useState<string>();
  const [plates, setPlates] = useState<string[]>([""]);

  const addPlateAction = () => {
    setPlates([...plates, ""]);
  };

  const saveAction = () => {};

  return (
    <>
      <NavigationBar
        title={"Profile"}
        leftButtonAction={() => {
          navigation.goBack();
        }}
        LeftButtonIcon={Back}
      />

      <BottomSheetScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: safeAreaInsets.bottom + 100 }}
      >
        <TextInput
          style={[styles.input, { backgroundColor: colors.gray }]}
          selectionColor={colors.tint}
          value={emailAddress}
          onChangeText={setEmailAddres}
          placeholder="Email Address"
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.gray }]}
          selectionColor={colors.tint}
          value={username}
          onChangeText={setUsername}
          placeholder="Full Name"
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.gray }]}
          selectionColor={colors.tint}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.gray }]}
          selectionColor={colors.tint}
          value={identifier}
          onChangeText={setIdentifier}
          placeholder="Identifier"
        />

        <Text style={styles.title}>License Plates</Text>

        {plates &&
          plates.map((_, index) => {
            return (
              <TextInput
                key={index}
                style={[styles.input, { backgroundColor: colors.gray }]}
                selectionColor={colors.tint}
                value={plates[index]}
                onChangeText={(text) => {
                  const updatedPlates = [...plates];
                  updatedPlates[index] = text;
                  setPlates(updatedPlates);
                }}
                placeholder="Plate Number"
              />
            );
          })}

        <TouchableOpacity style={styles.addButton} onPress={addPlateAction}>
          <Add width={24} height={24} color={colors.green} />
          <Text style={[styles.addButtonText, { color: colors.green }]}>
            Add Plate
          </Text>
        </TouchableOpacity>
      </BottomSheetScrollView>

      <TouchableOpacity
        style={[
          styles.saveButton,
          { backgroundColor: colors.tint, bottom: safeAreaInsets.bottom + 20 },
        ]}
        onPress={saveAction}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  input: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  addButton: {
    borderRadius: 15,
    paddingVertical: 15,
    flexDirection: "row",
    gap: 4,
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  saveButton: {
    position: "absolute",
    left: 20,
    right: 20,
    borderRadius: 15,
    paddingVertical: 15,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#FFFFFF",
  },
});

export default ProfileScreen;

export const profileSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["90%"],
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
