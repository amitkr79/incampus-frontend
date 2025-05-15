import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import Header from "./Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Custom Header */}
      <Header />
      
      {/* Main Content */}
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false, // We're using our custom header
            contentStyle: { backgroundColor: '#ffffff' },
          }}
        >
          {/* Add other screens as needed */}
        </Stack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
});