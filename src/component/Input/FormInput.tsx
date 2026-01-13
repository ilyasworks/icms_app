import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

export function FormInput({
  control,
  name,
  label,
  icon,
  multiline,
  error,
  type,
}: {
  control: any;
  name: string;
  label: string;
  icon: any;
  multiline?: boolean;
  error?: string;
  type?: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.wrapper}>
          <Text style={styles.label}>{label}</Text>

          <View style={[styles.inputBox, error && styles.inputError]}>
            <Ionicons
              name={icon}
              size={18}
              color={error ? "#E53935" : "#777"}
            />

            <TextInput
              value={value}
              onChangeText={onChange}
              multiline={multiline}
              keyboardType={type ? "numeric" : undefined}
              placeholderTextColor="#999"
              style={[styles.input, multiline && styles.multiline]}
            />
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    marginBottom: 6,
    color: "#444",
    fontWeight: "500",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
    fontSize: 15,
    color: "#000",
  },

  multiline: {
    height: 80,
    textAlignVertical: "top",
  },

  inputError: {
    borderColor: "#E53935",
  },

  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#E53935",
  },
});
