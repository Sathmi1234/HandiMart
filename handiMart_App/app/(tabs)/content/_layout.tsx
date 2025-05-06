import { Stack } from 'expo-router';

export default function ContentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="posts" />
      <Stack.Screen name="sellers" />
      <Stack.Screen name="post/[id]" />
      <Stack.Screen name="seller/[id]" />
    </Stack>
  );
}