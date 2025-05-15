import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Button from "@/components/Shared/Button";
import { useRouter } from "expo-router";
import axios from "axios";
import EventCard from "@/components/Events/EventCard";
import Colors from "@/constants/Colors";
import { AuthContext } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const Event = () => {
  const [eventlist, setEventList] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    GetAllEvents();
  }, []);

  const GetAllEvents = async () => {
    setLoading(true);
    // fetch all events from the server
    const result = await axios.get(process.env.EXPO_PUBLIC_HOST + "/events");
    console.log(result.data);
    setEventList(result.data);
    setLoading(false);
  };

  const GetUserEvent = async () => {
    setLoading(true);
    // fetch all events for the user
    const result = await axios.get(
      process.env.EXPO_PUBLIC_HOST + "/event-register?email=" + user?.email
    );
    console.log(result.data);
    setEventList(result.data);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event</Text>
        <TouchableOpacity
          onPress={() => router.push("/add-event")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}> + </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          marginBottom: 5,
          backgroundColor: Colors.WHITE,
          paddingHorizontal: 20,
          padding: 5,
          borderRadius: 10,
        }}
      >
        <Pressable
          onPress={() => {
            setSelectedTab(0);
            GetAllEvents();
          }}
        >
          <Text
            style={[
              styles.tabText,
              {
                backgroundColor:
                  selectedTab === 0 ? Colors.PRIMARY : Colors.WHITE,
                color: selectedTab === 0 ? Colors.WHITE : Colors.PRIMARY,
              },
            ]}
          >
            Upcoming
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setSelectedTab(1);
            GetUserEvent();
          }}
        >
          <Text
            style={[
              styles.tabText,
              {
                backgroundColor:
                  selectedTab === 1 ? Colors.PRIMARY : Colors.WHITE,
                color: selectedTab === 1 ? Colors.WHITE : Colors.PRIMARY,
              },
            ]}
          >
            Registered
          </Text>
        </Pressable>
      </View>

      {/* FlatList with extra bottom padding */}
      <FlatList
        data={eventlist}
        onRefresh={GetAllEvents}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <EventCard {...item} key={index} isRegistered={selectedTab === 1} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabText: {
    padding: 8,
    fontSize: 15,
    paddingHorizontal: 15,
    borderRadius: 99,
    fontWeight: "semibold",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.WHITE,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 4,
  },
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: Colors.BLACK,
    flex: 1,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
  },
});

export default Event;
