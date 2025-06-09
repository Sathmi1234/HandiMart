import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { useColorScheme } from "react-native";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/contexts/ToastContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider
      theme={colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme}
    >
      <AuthProvider>
        <ToastProvider>
          <StatusBar style="auto" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
            {/* Add other stack screens here */}
          </Stack>
        </ToastProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
