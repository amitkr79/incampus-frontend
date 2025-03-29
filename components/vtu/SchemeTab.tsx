import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Dropdown, { OptionItem } from "./Dropdown"; // Adjust path if necessary
import {
  streamOptions,
  schemeOptions,
  yearOptions,
  branchOptions,
} from "@/data/dropdownData";
import PdfModalView from "@/components/Shared/PdfModalView";
import { AntDesign } from "@expo/vector-icons";
import { fetchScheme } from "@/api/syllabus"; // Fetch scheme from API

const SchemeTab = () => {
  const [selectedStream, setSelectedStream] = useState<OptionItem | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<OptionItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<OptionItem | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<OptionItem | null>(null);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [schemes, setSchemes] = useState([]); // Store fetched schemes

  // Check if all dropdowns are selected
  const allSelected =
    selectedStream && selectedScheme && selectedYear && selectedBranch;

  // Fetch scheme data when all dropdowns are selected
  useEffect(() => {
    const loadScheme = async () => {
      if (allSelected) {
        const data = await fetchScheme({
          stream: selectedStream.value,
          scheme: selectedScheme.value,
          year: selectedYear.value,
          branch: selectedBranch.value,
        });

        if (data) {
          setSchemes(Array.isArray(data) ? data : [data]); // Ensure it's an array
        } else {
          setSchemes([]);
        }
      }
    };

    loadScheme();
  }, [selectedStream, selectedScheme, selectedYear, selectedBranch]);

  return (
    <View style={styles.container}>
      {/* Row 1: Stream, Scheme, Year */}
      <View style={styles.tripleRow}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Stream</Text>
          <Dropdown
            data={streamOptions}
            onChange={setSelectedStream}
            placeholder="Select"
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Scheme</Text>
          <Dropdown
            data={schemeOptions}
            onChange={setSelectedScheme}
            placeholder="Select"
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Year</Text>
          <Dropdown
            data={yearOptions}
            onChange={setSelectedYear}
            placeholder="Select"
          />
        </View>
      </View>

      {/* Row 2: Branch */}
      <View style={styles.singleRow}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Branch</Text>
          <Dropdown
            data={branchOptions}
            onChange={setSelectedBranch}
            placeholder="Select Branch"
          />
        </View>
      </View>

      <View style={styles.resultText}>
        <Text style={styles.label}>Results</Text>
      </View>

      {/* Show warning message if not all options are selected */}
      {!allSelected && (
        <Text style={styles.warningText}>
          Please select all options to view the scheme.
        </Text>
      )}

      {/* Show message if no scheme is found */}
      {allSelected && schemes.length === 0 && (
        <Text style={styles.warningText}>
          No scheme found for the selected options.
        </Text>
      )}

      {/* Render schemes using FlatList */}
      <FlatList
        data={schemes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setSelectedSyllabus(item);
              setPdfVisible(true);
            }}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDate}>
                Last updated:{" "}
                {new Date(item.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </View>
            <AntDesign name="download" size={24} color="#1FD4AF" />
          </TouchableOpacity>
        )}
      />

      {/* PDF Modal */}
      <PdfModalView
        isVisible={pdfVisible}
        pdf={{ uri: selectedSyllabus?.pdfLink || "" }}
        onClose={() => setPdfVisible(false)}
      />
    </View>
  );
};

export default SchemeTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF",
  },
  tripleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  singleRow: {
    flexDirection: "row",
    marginVertical: 10,
  },
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    color: "#333",
  },
  resultText: {
    marginHorizontal: 5,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
  },
  warningText: {
    fontSize: 14,
    color: "red",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 50,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    padding: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  cardDate: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
