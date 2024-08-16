// app/_layout.js
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header on all screens
      }}
    >
      <Stack.Screen name="(tabs)"/>
      </Stack>
  );
}
