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

  navigation.addListener("focus", () => {
    refetch()
  })

  useEffect(() => {
    refetch()
  }, []);

  const refetch = () => {
    fetch(`http://147.232.155.76:8080/employee/${route.params.token}`)
      .then((response) => response.json() as Promise<Employee>)
      .then(setEmployee)
      .catch(console.log);

    fetch(`http://147.232.155.76:8080/ticket/user/${route.params.token}`)
      .then((response) => response.json() as Promise<EmployeeTicket>)
      .then((ticket) => {
        setEmployeeTicket(ticket);
      })
      .catch(console.log)
      .finally(() => setHasFetchedTicket(true));
  }

  console.log({employeeTicket})

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

      {employeeTicket?.id !== undefined && (
        <EditSlot
          name={employee.name}
          slotId={employeeTicket.parkingSlotID}
          fromTime={employeeTicket.startDate}
          toTime={employeeTicket.endDate}
          plate={employee.licencePlateNumber}
          onPress={() => {
            navigation.navigate("editBooking", {
              token: route.params.token,
              employeeTicket: employeeTicket
            });
          }}
        />
      )}

      {employeeTicket?.id === undefined && (
        <BookSlot
          name={employee.name}
          onPress={() => {
            navigation.navigate("date", { token: route.params.token });
          }}
        />
      )}
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
    marginTop: 20,
  },
  profileButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
});

export const landingSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["35%"],
  handleComponent: () => null,
  backgroundComponent: (props) => <SheetBackground {...props} rounded={true} />,
  // backdropComponent: (props) => (
  //   <BottomSheetBackdrop
  //     {...props}
  //     enableTouchThrough={true}
  //     appearsOnIndex={2}
  //     disappearsOnIndex={1}
  //     pressBehavior="collapse"
  //   />
  // ),
};
