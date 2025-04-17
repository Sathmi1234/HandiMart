import { Stack } from "expo-router";
import Index from "./index"

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="Index" />
  </Stack>;
}
