import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import PdfModalView from "@/components/Shared/PdfModalView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { fetchAicteCirculars } from "@/api/circular"; // API to fetch circulars

interface Circular {
  id: string;
  text: string;
  link: string;
  date: string;
  type: string;
}

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Circular[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ uri: string } | null>(null);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const data = await fetchAicteCirculars();
        setNotifications(data);
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };
    getNotifications();
  }, []);

  const handleItemPress = (pdfUri: string) => {
    setSelectedPdf({ uri: encodeURI(pdfUri) });
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPdf(null);
    setModalVisible(false);
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const renderItem = ({ item }: { item: Circular }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.link)} style={styles.listItem}>
      <Ionicons name="document-text-outline" size={24} color="#1FD4AF" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.listTitle} numberOfLines={2}>{item.text}</Text>
        <Text style={styles.listDate}>{formatDate(item.date)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      {loading ? (
        <ActivityIndicator size="large" color="#1FD4AF" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : notifications.length === 0 ? (
        <Text style={styles.noDataText}>No notifications available</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      {selectedPdf && (
        <PdfModalView
          isVisible={isModalVisible}
          pdf={selectedPdf}
          onClose={closeModal}
        />
      )}
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 5,
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFF",
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  listDate: {
    fontSize: 14,
    color: "#666",
    marginTop: 3,
  },
  noDataText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default NotificationScreen;
