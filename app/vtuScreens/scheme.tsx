import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SchemeTab from "@/components/vtu/SchemeTab";
import SyllabusTab from "@/components/vtu/SyllabusTab";

const SchemeSelection = () => {
  const [selectedTab, setSelectedTab] = useState<"scheme" | "syllabus">("scheme");
  const router = useRouter();

  // Animated value for the indicator position
  const indicatorAnim = useRef(new Animated.Value(0)).current;
  const [tabContainerWidth, setTabContainerWidth] = useState(0);

  useEffect(() => {
    // Animate the indicator value when the tab changes
    Animated.timing(indicatorAnim, {
      toValue: selectedTab === "scheme" ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false, // because we're animating layout properties (left)
    }).start();
  }, [selectedTab, indicatorAnim]);

  // Interpolate the left position of the indicator based on the animated value
  const indicatorLeft = indicatorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, tabContainerWidth / 2],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scheme & Syllabus</Text>
      </View>

      {/* Tabs Section */}
      <View
        style={styles.tabContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setTabContainerWidth(width);
        }}
      >
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab("scheme")}>
          <Text style={[styles.tabText, selectedTab === "scheme" && styles.activeTabText]}>
            Scheme
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setSelectedTab("syllabus")}>
          <Text style={[styles.tabText, selectedTab === "syllabus" && styles.activeTabText]}>
            Syllabus
          </Text>
        </TouchableOpacity>
        {/* Animated Underline Indicator */}
        <Animated.View
          style={[styles.indicator, { width: tabContainerWidth / 2, left: indicatorLeft }]}
        />
      </View>

      {/* Switching Between Tabs */}
      {selectedTab === "scheme" ? <SchemeTab /> : <SyllabusTab />}
    </SafeAreaView>
  );
};

export default SchemeSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAFA",
    padding: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1FD4AF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
    position: "relative",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#1FD4AF",
    fontWeight: "bold",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    backgroundColor: "#1FD4AF",
  },
});
