import React, { useState } from "react";
import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  isVisible: boolean;
  pdf: { uri: string };
  onClose: () => void;
};

const PdfModalView = ({ isVisible, pdf, onClose }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const encodedUrl = encodeURIComponent(pdf.uri);
  const googleDocsViewer = `https://docs.google.com/gview?embedded=true&url=${encodedUrl}`;

  const handleLoadEnd = () => {
    setLoading(false);
    setError(null);
  };

  const handleError = () => {
    setError("Failed to load PDF. Open in browser instead.");
    setLoading(false);
  };

  const openInBrowser = () => {
    Linking.openURL(pdf.uri);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        {/* Modal Header */}
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>PDF Viewer</Text>
        </View>

        {/* WebView to Load PDF */}
        <View style={styles.webviewContainer}>
          {!error ? (
            <WebView
              key={pdf?.uri}
              source={{ uri: googleDocsViewer }}
              style={styles.webview}
              javaScriptEnabled
              domStorageEnabled
              onLoad={handleLoadEnd}
              onError={handleError}
            />
          ) : (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                onPress={openInBrowser}
                style={styles.browserButton}
              >
                <Text style={styles.browserButtonText}>Open in Browser</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Loader while PDF is loading */}
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
    left: 85,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#1FD4AF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  browserButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  browserButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PdfModalView;
