import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors';

export default function Profile() {
  return (
    <SafeAreaView className='flex-1 items-center justify-center' style={{ backgroundColor: Colors.primary }}>
      <Text>Profile</Text>
    </SafeAreaView>
  );
}