import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";

import { fetchAicteAnouncement } from "@/api/circular";
import PdfModalView from "@/components/Shared/PdfModalView";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

interface Circular {
  _id: string;
  text: string;
  link: string;
  date: string;
  type: string;
}

const Circulars = () => {
  const navigation = useNavigation();
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCircular, setSelectedCircular] = useState<Circular | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // getCircular()
  }, []);

  const getCircular = async () => {
    try {
      setLoading(true);
      const data = await fetchAicteAnouncement();
      setCirculars(data);
      setError(null);
    } catch (error) {
      setError("Failed to load circulars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Open PDF Modal
  const openModal = (circular: Circular) => {
    setSelectedCircular(circular);
    setModalVisible(true);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedCircular(null);
    setModalVisible(false);
  };

  // Download & Share PDF
  const downloadPDF = async (circular: Circular) => {
    try {
      setIsDownloading(true);
      const fileName = circular.text.replace(/[^a-zA-Z0-9]/g, "_") + ".pdf";
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      // Download File
      const { uri } = await FileSystem.downloadAsync(circular.link, fileUri);

      // Open Share Dialog
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert(
          "Download Complete",
          "File saved internally. Open using a file manager."
        );
      }
    } catch (error) {
      Alert.alert("Download Error", "Failed to download PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Render Circular List Item
  const renderItem = ({ item }: { item: Circular }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => openModal(item)}>
          <Text style={styles.circularText}>{item.text}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.linkText}>Read more!</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => downloadPDF(item)}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : (
          <Ionicons name="download-outline" size={28} color="#007AFF" />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header (Always Visible) */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Anouncement</Text>
        <TouchableOpacity onPress={() => {}} style={styles.yearButton}>
          <Text style={styles.yearButtonText}>2025</Text>
        </TouchableOpacity>
      </View>

      {/* Loading/Error Handling inside the content area only */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1FD4AF" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={circulars}
          onRefresh={getCircular}
          refreshing={loading}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* PDF Modal */}
      {selectedCircular && (
        <PdfModalView
          isVisible={modalVisible}
          pdf={{ uri: selectedCircular?.link }}
          onClose={closeModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: "#FFFAFA",
     padding: 5 ,
    // marginTop:StatusBar.currentHeight
  },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: Colors.WHITE,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.BLACK,
    flex: 1,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textContainer: { flex: 1 },
  circularText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  dateText: { fontSize: 12, color: "gray", marginBottom: 4 },
  linkText: {
    color: "#007AFF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  yearButton: {
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  yearButtonText: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
  },
});

export default Circulars;
