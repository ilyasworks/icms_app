import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Controller, Control } from "react-hook-form";
import { COLORS } from "../../colors";

interface DropdownOption {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  name: string;
  control: Control<any>;
  label: string;
  options: DropdownOption[];
}

export default function CustomDropdown({
  name,
  control,
  label,
  options,
}: CustomDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const selectedLabel =
          options.find((o) => o.value === value)?.label || "";

        return (
          <View style={{ marginBottom: 14 }}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setOpen(true)}
            >
              <Text>{selectedLabel || "Select..."}</Text>
            </TouchableOpacity>

            <Modal visible={open} transparent animationType="fade">
              <TouchableOpacity
                style={styles.modalOverlay}
                onPress={() => setOpen(false)}
              >
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Select Option</Text>
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                          onChange(item.value);
                          setOpen(false);
                        }}
                      >
                        <Text>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            {error && (
              <Text style={{ color: "#DC2626", fontSize: 12, marginTop: 4 }}>
                {error.message}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    marginBottom: 5,
    marginTop: 6,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "500",
  },
  label: { marginBottom: 4, fontWeight: "600" },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 16,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    maxHeight: 300,
  },
  item: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
});
