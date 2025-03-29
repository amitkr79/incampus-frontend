import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import NotificationBanner from "@/components/Shared/NotificationBanner";
import { fetchCirculars } from "@/api/circular";

const data = [
  { title: "Exams Circular", icon: "document-text-outline", path: "/vtuScreens/examination" },
  { title: "Scheme & Syllabus", icon: "book-outline", path: "/vtuScreens/scheme" },
  { title: "Results", icon: "school-outline", path: "/vtuScreens/results" },
  { title: "Previous Year Paper", icon: "document-outline", path: "/vtuScreens/pyq" },
];

const VTUScreens = () => {
  const router = useRouter();
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCirculars = async () => {
      try {
        const data = await fetchCirculars();
        setCirculars(data);
      } catch (error) {
        console.error("Error loading circulars:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCirculars();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>VTU</Text>
        <TouchableOpacity onPress={() => router.push("/screens/vtuNotification")} style={styles.headerButton}>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* {loading ? (
          <ActivityIndicator size="large" color="#1FD4AF" style={{ marginVertical: 20 }} />
        ) : (
          <NotificationBanner notifications={circulars} source={"vtu"} />
        )} */}
          <NotificationBanner notifications={circulars} source={"vtu"} />
        <Text style={styles.sectionTitle}>Circular & Resources</Text>

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

export default VTUScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAFA",
    padding: 5,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1FD4AF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
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
