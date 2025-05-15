import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LayoutScreens = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Anouncement"  />
      <Stack.Screen name="Circulars"  />
      <Stack.Screen
        name="Notification"
        options={{
          headerTitle: "Notification",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default LayoutScreens;
