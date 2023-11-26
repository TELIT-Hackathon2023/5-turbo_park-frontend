import { StyleSheet, Text, View } from 'react-native'
import { SheetParams } from '../types/SheetParams'
import { BottomSheetNavigationOptions, BottomSheetScreenProps } from '@th3rdwave/react-navigation-bottom-sheet'
import SheetBackground from '../components/SheetBackground'
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useEffect } from 'react'

const AvailableSlotsScreen = ({
  route,
  navigation,
}: BottomSheetScreenProps<SheetParams, "availableSlots">) => {

  useEffect(() => {
    fetch("http://147.232.155.76:8080/parkingslot", {
      method: "POST",
      body: JSON.stringify({
        startDate: route.params.startDate,
        endDate: route.params.endDate
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        console.log({response})
        return;
      }
      response.json().then((value) => {
        console.log({value})
      });
    });
  }, [])

  return (
    <View>
      <Text>AvailableSlotsScreen</Text>
    </View>
  )
}

export default AvailableSlotsScreen

const styles = StyleSheet.create({})

export const availableSlotsSheetOptions: BottomSheetNavigationOptions = {
  index: 0,
  snapPoints: ["55%"],
  backgroundComponent: (props) => <SheetBackground {...props} rounded={true} />,
  backdropComponent: (props) => (
    <BottomSheetBackdrop
      {...props}
      enableTouchThrough={true}
      appearsOnIndex={-1}
      disappearsOnIndex={0}
      pressBehavior="collapse"
    />
  ),
};
