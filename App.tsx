import React, { useCallback, useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';

import {
  useFonts as useMontserrat,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  useFonts as useOpenSans,
  OpenSans_300Light,
  OpenSans_400Regular,
} from '@expo-google-fonts/open-sans';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [openSansLoaded] = useOpenSans({
    OpenSans_300Light,
    OpenSans_400Regular,
  });

  const onReady = useCallback(async () => {
    if (montserratLoaded && openSansLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [montserratLoaded, openSansLoaded]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  if (!montserratLoaded || !openSansLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1B3B6F" />
      <AppNavigator />
    </>
  );
}