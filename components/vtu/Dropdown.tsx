import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export type OptionItem = {
  value: string;
  label: string;
};

interface DropDownProps {
  data: OptionItem[];
  onChange: (item: OptionItem) => void;
  placeholder: string;
}

const Dropdown: React.FC<DropDownProps> = ({ data, onChange, placeholder }) => {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState("");
  const buttonRef = useRef<View>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const screenWidth = Dimensions.get("window").width;

  const toggleExpanded = useCallback(() => {
    if (!expanded) {
      buttonRef.current?.measureInWindow((x, y, width, height) => {
        let adjustedLeft = x;
        const dropdownWidth = width * 1.1; // Slightly wider than the button
        
        // Ensure dropdown does not overflow the right side
        if (x + dropdownWidth > screenWidth) {
          adjustedLeft = screenWidth - dropdownWidth - 10;
        }

        setDropdownPosition({
          top: y + height + 5,
          left: adjustedLeft,
          width: dropdownWidth,
        });
      });
    }
    setExpanded(!expanded);
  }, [expanded]);

  const onSelect = useCallback(
    (item: OptionItem) => {
      onChange(item);
      setValue(item.label);
      setExpanded(false);
    },
    [onChange]
  );

  return (
    <View ref={buttonRef}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text style={styles.text}>{value || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} size={16} color="#333" />
      </TouchableOpacity>

      {expanded && (
        <Modal visible={expanded} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View
                style={[styles.options, {
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                }]}
              >
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  button: {
    height: 45,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  options: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    maxHeight: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  optionItem: {
    height: 45,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
});

export default Dropdown;