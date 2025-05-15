import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import moment from "moment";

type USERAVATAR = {
  name: string;
  image: string;
  date: string;
  branch?:string;
};

const UserAvatar = ({ name, image, date,branch="Master of computer application" }: USERAVATAR) => {
  return (
    <View style={styles.container}>
      <View style={styles.userRow}>
        {/* User Image */}
        <Image source={{ uri: image }} style={styles.avatar} />

        {/* User Name & Info */}
        <View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userInfo}>{branch}</Text>
          <Text style={styles.timeAgo}>{moment(date).format("MMM Do YY") }</Text>
        </View>
      </View>

      {/* More Options */}
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={22} color={Colors.GRAY} />
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userInfo: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 2,
  },
  timeAgo: {
    fontSize: 12,
    color: Colors.GRAY,
    marginTop: 2,
  },
});

export default UserAvatar;
