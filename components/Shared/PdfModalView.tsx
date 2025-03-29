import React, { useState } from "react";
import { Modal, View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  isVisible: boolean;
  pdf: { uri: string };
  onClose: () => void;
};

const PdfModalView = ({ isVisible, pdf, onClose }: Props) => {
  const [loading, setLoading] = useState<boolean>(true); // Loader state

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        {/* Header with Close Button */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PDF Viewer</Text>
        </View>

        {/* WebView (Always Rendered) */}
        <View style={styles.webviewContainer}>
          <WebView
            source={{ uri: `https://docs.google.com/gview?embedded=true&url=${pdf?.uri}` }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onLoad={() => setLoading(false)} // Hide loader when PDF loads
          />

          {/* Loader Overlay (Hides When WebView Loads) */}
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#1FD4AF" />
              <Text style={styles.loadingText}>Loading PDF...</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFAFA",
    padding: 5,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    backgroundColor: "#1FD4AF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  closeButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center", 
    left:85
  },
  webviewContainer: {
    flex: 1,
    position: "relative", // Required for overlay effect
  },
  webview: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject, // Position loader over WebView
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent overlay
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#1FD4AF",
  },
});

export default PdfModalView;
