import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import { Text, Button, TextInput, Divider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AddCertificate = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  // FIXED: Destructure using the exact lowercase name passed from the previous screen
  const { addCertificate } = route.params || {};

  const [form, setForm] = useState({
    code: "", sticker: "", equipment: "", checklist: "", template: ""
  });
  const [issueDate, setIssueDate] = useState<Date | null>(null);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<"issue" | "expiry" | null>(null);

  const formatDate = (date?: Date | null) => date ? date.toLocaleDateString("en-GB") : "Select Date";

  const handleSave = () => {
    // Basic Validation
    if (!form.code || !form.sticker || !issueDate || !expiryDate) {
      Alert.alert("Missing Information", "Please fill in CR No, Sticker, and Dates.");
      return;
    }

    const cert = {
      id: Math.random().toString(36).substr(2, 9),
      code: form.code,
      sticker: form.sticker,
      equipment: form.equipment || "General Equipment",
      status: "Active",
      startDate: formatDate(issueDate),
      endDate: formatDate(expiryDate),
    };

    // FIXED: Call function safely and go back
    if (addCertificate) {
      addCertificate(cert);
      navigation.goBack();
    } else {
      Alert.alert("Error", "Could not save. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : undefined} 
      style={{ flex: 1, backgroundColor: '#FFF' }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text variant="headlineSmall" style={styles.formTitle}>New Certificate</Text>
        {/* <Text variant="bodyMedium" style={styles.formSubtitle}>Enter compliance details accurately.</Text> */}
        <Divider style={styles.divider} />

        <FormField label="CR Number *">
          <TextInput mode="outlined" placeholder="Enter CR No" value={form.code} onChangeText={(t) => setForm({...form, code: t})} outlineStyle={styles.outline} />
        </FormField>

        <FormField label="Sticker Number *">
          <TextInput mode="outlined" placeholder="Enter Sticker No" value={form.sticker} onChangeText={(t) => setForm({...form, sticker: t})} outlineStyle={styles.outline} />
        </FormField>

        <FormField label="Equipment">
          <View style={styles.dropdownContainer}>
            <Picker selectedValue={form.equipment} onValueChange={(v) => setForm({...form, equipment: v})}>
              <Picker.Item label="Select equipment" value="" />
              <Picker.Item label="Hydraulic Lift" value="Hydraulic Lift" />
              <Picker.Item label="Pressure Vessel" value="Pressure Vessel" />
            </Picker>
          </View>
        </FormField>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <FormField label="Issue Date">
              <DateButton value={formatDate(issueDate)} onPress={() => setShowPicker("issue")} />
            </FormField>
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <FormField label="Expiry Date">
              <DateButton value={formatDate(expiryDate)} onPress={() => setShowPicker("expiry")} />
            </FormField>
          </View>
        </View>

        {showPicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            onChange={(_, date) => {
              setShowPicker(null);
              if (date) showPicker === "issue" ? setIssueDate(date) : setExpiryDate(date);
            }}
          />
        )}

        <View style={styles.buttonRow}>
          <Button mode="contained" onPress={() => navigation.goBack()} style={[styles.btn, styles.cancelBtn]} textColor="#666">
            Cancel
          </Button>
          <Button mode="contained" onPress={handleSave} style={[styles.btn, styles.saveBtn]}>
            Save
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Internal Helpers
const FormField = ({ label, children }: any) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const DateButton = ({ value, onPress }: any) => (
  <TouchableOpacity style={styles.dateInput} onPress={onPress}>
    <Text style={{ color: value === "Select Date" ? "#999" : "#333", fontSize: 13 }}>{value}</Text>
    <MaterialCommunityIcons name="calendar" size={18} color="#0A9D8E" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  scrollContainer: { padding: 24 },
  formTitle: { fontWeight: 'bold', color: '#1A1C1E', marginTop: 14 },
  formSubtitle: { color: '#666', marginTop: 4, fontSize: 13 },
  divider: { marginVertical: 20, height: 1 },
  fieldContainer: { marginBottom: 16 },
  label: { fontWeight: "700", marginBottom: 8, fontSize: 13, color: '#444' },
  outline: { borderRadius: 8 },
  dropdownContainer: { borderWidth: 1, borderColor: "#CCC", borderRadius: 8, backgroundColor: '#FAFAFA' },
  dateInput: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: "#CCC", borderRadius: 8, padding: 12, backgroundColor: '#FAFAFA' 
  },
  row: { flexDirection: 'row' },
  buttonRow: { flexDirection: 'row', marginTop: 30, gap: 12 },
  btn: { flex: 1, borderRadius: 8 },
  saveBtn: { backgroundColor: "#0A9D8E" },
  cancelBtn: { backgroundColor: "#F1F1F1" },
});

export default AddCertificate;