import { useColorScheme } from "react-native";

export const Colors = {
  light: {
    tint: "#E20074FF",
    text: "#000000FF",
    secondaryText: "#00000041",
    background: "#FFFFFFFF",
    gray: "#F7F7F8FF",
    green: "#00B367FF",
    red: "#E82010FF",
  },
  dark: {
    tint: "#E20074FF",
    text: "#000000FF",
    secondaryText: "#00000041",
    background: "#FFFFFFFF",
    gray: "#F7F7F8FF",
    green: "#00B367FF",
    red: "#E82010FF",
  },
};

export const useColors = () => {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  return colors;
};
