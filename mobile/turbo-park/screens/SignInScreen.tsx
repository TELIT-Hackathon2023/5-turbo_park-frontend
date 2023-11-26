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
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { SheetParams } from "../types/SheetParams";
import NavigationBar from "../components/NavigationBar";
import { useColors } from "../constants/Colors";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "signIn">) => {
  const colors = useColors();
  const [emailAddress, setEmailAddres] = useState<string>();
  const [password, setPassword] = useState<string>();

  const storeUserToken = async (token: number) => {
    try {
      await AsyncStorage.setItem("token", token.toString());
      navigation.navigate("landing", { token });
    } catch (e) {
      console.log({ e });
    }
  };

  const signIn = async () => {
    await fetch("http://147.232.155.76:8080/employee/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailAddress,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log({response})
        return;
      }
      response.json().then((value) => {
        const token = value.token;
        console.log(`received token: ${token}`);
        storeUserToken(token);
      });
    });
  };

  const signUp = () => {
    navigation.navigate("signUp");
  };

  return (
    <>
      <NavigationBar title="Sign In" />

      <Text style={[styles.text, { color: colors.secondaryText }]}>
        Hello stranger! Please sign in to use this app.
      </Text>

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

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={signIn}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text
        style={[styles.text, { color: colors.secondaryText, marginTop: 20 }]}
      >
        Not a member?
      </Text>
      <TouchableOpacity onPress={signUp}>
        <Text style={[styles.signUpText, { color: colors.tint }]}>Sign Up</Text>
      </TouchableOpacity>
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
  },
  text: {
    alignSelf: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#FFFFFF",
  },
  signUpText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export const signInSheetOptions: BottomSheetNavigationOptions = {
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
