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
  ActivityIndicator,
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
import { Employee } from "../types/Employee";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignOut from "../assets/sign_out.svg"

const ProfileScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "profile">) => {
  const safeAreaInsets = useSafeAreaInsets();
  const colors = useColors();

  const [emailAddress, setEmailAddres] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [identifier, setIdentifier] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [plates, setPlates] = useState<string[]>([""]);

  useEffect(() => {
    fetch(`http://147.232.155.76:8080/employee/${route.params.token}`)
      .then((response) => response.json() as Promise<Employee>)
      .then((employee) => {
        console.log({ employee });
        setEmailAddres(employee.email);
        setUsername(`${employee.name} ${employee.surname}`);
        setIdentifier(`${employee.personalId}`);
        setPhoneNumber(employee.phoneNumber);
        setPlates([employee.licencePlateNumber]);
      })
      .catch(console.log);
  }, []);

  const addPlateAction = () => {
    setPlates([...plates, ""]);
  };

  const saveAction = () => {
    fetch(`http://147.232.155.76:8080/employee/${route.params.token}`, {
      method: "PUT",
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        licencePlateNumber: plates[0] ?? "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log(`user update failed: ${response}`)
        return;
      }
      navigation.goBack();
    });
  };

  if (!username) {
    return <ActivityIndicator color={colors.tint} />;
  }

  return (
    <>
      <NavigationBar
        title={"Profile"}
        leftButtonAction={() => {
          navigation.goBack();
        }}
        LeftButtonIcon={Back}
        rightButtonAction={async () => {
          await AsyncStorage.setItem("token", "");
          navigation.navigate("signIn");
        }}
        RightButtonIcon={SignOut}
      />

      <BottomSheetScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: safeAreaInsets.bottom + 100 }}
      >
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.gray, color: colors.secondaryText },
          ]}
          selectionColor={colors.tint}
          value={emailAddress}
          onChangeText={setEmailAddres}
          placeholder="Email Address"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          editable={false}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.gray, color: colors.secondaryText },
          ]}
          selectionColor={colors.tint}
          value={username}
          onChangeText={setUsername}
          placeholder="Full Name"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          editable={false}
        />

        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.gray, color: colors.secondaryText },
          ]}
          selectionColor={colors.tint}
          value={identifier}
          onChangeText={setIdentifier}
          placeholder="Identifier"
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          editable={false}
        />

        <TextInput
          style={[styles.input, { backgroundColor: colors.gray }]}
          selectionColor={colors.tint}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          keyboardType="numeric"
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
