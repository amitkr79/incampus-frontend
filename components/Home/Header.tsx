import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "@/context/AuthContext";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "@/constants/Colors";

const Header = () => {
  const { user } = useContext(AuthContext);
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={[styles.container, { marginTop: headerHeight }]}>
      <View style={styles.topBar}>
        {/* Left: Logo + Name */}
        <View style={styles.leftSection}>
          <Image
            source={require("@/assets/icon/Light.png")}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>SMVIT</Text>
        </View>

        {/* Right: Notification Icon */}
        <Link href="/screens/smvitNotification" asChild>
          <TouchableOpacity>
            <Ionicons name="notifications" size={22} color="black" />
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures left and right spacing
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
   
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    height: 40,
    width: 40,
    borderRadius: 40,
    marginRight: 10, // Space between logo and text
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#BF1E2E",
  },
});

export default Header;
