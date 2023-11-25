import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../constants/Colors";

interface BookSlotProps {
  name: string;
  onPress: () => void;
}

const BookSlot = ({ name, onPress }: BookSlotProps) => {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, { color: colors.text }]}>
        Hey {name}!
      </Text>
      <Text style={[styles.subtitleText, { color: colors.secondaryText }]}>
        You currently have no active bookings.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Book now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookSlot;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 22,
    alignSelf: "center",
  },
  subtitleText: {
    marginTop: 4,
    fontSize: 16,
    alignSelf: "center",
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
