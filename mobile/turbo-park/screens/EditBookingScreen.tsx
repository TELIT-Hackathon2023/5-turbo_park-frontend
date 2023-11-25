import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomSheetNavigationOptions, BottomSheetScreenProps } from '@th3rdwave/react-navigation-bottom-sheet'
import SheetBackground from '../components/SheetBackground'
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { SheetParams } from '../types/SheetParams'

const EditBookingScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "editBooking">) => {
  return (
    <View>
      <Text>EditBookingScreen</Text>
    </View>
  )
}

export default EditBookingScreen

const styles = StyleSheet.create({})

export const editBookingSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["40%"],
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
