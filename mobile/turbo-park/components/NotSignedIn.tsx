import { StyleSheet, Text, View } from "react-native";
import { useColors } from "../constants/Colors";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

interface NotSignedInProps {
  onPress: () => void;
}

const NotSignedIn = ({ onPress }: NotSignedInProps) => {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, { color: colors.text }]}>
        Hey stranger!
      </Text>
      <Text style={[styles.subtitleText, { color: colors.secondaryText }]}>
        Please sign in to use this app.
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotSignedIn;

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
