import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { Controller, Control } from "react-hook-form";
import { COLORS } from "../../colors";

interface CustomFormInputProps {
  name: string;
  control: Control<any>;
  label: string;
  editable?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  multiline?: boolean;
}

export default function CustomFormInput({
  name,
  control,
  label,
  editable = true,
  keyboardType = "default",
  multiline = false,
}: CustomFormInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={{ marginBottom: 14 }}>
          <TextInput
            label={label}
            value={value}
            onChangeText={onChange}
            editable={editable}
            keyboardType={keyboardType}
            multiline={multiline}
            mode="outlined"
            style={{ backgroundColor: "#fff", borderColor: COLORS.secondary }}
            error={!!error}
          />
          {error && (
            <Text
              style={{
                color: "#DC2626",
                fontSize: 12,
                marginTop: -8,
                marginBottom: 10,
              }}
            >
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
