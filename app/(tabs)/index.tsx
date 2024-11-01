import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors';

export default function Home() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: Colors.primary }}>
      <Text className="text-3xl">Discover</Text>
    </SafeAreaView>
  );
}