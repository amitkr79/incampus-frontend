import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Dropdown, { OptionItem } from "./Dropdown";
import {
  streamOptions,
  schemeOptions,
  yearOptions,
  branchOptions,
} from "@/data/dropdownData";
import PdfModalView from "@/components/Shared/PdfModalView";
import { AntDesign } from "@expo/vector-icons";
import { fetchSyllabus } from "@/api/syllabus";

type SubjectItem = {
  code: string;
  title: string;
  pdfLink: string;
  date: string;
};
type FullsyllabusItem = {
  title: string;
  pdfLink: string;
  date?: string;
};
type SyllabusType = {
  title: string;
  subjects: SubjectItem[];
  fullsyllabus: FullsyllabusItem[];
};

const SyllabusTab = () => {
  const [selectedStream, setSelectedStream] = useState<OptionItem | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<OptionItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<OptionItem | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<OptionItem | null>(null);

  const [selectedSyllabus, setSelectedSyllabus] = useState<SyllabusType | null>(
    null
  );
  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfLink, setPdfLink] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allSelected =
    selectedStream && selectedScheme && selectedYear && selectedBranch;

  useEffect(() => {
    const getSyllabus = async () => {
      if (!allSelected) return;

      setLoading(true);
      setError(null);
      setSelectedSyllabus(null);

      try {
        const syllabus = await fetchSyllabus({
          stream: selectedStream!.value,
          scheme: selectedScheme!.value,
          year: selectedYear!.value,
          branch: selectedBranch!.value,
        });
         console.log("Raw API response:", JSON.stringify(syllabus, null, 2)); // Add this line

        if (
          syllabus &&
          (syllabus.subjects?.length > 0 || syllabus.fullsyllabus?.length > 0)
        ) {
          setSelectedSyllabus(syllabus);
        } else {
          setError("No syllabus found for the selected options.");
        }
      } catch {
        setError("Failed to fetch syllabus. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getSyllabus();
  }, [selectedStream, selectedScheme, selectedYear, selectedBranch]);

  const renderCard = (item: SubjectItem | FullsyllabusItem) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setPdfLink(item.pdfLink);
        setPdfVisible(true);
      }}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {item.date && (
          <Text style={styles.cardDate}>
            Last updated:{" "}
            {new Date(item.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Text>
        )}
      </View>
      <AntDesign name="download" size={24} color="#1FD4AF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Dropdowns */}
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

      {/* Result Title */}
      <View style={styles.resultText}>
        <Text style={styles.label}>Results</Text>
      </View>

      {!allSelected && (
        <Text style={styles.warningText}>
          Please select all options to view the syllabus.
        </Text>
      )}
      {loading && <ActivityIndicator size="large" color="#1FD4AF" />}
      {error && <Text style={styles.warningText}>{error}</Text>}

      {/* Render either subjects or fullsyllabus */}
      {allSelected && selectedSyllabus && (
        <FlatList
          data={
            selectedSyllabus.subjects.length > 0
              ? selectedSyllabus.subjects
              : selectedSyllabus.fullsyllabus
          }
          keyExtractor={(item, index) => item.title || index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => renderCard(item)}
        />
      )}

      <PdfModalView
        isVisible={pdfVisible}
        pdf={{ uri: pdfLink }}
        onClose={() => setPdfVisible(false)}
      />
    </View>
  );
};

export default SyllabusTab;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#FFF" },
  tripleRow: { flexDirection: "row", justifyContent: "space-between" },
  singleRow: { flexDirection: "row", marginVertical: 10 },
  dropdownContainer: { flex: 1, marginHorizontal: 5 },
  label: { fontSize: 15, fontWeight: "500", marginBottom: 10, color: "#333" },
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
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 2,
  },
  cardContent: { padding: 5, flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#222" },
  cardDate: { fontSize: 14, color: "#555", marginTop: 4 },
});
