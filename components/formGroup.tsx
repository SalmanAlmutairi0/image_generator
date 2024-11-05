import { View, Text } from 'react-native'
import React from 'react'

export default function FormGroup({lable, children}: {lable: string, children: React.ReactNode}) {
  return (
    <View className="gap-2">
      <Text className="text-white text-lg ">{lable}</Text>
      {children}
    </View>
  );
}