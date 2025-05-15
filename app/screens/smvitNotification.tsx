import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import PdfModalView from "@/components/Shared/PdfModalView";
import { smvitNotificationData } from "@/data/notification";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const NotificationScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ uri: string } | null>(null);

  // useEffect(() => {
  //   console.log("Notifications:", smvitNotificationData);
  // }, []);

  const handleItemPress = (pdfUri: string) => {
    setSelectedPdf({ uri: pdfUri });
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedPdf(null);
    setModalVisible(false);
  };

  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      {/* 🔹 Header */}
       <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Notification</Text>
            </View>

      {/* 🔹 Notification List */}
      {smvitNotificationData.length === 0 ? (
        <Text style={styles.noDataText}>No notifications available</Text>
      ) : (
        <FlatList
          data={smvitNotificationData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item.link)} style={styles.listItem}>
              <Ionicons name="document-text-outline" size={24} color="#1FD4AF" style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.listTitle}>{item.text}</Text>
                <Text style={styles.listDate}>{item.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>
          )}
        />
      )}

      {/* 🔹 PDF Modal */}
      {selectedPdf && <PdfModalView isVisible={isModalVisible} pdf={selectedPdf} onClose={closeModal} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding:5
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#1FD4AF",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    backgroundColor: Colors.WHITE,
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
