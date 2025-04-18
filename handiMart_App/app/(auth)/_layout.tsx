import { Stack } from "expo-router";
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign_in" />
      <Stack.Screen name="sign_up" />
    </Stack>
  );
}