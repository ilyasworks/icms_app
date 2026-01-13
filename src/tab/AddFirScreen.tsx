import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddFIRScreen = ({ navigation }: any) => {
  const [form, setForm] = useState({
    firName: "",
    description: "",
    equipment: "Craveler Axivators",
    status: "Draft",
    date: new Date(), // Changed to Date object
    time: new Date(), // Changed to Date object
    inspectedBy: "",
    contractor: "",
    equipNo: "",
    location: ""
  });

  const [showPicker, setShowPicker] = useState<"none" | "date" | "time">("none");

  // Helper to format Date object to string
  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Helper to format Time object to string
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSave = () => {
    if (!form.firName) return;
    
    // Convert dates to strings for the FIR List screen
    const finalForm = {
      ...form,
      date: formatDate(form.date),
      time: formatTime(form.time)
    };
    
    navigation.navigate("FIR", { newFIR: finalForm });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : undefined} 
      style={styles.mainContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.formTitle}>New Field Inspection</Text>

        {/* Section 1: General Information */}
        <FormSection title="General Information" icon="information-outline">
          <CustomInput 
            label="FIR Name *" 
            value={form.firName} 
            onChangeText={(t: string) => setForm({...form, firName: t})} 
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
            <View style={{ flex: 1, marginRight: 8 }}>
               <Text style={styles.label}>Date of inspection</Text>
               <TouchableOpacity 
                 style={styles.dateButton} 
                 onPress={() => setShowPicker("date")}
               >
                 <Text style={styles.dateButtonText}>{formatDate(form.date)}</Text>
                 <MaterialCommunityIcons name="calendar" size={20} color="#0A9D8E" />
               </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
               <Text style={styles.label}>Time</Text>
               <TouchableOpacity 
                 style={styles.dateButton} 
                 onPress={() => setShowPicker("time")}
               >
                 <Text style={styles.dateButtonText}>{formatTime(form.time)}</Text>
                 <MaterialCommunityIcons name="clock-outline" size={20} color="#0A9D8E" />
               </TouchableOpacity>
            </View>
          </View>

          {/* Actual DateTimePicker Component */}
          {showPicker === "date" && (
            <DateTimePicker
              value={form.date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker("none");
                if (selectedDate) setForm({ ...form, date: selectedDate });
              }}
            />
          )}

          {showPicker === "time" && (
            <DateTimePicker
              value={form.time}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(event, selectedTime) => {
                setShowPicker("none");
                if (selectedTime) setForm({ ...form, time: selectedTime });
              }}
            />
          )}

          <CustomInput 
            label="Inspected By" 
            value={form.inspectedBy} 
            onChangeText={(t: string) => setForm({...form, inspectedBy: t})} 
          />
        </FormSection>

        {/* Section 3: Equipment Details */}
        <FormSection title="Equipment Details" icon="toolbox-outline">
          <CustomInput label="Equipment No" value={form.equipNo} onChangeText={(t: string) => setForm({...form, equipNo: t})} />
          <CustomInput label="Location" value={form.location} onChangeText={(t: string) => setForm({...form, location: t})} />
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
  formTitle: { fontSize: 24, fontWeight: '800', color: '#1A1C1E', marginTop: 14, marginBottom: 10 },
  section: { marginBottom: 30 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1A1C1E', marginLeft: 10 },
  label: { fontSize: 13, fontWeight: '700', color: '#444', marginBottom: 8, marginTop: 10 },
  pickerWrapper: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
  },
  dateButtonText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: { marginBottom: 10 },
  bgWhite: { backgroundColor: '#FFF' },
  row: { flexDirection: 'row' },
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 10 },
  flexBtn: { flex: 1, height: 50, justifyContent: 'center', borderRadius: 12 },
  saveBtn: { backgroundColor: '#0A9D8E' }
});

export default AddFIRScreen;