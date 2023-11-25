import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useColors } from "../constants/Colors";

interface EditSlotProps {
  name: string;
  slotId: string;
  time: string;
  plate: string;
  onPress: () => void;
}

const EditSlot = ({ name, slotId, time, plate, onPress }: EditSlotProps) => {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, { color: colors.text }]}>
        Hey {name}!
      </Text>

      <Text style={[styles.subtitleText, { color: colors.secondaryText }]}>
        {slotId}
      </Text>

      <Text style={[styles.subtitleText, { color: colors.secondaryText }]}>
        {time}
      </Text>

      <Text style={[styles.subtitleText, { color: colors.secondaryText }]}>
        {plate}
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditSlot;

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
