import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AddFIRScreen = ({ navigation }: any) => {
  const [form, setForm] = useState({
    firName: "",
    description: "",
    equipment: "Craveler Axivators",
    status: "Draft",
    date: "13/01/2026", // Default to current date
    time: "10:30 AM",
    inspectedBy: "",
    contractor: "",
    equipNo: "",
    location: ""
  });

  const handleSave = () => {
    if (!form.firName) return;
    navigation.navigate("FIR", { newFIR: form });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : undefined} 
      style={styles.mainContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.formTitle}>New Field Inspection</Text>
        <Text style={styles.formSubtitle}>Complete the report details below</Text>

        {/* Section 1: General Information */}
        <FormSection title="General Information" icon="information-outline">
          <CustomInput 
            label="FIR Name *" 
            value={form.firName} 
            onChangeText={(t) => setForm({...form, firName: t})} 
            placeholder="Report Title" 
          />
          
          <Text style={styles.label}>Equipment Selection</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.equipment}
              onValueChange={(itemValue) => setForm({...form, equipment: itemValue})}
              style={styles.picker}
            >
              <Picker.Item label="Craveler Axivators" value="Craveler Axivators" />
              <Picker.Item label="Test Update 3" value="Test Update 3" />
            </Picker>
          </View>

          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.status}
              onValueChange={(itemValue) => setForm({...form, status: itemValue})}
              style={styles.picker}
            >
              <Picker.Item label="Pass" value="Pass" />
              <Picker.Item label="Fail" value="Fail" />
              <Picker.Item label="Remarks" value="Remarks" />
              <Picker.Item label="Draft" value="Draft" />
            </Picker>
          </View>
        </FormSection>

        {/* Section 2: Inspection Details */}
        <FormSection title="Inspection Details" icon="calendar-clock">
          <View style={styles.row}>
            <View style={{flex: 1, marginRight: 10}}>
              <CustomInput 
                label="Date of Inspection" 
                value={form.date} 
                onChangeText={(t) => setForm({...form, date: t})}
                placeholder="dd/mm/yyyy"
                rightIcon="calendar"
              />
            </View>
            <View style={{flex: 1}}>
              <CustomInput 
                label="Time" 
                value={form.time} 
                onChangeText={(t) => setForm({...form, time: t})}
                placeholder="--:-- --"
                rightIcon="clock-outline"
              />
            </View>
          </View>
          <CustomInput 
            label="Inspected By" 
            value={form.inspectedBy} 
            onChangeText={(t) => setForm({...form, inspectedBy: t})} 
          />
        </FormSection>

        {/* Section 3: Equipment Details */}
        <FormSection title="Equipment Details" icon="toolbox-outline">
          <CustomInput label="Equipment No" value={form.equipNo} onChangeText={(t) => setForm({...form, equipNo: t})} />
          <CustomInput label="Location" value={form.location} onChangeText={(t) => setForm({...form, location: t})} />
        </FormSection>

        <View style={styles.buttonRow}>
          <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.flexBtn} textColor="#666">Close</Button>
          <Button mode="contained" onPress={handleSave} style={[styles.flexBtn, styles.saveBtn]}>Save Changes</Button>
        </View>
        <View style={{height: 50}} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Internal Components
const FormSection = ({ title, icon, children }: any) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <MaterialCommunityIcons name={icon} size={20} color="#0A9D8E" />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const CustomInput = ({ label, rightIcon, ...props }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput 
      mode="outlined" 
      outlineStyle={{ borderRadius: 12 }} 
      activeOutlineColor="#0A9D8E" 
      style={styles.bgWhite} 
      right={rightIcon ? <TextInput.Icon icon={rightIcon} color="#666" /> : null}
      {...props} 
    />
  </View>
);

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFF' },
  scrollContainer: { padding: 20 },
  formTitle: { fontSize: 24, fontWeight: '800', color: '#1A1C1E' },
  formSubtitle: { fontSize: 14, color: '#666', marginBottom: 25 },
  section: { marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1C1E', marginLeft: 10 },
  label: { fontSize: 13, fontWeight: '700', color: '#444', marginBottom: 8, marginTop: 10 },
  pickerWrapper: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    overflow: 'hidden', // Ensures the picker stays inside the rounded corners
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  inputContainer: { marginBottom: 10 },
  bgWhite: { backgroundColor: '#FFF' },
  row: { flexDirection: 'row' },
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 10 },
  flexBtn: { flex: 1, height: 50, justifyContent: 'center', borderRadius: 12 },
  saveBtn: { backgroundColor: '#0A9D8E' }
});

export default AddFIRScreen;