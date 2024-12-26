import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const loginStatus = await AsyncStorage.getItem('isLoggedIn');
      if (loginStatus === 'true') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  useEffect(()=>{
    checkLoginStatus()
  },[])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
       
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'SignupScreen',
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        options={{
          title: 'HomeScreen',
        }}
      />
    </Stack>
  );
}
