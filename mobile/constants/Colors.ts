import { useColorScheme } from "react-native";

export const Colors = {
  light: {
    tint: "#FF7675FF",
  },
  dark: {
    tint: "#FF7675FF",
  },
};

export const useColors = () => {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  return colors;
};
