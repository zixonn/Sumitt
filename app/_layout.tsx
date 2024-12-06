import { MyDarkTheme, MyLightTheme } from "@/constants/Colors";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar"

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
      <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : MyLightTheme}>
        <SafeAreaProvider>
          <StatusBar />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="(options)"/>
            <Stack.Screen name="(summary)"/>
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
  );
}
