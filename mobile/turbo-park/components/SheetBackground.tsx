import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { useColors } from "../constants/Colors";

interface SheetBackgroundProps extends BottomSheetBackdropProps {
  rounded: boolean;
}

const SheetBackground = ({ rounded, ...props }: SheetBackgroundProps) => {
  const colors = useColors();
  const radius = rounded ? 24 : 0;
  
  return (
    <View
      style={[
        props.style,
        {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: colors.background,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      ]}
    />
  );
};

export default SheetBackground;
