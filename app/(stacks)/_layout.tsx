
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
   const [AuthKey, setAuthKey] = useState('');

  const checkLoginStatus = async () => {
    try {
      const loginToken:any = await AsyncStorage.getItem('AuthToken');
      setAuthKey(loginToken);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  useEffect(()=>{
    checkLoginStatus()
  },[AuthKey])

  console.log(AuthKey,"ppppppppppppp")
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
      <Stack.Screen
      name='LiveDataScreen'
      options={{
        title:'LiveDataScreen'
        }}
        />
    </Stack>
  );
}
