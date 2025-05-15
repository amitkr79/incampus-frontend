import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Left: Logo + Name */}
      <View style={styles.brandContainer}>
        <Image
          source={require("@/assets/icon/Light.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.brandName}>SMVIT</Text>
          <Text style={styles.brandSubtitle}>College</Text>
        </View>
      </View>

      {/* Right: Notification Icon */}
      <Link href="/screens/smvitNotification" asChild>
        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <Ionicons 
              name="notifications-outline" 
              size={24} 
              color={Colors.PRIMARY} 
            />
            {/* Notification badge - make dynamic as needed */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.ACCENT,
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: Colors.GRAY,
    marginTop: -2,
  },
  notificationButton: {
    padding: 8,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.ACCENT,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.WHITE,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Header;