import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { useColors } from "../constants/Colors";

interface NavigationBarProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  subtitle?: string;
  LeftButtonIcon?: FC<SvgProps>;
  leftButtonAction?: () => void;
  RightButtonIcon?: FC<SvgProps>;
  rightButtonAction?: () => void;
}

const NavigationBar = ({
  style,
  title,
  subtitle,
  LeftButtonIcon,
  leftButtonAction,
  RightButtonIcon,
  rightButtonAction,
}: NavigationBarProps) => {
  const colors = useColors();

  return (
    <View
      style={[
        style,
        {
          borderBottomColor: colors.gray,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.titles}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
              {subtitle}
            </Text>
          )}
        </View>

        {LeftButtonIcon && (
          <TouchableOpacity
            style={[styles.button, { left: 15, backgroundColor: colors.gray }]}
            onPress={leftButtonAction}
          >
            <LeftButtonIcon width={22} height={22} color={colors.tint} />
          </TouchableOpacity>
        )}

        {RightButtonIcon && (
          <TouchableOpacity
            style={[
              styles.button,
              { right: 15, backgroundColor: colors.gray },
            ]}
            onPress={rightButtonAction}
          >
            <RightButtonIcon width={22} height={22} color={colors.tint} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    minHeight: 32,
  },
  titles: {
    flex: 1,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NavigationBar;
