import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function SellerLayout() {
  return (
    <>      
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
