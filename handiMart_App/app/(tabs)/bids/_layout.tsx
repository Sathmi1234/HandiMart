import { Stack } from 'expo-router';

export default function BidsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="yourBids" />
      <Stack.Screen name="trendingBids" />
    </Stack>
  );
} 