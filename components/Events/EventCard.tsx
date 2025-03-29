import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Share,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../Shared/Button";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

type EVENT = {
  id: number;
  name: string;
  bannerurl: string;
  location: string;
  link: string;
  event_date: string;
  event_time: string;
  createdby: string;
  username: string;
  isRegistered: boolean;
};

const EventCard = (event: EVENT) => {
  const { user } = useContext(AuthContext);

  // 📌 Register for event
  const RegisterForEvent = () => {
    Alert.alert(
      "Register for event",
      "Are you sure you want to register for this event?",
      [
        { text: "Yes", onPress: () => saveRegistration() },
        {
          text: "Cancel",
          onPress: () => console.log("Not registering"),
          style: "cancel",
        },
      ]
    );
  };

  // 📌 Save event registration to database
  const saveRegistration = async () => {
    try {
      const result = await axios.post(
        process.env.EXPO_PUBLIC_HOST + "/event-register",
        {
          eventId: event.id,
          userEmail: user?.email,
        }
      );

      if (result.status === 200) {
        Alert.alert(
          "Great!",
          "You have successfully registered for this event."
        );
      }
    } catch (error) {
      console.error("Registration failed:", error);
      Alert.alert("Error", "Failed to register for the event.");
    }
  };

  // 📌 Share Event (Image + Text)
  const shareEvent = async () => {
    try {
      // 1️⃣ Download event banner to local storage
      const fileUri = `${FileSystem.cacheDirectory}event-banner.jpg`;
      const downloadResult = await FileSystem.downloadAsync(
        event.bannerurl,
        fileUri
      );
      const localImageUri = downloadResult.uri;

      // 2️⃣ Share Message
      const shareMessage = `
📢 **${event.name}** 📢

📅 Date: ${event.event_date}
⏰ Time: ${event.event_time}
📍 Location: ${event.location}
🔗 Register here: ${event.link}

Join us for this amazing event! 🎉
      `;

      if (Platform.OS === "ios") {
        // ✅ iOS: Share both image & text together
        await Share.share({
          message: shareMessage,
          url: localImageUri, // Attach Image
        });
      } else {
        // ✅ Android: Share image first, then ask user to copy text manually
        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
          await Sharing.shareAsync(localImageUri, {
            dialogTitle: "Share Event Image",
          });
          Alert.alert("Text to Share", shareMessage, [
            {
              text: "Copy",
              onPress: () => Share.share({ message: shareMessage }),
            },
          ]);
        } else {
          Alert.alert(
            "Sharing Not Available",
            "Your device does not support sharing images."
          );
        }
      }
    } catch (error) {
      console.error("Error sharing event:", error);
      Alert.alert("Sharing Failed", "Could not share the event.");
    }
  };

  return (
    <View
      style={{ padding: 20, backgroundColor: Colors.WHITE, marginBottom: 3 }}
    >
      <Image
        source={{ uri: event.bannerurl }}
        style={{
          height: 260,
          objectFit: "contain",
          borderRadius: 15,
          backgroundColor: "black",
        }}
      />
      <Text style={{ fontSize: 23, fontWeight: "bold", marginTop: 7 }}>
        {event.name}
      </Text>
      <Text style={{ color: Colors.GRAY, fontSize: 16 }}>
        Event by {event.username}
      </Text>
      <View style={styles.subContainer}>
        <Ionicons name="location-outline" size={24} color={Colors.GRAY} />
        <Text style={{ color: Colors.GRAY, fontSize: 16 }}>
          {event.location}
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Ionicons name="calendar-outline" size={24} color={Colors.GRAY} />
        <Text style={{ color: Colors.GRAY, fontSize: 16 }}>
          {event.event_date} at {event.event_time}
        </Text>
      </View>
      {
        !event.isRegistered ?
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Button
          text="Share"
          outline={true}
          fullWidth={true}
          onPress={shareEvent}
        />
        <Button text="Register" fullWidth={true} onPress={RegisterForEvent} />
      </View>:
    //   to do work to implemtn unregister event
        <Button text='Unregister' outline={true} onPress={()=>console.log("unregistered")} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 5,
  },
});

export default EventCard;
