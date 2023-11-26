import {
  BottomSheetNavigationOptions,
  BottomSheetScreenProps,
} from "@th3rdwave/react-navigation-bottom-sheet";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SheetBackground from "../components/SheetBackground";
import {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { SheetParams } from "../types/SheetParams";
import NavigationBar from "../components/NavigationBar";
import Back from "../assets/back.svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "../constants/Colors";
import { useState } from "react";
import Add from "../assets/add.svg";

const SignUpScren = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "signUp">) => {
  const safeAreaInsets = useSafeAreaInsets();
  const colors = useColors();

  const [emailAddress, setEmailAddres] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [username, setUsername] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [identifier, setIdentifier] = useState<string>();
  const [plates, setPlates] = useState<string[]>([""]);

  const addPlateAction = () => {
    setPlates([...plates, ""]);
  };

  const signUp = async () => {
    await fetch("http://147.232.155.76:8080/employee/register", {
      method: "POST",
      body: JSON.stringify({
        email: emailAddress,
        password: password,
        name: username?.split(" ")[0] ?? "",
        surname: username?.split(" ")[1] ?? "",
        phoneNumber: phoneNumber,
        personalId: Number(identifier),
        licencePlateNumber: plates[0] ?? "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        navigation.goBack();
      }
    });
  };

  return (
    <>
      <NavigationBar
        title="Sign Up"
        leftButtonAction={() => navigation.goBack()}
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
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.gray }]}
          selectionColor={colors.tint}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          secureTextEntry={true}
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.gray }]}
          selectionColor={colors.tint}
          value={username}
          onChangeText={setUsername}
          placeholder="Full Name"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.gray }]}
          selectionColor={colors.tint}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          keyboardType="numeric"
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.gray }]}
          selectionColor={colors.tint}
          value={identifier}
          onChangeText={setIdentifier}
          placeholder="Identifier"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
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
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="off"
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
        onPress={signUp}
      >
        <Text style={styles.saveButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </>
  );
};

export default SignUpScren;

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

export const signUpSheetOptions: BottomSheetNavigationOptions = {
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
