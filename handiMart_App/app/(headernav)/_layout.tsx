import { Stack } from 'expo-router';

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="notification" />
      <Stack.Screen name="cart" />
    </Stack>
  );
} 