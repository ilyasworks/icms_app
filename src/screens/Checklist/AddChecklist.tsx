import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { Text, TextInput, Button, Menu, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const checklistTypes = ["Equipment Checklist", "FIR Checklist", "Safety Audit"];
const equipmentOptions = ["Hydraulic Lift", "Pressure Vessel", "Crane Type A"];

const AddChecklist = () => {
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [equipment, setEquipment] = useState("");

  const [typeMenu, setTypeMenu] = useState(false);
  const [equipmentMenu, setEquipmentMenu] = useState(false);

  const saveChecklist = () => {
    if (!name || !type || !equipment) return;
    navigation.navigate("Checklist", {
      newChecklist: { name, type, equipment },
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text variant="headlineSmall" style={styles.formTitle}>New Checklist</Text>
        {/* <Text variant="bodyMedium" style={styles.formSubtitle}>Define the parameters for this checklist.</Text> */}
        <Divider style={styles.divider} />

        <FormField label="Checklist Name *">
          <TextInput
            mode="outlined"
            placeholder="e.g. Monthly Maintenance"
            value={name}
            onChangeText={setName}
            outlineStyle={styles.outline}
          />
        </FormField>

        {/* Select Type Menu */}
        <FormField label="Select Type *">
          <Menu
            visible={typeMenu}
            onDismiss={() => setTypeMenu(false)}
            anchor={
              <Pressable onPress={() => setTypeMenu(true)}>
                <TextInput
                  mode="outlined"
                  placeholder="Select type"
                  value={type}
                  editable={false}
                  pointerEvents="none"
                  right={<TextInput.Icon icon="chevron-down" />}
                  outlineStyle={styles.outline}
                />
              </Pressable>
            }
          >
            {checklistTypes.map((item) => (
              <Menu.Item key={item} title={item} onPress={() => { setType(item); setTypeMenu(false); }} />
            ))}
          </Menu>
        </FormField>

        {/* Select Equipment Menu */}
        <FormField label="Select Equipment *">
          <Menu
            visible={equipmentMenu}
            onDismiss={() => setEquipmentMenu(false)}
            anchor={
              <Pressable onPress={() => setEquipmentMenu(true)}>
                <TextInput
                  mode="outlined"
                  placeholder="Select equipment"
                  value={equipment}
                  editable={false}
                  pointerEvents="none"
                  right={<TextInput.Icon icon="chevron-down" />}
                  outlineStyle={styles.outline}
                />
              </Pressable>
            }
          >
            {equipmentOptions.map((item) => (
              <Menu.Item key={item} title={item} onPress={() => { setEquipment(item); setEquipmentMenu(false); }} />
            ))}
          </Menu>
        </FormField>

        <View style={styles.buttonRow}>
          <Button 
            mode="contained" 
            onPress={() => navigation.goBack()} 
            style={[styles.btn, styles.cancelBtn]} 
            textColor="#666"
          >
            Cancel
          </Button>
          <Button 
            mode="contained" 
            onPress={saveChecklist} 
            style={[styles.btn, styles.saveBtn]}
            disabled={!name || !type || !equipment}
          >
            Save Checklist
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Internal Helper for consistent spacing
const FormField = ({ label, children }: any) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: { padding: 24 },
  formTitle: { fontWeight: 'bold', color: '#1A1C1E', paddingTop: 14 },
  formSubtitle: { color: '#666', marginTop: 4, fontSize: 13 },
  divider: { marginVertical: 20, height: 1 },
  fieldContainer: { marginBottom: 16 },
  label: { fontWeight: "700", marginBottom: 8, fontSize: 13, color: '#444' },
  outline: { borderRadius: 8 },
  buttonRow: { flexDirection: "row", marginTop: 30, gap: 12 },
  btn: { flex: 1, borderRadius: 8 },
  saveBtn: { backgroundColor: "#0A9D8E" },
  cancelBtn: { backgroundColor: "#F1F1F1" },
});

export default AddChecklist;