import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const myTheme = {
  ...eva.light,
  'color-basic-100': '#FFFFFF',
  'text-basic-color': '#2E292B', // 기본 글자색 설정
  'color-secondary-500': '#926897', 
};

export default function RootLayout() {
  return (
    // ApplicationProvider
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <ApplicationProvider mapping={eva.mapping} theme={myTheme}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}> 
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}