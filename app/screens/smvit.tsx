import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { examCircular } from "@/data/notification";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import PdfModalView from "@/components/Shared/PdfModalView";

interface Circular {
  id: string;
  text: string;
  link: string;
  Date: string;
  Year: number;
}

const ExaminationCircular: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCircular, setSelectedCircular] = useState<Circular | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [yearModalVisible, setYearModalVisible] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [selectedYear, setSelectedYear] = useState(() => {
    const uniqueYears = Array.from(
      new Set(examCircular.map((item) => item.Year))
    );
    return Math.max(...uniqueYears);
  });

  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(examCircular.map((item) => item.Year))
    );
    return uniqueYears.sort();
  }, []);

  const openModal = (circular: Circular) => {
    setSelectedCircular(circular);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCircular(null);
    setModalVisible(false);
  };

  // 📌 **Updated Download Function (Supports Android & iOS)**
  const downloadPDF = async (circular:Circular) => {
    try {
      // Format the title to create a valid file name
      const fileName = circular.text.replace(/[^a-zA-Z0-9]/g, "_") + ".pdf";
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
  
      // Download the file
      const { uri } = await FileSystem.downloadAsync(circular.link, fileUri);
  
      // Open Share Dialog
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Download Complete", "File saved internally. Open using a file manager.");
      }
    } catch (error) {
      console.error("Download Error:", error);
      Alert.alert("Download Error", "Failed to download PDF.");
    }
  };
  

  const filteredCirculars = examCircular.filter(
    (item) => item.Year === selectedYear
  );

  const renderItem = ({ item }: { item: Circular }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => openModal(item)}>
          <Text style={styles.circularText}>{item.text}</Text>
          <Text style={styles.dateText}>{item.Date}</Text>
          <Text style={styles.linkText}>Read more!</Text>
        </TouchableOpacity>
      </View>

      {/* 📌 Download Button with Loader */}
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Examination Circulars</Text>

        {/* Year Picker Button */}
        <TouchableOpacity
          onPress={() => setYearModalVisible(true)}
          style={styles.yearButton}
        >
          <Text style={styles.yearButtonText}>{selectedYear}</Text>
        </TouchableOpacity>
      </View>

      {/* Circular List */}
      <FlatList
        data={filteredCirculars}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* PDF Modal */}
      {selectedCircular && (
        <PdfModalView
          isVisible={modalVisible}
          pdf={{ uri: selectedCircular?.link }}
          onClose={closeModal}
        />
      )}

      {/* Year Selection Modal */}
      <Modal animationType="slide" transparent visible={yearModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.yearModalContent}>
            <Text style={styles.modalTitle}>Select Year</Text>
            {years.map((year) => (
              <TouchableOpacity
                key={year}
                style={styles.yearOption}
                onPress={() => {
                  setSelectedYear(year);
                  setYearModalVisible(false);
                }}
              >
                <Text style={styles.yearOptionText}>{year}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setYearModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFFAFA", 
    padding: 10 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1FD4AF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerButton: { 
    padding: 5 
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    flex: 1,
    textAlign: "center",
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
     color: "black"
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
  dateText: { 
    fontSize: 12, 
    color: "gray", 
    marginBottom: 4 
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  yearModalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007AFF",
  },
  closeButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  yearOption: {
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  yearOptionText: {
    fontSize: 16,
    color: "#007AFF",
  },
});

export default ExaminationCircular;
