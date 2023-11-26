import {
  BottomSheetNavigationOptions,
  BottomSheetScreenProps,
} from "@th3rdwave/react-navigation-bottom-sheet";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SheetBackground from "../components/SheetBackground";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import BookSlot from "../components/BookSlot";
import EditSlot from "../components/EditSlot";
import { SheetParams } from "../types/SheetParams";
import Profile from "../assets/profile.svg";
import { useColors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { EmployeeTicket } from "../types/EmployeeTicket";
import { Employee } from "../types/Employee";

const LandingScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "landing">) => {
  const colors = useColors();

  const [employee, setEmployee] = useState<Employee>();
  const [hasFetchedTicket, setHasFetchedTicket] = useState(false);
  const [employeeTicket, setEmployeeTicket] = useState<EmployeeTicket>();

  useEffect(() => {
    fetch(`http://147.232.155.76:8080/employee/${route.params.token}`)
      .then((response) => response.json() as Promise<Employee>)
      .then(setEmployee)
      .catch(console.log);

    fetch(`http://147.232.155.76:8080/ticket/user/${route.params.token}`)
      .then((response) => response.json() as Promise<EmployeeTicket>)
      .then(setEmployeeTicket)
      .catch(console.log)
      .finally(() => setHasFetchedTicket(true));
  }, []);

  if (!employee || !hasFetchedTicket) {
    return <ActivityIndicator color={colors.tint} />;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/telekom-logo.jpg")}
      />

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => {
          navigation.navigate("profile", { token: route.params.token });
        }}
      >
        <Profile width={32} height={32} color={colors.tint} />
      </TouchableOpacity>

      {employeeTicket && (
        <EditSlot
          name={employee.name}
          slotId={employeeTicket.parkingSlotID}
          fromTime={employeeTicket.startDate}
          toTime={employeeTicket.endDate}
          plate={employee.licencePlateNumber}
          onPress={() => {
            console.log("edit")
          }}
        />
      )}

      {/* <BookSlot name="John" onPress={() => {}} /> */}

      {/* <EditSlot
        name="John"
        slotId="1"
        time="9-18"
        plate="KE0000AA"
        onPress={() => {}}
      /> */}
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    width: 64,
    height: 64,
  },
  profileButton: {
    position: "absolute",
    right: 20,
    top: 0,
  },
});

export const landingSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["35%"],
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
