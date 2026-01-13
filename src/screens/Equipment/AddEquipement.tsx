import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Text, TextInput, Button, Divider } from "react-native-paper";

const AddEquipmentScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!name.trim()) return;
    navigation.navigate("Equipment", {
      newEquipment: { name, category, description },
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : undefined} 
      style={{ flex: 1, backgroundColor: '#FFF' }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text variant="headlineSmall" style={styles.formTitle}>New Equipment</Text>
        {/* <Text variant="bodyMedium" style={styles.formSubtitle}>Register a new asset to the inventory.</Text> */}
        <Divider style={styles.divider} />

        <FormField label="Equipment Name *">
          <TextInput
            mode="outlined"
            placeholder="e.g. Caterpillar Excavator"
            value={name}
            onChangeText={setName}
            outlineStyle={styles.outline}
            activeOutlineColor="#0A9D8E"
          />
        </FormField>

        <FormField label="Category *">
          <TextInput
            mode="outlined"
            placeholder="e.g. Heavy Machinery"
            value={category}
            onChangeText={setCategory}
            outlineStyle={styles.outline}
            activeOutlineColor="#0A9D8E"
            right={<TextInput.Icon icon="chevron-down" />}
          />
        </FormField>

        <FormField label="Detailed Description">
          <TextInput
            mode="outlined"
            placeholder="Condition, history, etc."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            outlineStyle={styles.outline}
            activeOutlineColor="#0A9D8E"
            style={styles.textArea}
          />
        </FormField>

        <View style={styles.buttonRow}>
          <Button 
            mode="contained" 
            onPress={() => navigation.goBack()} 
            style={[styles.btn, styles.cancelBtn]} 
            textColor="#666"
          >
            Discard
          </Button>
          <Button 
            mode="contained" 
            onPress={handleSave} 
            style={[styles.btn, styles.saveBtn]}
            disabled={!name}
          >
            Create
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const FormField = ({ label, children }: any) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: { padding: 24 },
  formTitle: { fontWeight: 'bold', color: '#1A1C1E', marginTop: 14 },
  formSubtitle: { color: '#666', marginTop: 4, fontSize: 13 },
  divider: { marginVertical: 20, height: 1 },
  fieldContainer: { marginBottom: 16 },
  label: { fontWeight: "700", marginBottom: 8, fontSize: 13, color: '#444' },
  outline: { borderRadius: 10 },
  textArea: { backgroundColor: "#FAFAFA" },
  buttonRow: { flexDirection: "row", marginTop: 30, gap: 12 },
  btn: { flex: 1, borderRadius: 10, height: 48, justifyContent: 'center' },
  saveBtn: { backgroundColor: "#0A9D8E" },
  cancelBtn: { backgroundColor: "#F1F1F1" },
});

export default AddEquipmentScreen;