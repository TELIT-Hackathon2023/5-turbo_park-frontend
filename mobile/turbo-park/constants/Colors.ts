import { useColorScheme } from "react-native";

export const Colors = {
  light: {
    tint: "#E20074FF",
    text: "#000000FF",
    secondaryText: "#0000007F",
    background: "#FFFFFFFF",
    gray: "#EFEFF0FF",
    green: "#00B367FF",
    red: "#E82010FF",
  },
  dark: {
    tint: "#E20074FF",
    text: "#000000FF",
    secondaryText: "#0000007F",
    background: "#FFFFFFFF",
    gray: "#EFEFF0FF",
    green: "#00B367FF",
    red: "#E82010FF",
  },
};

export const useColors = () => {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  return colors;
};
