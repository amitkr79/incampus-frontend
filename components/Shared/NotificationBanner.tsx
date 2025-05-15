import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, Animated, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { NotificationSources } from "@/constants/NotificationSource";

const { width } = Dimensions.get("window");

const NotificationBanner = ({ notifications, source, loading }: any) => {
  const latestNotifications = notifications.slice(0, 3);
  const scrollX = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);

  useEffect(() => {
    if (!loading && latestNotifications.length > 1) {
      const interval = setInterval(() => {
        currentIndex.current = (currentIndex.current + 1) % latestNotifications.length;
        Animated.timing(scrollX, {
          toValue: -currentIndex.current * (width - 80),
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [loading, latestNotifications]);

  const handleBannerPress = () => {
    const routes: Record<string, string | undefined> = {
      [NotificationSources.VTU]: "/screens/vtuNotification",
      [NotificationSources.SMVIT]: "/screens/smvitNotification",
      [NotificationSources.AICTE]: "/aicte-screens/Notification",
    };

    const selectedRoute = routes[source];
    if (selectedRoute) {
      router.push(selectedRoute);
    } else {
      console.warn("Invalid notification source:", source);
    }
  };

  return (
    <TouchableOpacity onPress={handleBannerPress} style={styles.cardContainer}>
      <Text style={styles.cardTitle}>📌 Notifications</Text>

      <View style={styles.scrollWrapper}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#1FD4AF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : latestNotifications.length === 0 ? (
          <Text style={styles.noDataText}>No notifications available</Text>
        ) : (
          <Animated.View style={{ flexDirection: "row", transform: [{ translateX: scrollX }] }}>
            {latestNotifications.map((notification) => (
              <View key={notification.id} style={[styles.notificationItem, { width: width - 80 }]}>
                <Text style={styles.notificationText} numberOfLines={2} ellipsizeMode="tail">
                  {notification.text}
                </Text>
              </View>
            ))}
          </Animated.View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: width - 25,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: "center",
    minHeight: 100,        // ✅ Changed from fixed height
    paddingVertical: 5,   // ✅ Prevents extra vertical spacing
    // marginBottom: 10,     // Optional: adds breathing room below
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#BF1E2E",
  },
  scrollWrapper: {
    overflow: "hidden",
    width: width - 80,
    height: 50,
    justifyContent: "center",
  },
  notificationItem: {
    justifyContent: "center",
  },
  notificationText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    textAlign: "left",
  },
  loaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  loadingText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 10,
  },
  noDataText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});

export default NotificationBanner;
