import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import NotificationBanner from "@/components/Shared/NotificationBanner";
import { NotificationSources } from "@/constants/NotificationSource";
import { fetchAicteCirculars } from "@/api/circular";

type ITEM = {
  title: string;
  icon: string;
  path: string;
};

const data: ITEM[] = [
  { title: "Circular", icon: "document-text-outline", path: "/aicte-screens/Circulars" },
  { title: "Announcement", icon: "megaphone-outline", path: "/aicte-screens/Anouncement" },
];

const AICTEScreens = () => {
  const router = useRouter();
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCirculars();
  }, []);

  const loadCirculars = async () => {
    try {
      setLoading(true);
      const data = await fetchAicteCirculars();
      setCirculars(data);
    } catch (error) {
      console.error("Error loading circulars:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Notification Banner */}
        <NotificationBanner notifications={circulars} source={NotificationSources.AICTE} loading={loading} />

        <Text style={styles.sectionTitle}>Resources</Text>

        <View style={styles.cardContainer}>
          {data.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={() => router.push(item.path)}>
              <Ionicons name={item.icon} size={30} color="#1FD4AF" />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AICTEScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAFA",
  },
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
    paddingLeft: 15,
    color: "#333",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 15,
  },
  card: {
    width: "48%",
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginBottom: 15,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
