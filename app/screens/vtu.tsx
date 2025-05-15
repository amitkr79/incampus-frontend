import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import NotificationBanner from "@/components/Shared/NotificationBanner";
import { fetchCirculars } from "@/api/circular";
import { NotificationSources } from "@/constants/NotificationSource";
import Colors from "@/constants/Colors";

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
    loadCirculars();
  }, []);

  const loadCirculars = async () => {
    try {
      setLoading(true);
      const data = await fetchCirculars();
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
        <NotificationBanner notifications={circulars} source={NotificationSources.VTU} loading={loading} />

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
  },
  scrollContainer: {
    paddingTop: 10, // ✅ Fix spacing above NotificationBanner
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
