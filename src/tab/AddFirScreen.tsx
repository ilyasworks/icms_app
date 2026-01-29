import React, { useState } from "react";
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity, 
  Modal, 
  TouchableWithoutFeedback,
  FlatList
} from "react-native";
import { Text, TextInput, Button, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddFIRScreen = ({ navigation }: any) => {
  const [form, setForm] = useState({
    firName: "",
    description: "",
    equipment: "Craveler Axivators",
    status: "Draft",
    date: new Date(),
    time: new Date(),
    inspectedBy: "",
    // Fixed: Added unique keys for all dynamic fields
    contractor: "",
    equipmentNo: "",
    manufacturer: "",
    model: "",
    serialNo: "",
    location: ""
  });

  const [showPicker, setShowPicker] = useState<"none" | "date" | "time">("none");
  const [bottomSheet, setBottomSheet] = useState<{ visible: boolean; type: "equipment" | "status" }>({
    visible: false,
    type: "equipment"
  });

  const equipmentOptions = ["Craveler Axivators", "Test Update 3", "Bulldozer", "Mobile Crane"];
  const statusOptions = ["Pass", "Fail", "Remarks", "Draft"];

  const formatDate = (date: Date) => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSave = () => {
    if (!form.firName) return;
    
    // Package all fields dynamically
    const finalForm = { 
      ...form, 
      date: formatDate(form.date), 
      time: formatTime(form.time),
      id: Math.random().toString(36).substr(2, 9) // Generate a unique ID
    };
    
    navigation.navigate("FIR", { newFIR: finalForm });
  };

  const openSheet = (type: "equipment" | "status") => setBottomSheet({ visible: true, type });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.formTitle}>New Field Inspection</Text>

        {/* Section 1: General Information */}
        <FormSection title="General Information" icon="information-outline">
          <CustomInput label="FIR Name *" value={form.firName} onChangeText={(t: string) => setForm({...form, firName: t})} placeholder="Report Title" />
          <CustomInput label="Description *" value={form.description} onChangeText={(t: string) => setForm({...form, description: t})} placeholder="Description" />
          
          <Text style={styles.label}>Equipment Selection</Text>
          <TouchableOpacity style={styles.selectorButton} onPress={() => openSheet("equipment")}>
            <Text style={styles.dateButtonText}>{form.equipment}</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#0A9D8E" />
          </TouchableOpacity>

          <Text style={styles.label}>Status</Text>
          <TouchableOpacity style={styles.selectorButton} onPress={() => openSheet("status")}>
            <Text style={styles.dateButtonText}>{form.status}</Text>
            <MaterialCommunityIcons name="chevron-down" size={24} color="#0A9D8E" />
          </TouchableOpacity>
        </FormSection>

        {/* Section 2: Inspection Details */}
        <FormSection title="Inspection Details" icon="calendar-clock">
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
               <Text style={styles.label}>Date</Text>
               <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker("date")}>
                 <Text style={styles.dateButtonText}>{formatDate(form.date)}</Text>
                 <MaterialCommunityIcons name="calendar" size={20} color="#0A9D8E" />
               </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
               <Text style={styles.label}>Time</Text>
               <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker("time")}>
                 <Text style={styles.dateButtonText}>{formatTime(form.time)}</Text>
                 <MaterialCommunityIcons name="clock-outline" size={20} color="#0A9D8E" />
               </TouchableOpacity>
            </View>
          </View>

          {showPicker === "date" && (
            <DateTimePicker value={form.date} mode="date" display="default" 
              onChange={(e, d) => { setShowPicker("none"); if (d) setForm({ ...form, date: d }); }} 
            />
          )}

          {showPicker === "time" && (
            <DateTimePicker value={form.time} mode="time" display="default"
              onChange={(e, t) => { setShowPicker("none"); if (t) setForm({ ...form, time: t }); }} 
            />
          )}

          <CustomInput label="Inspected By" value={form.inspectedBy} onChangeText={(t: string) => setForm({...form, inspectedBy: t})} />
          <CustomInput label="Contractor" value={form.contractor} onChangeText={(t: string) => setForm({...form, contractor: t})} />
        </FormSection>

        {/* Section 3: Equipment Details - FIXED MAPPING */}
        <FormSection title="Equipment Details" icon="toolbox-outline">
          <CustomInput label="Equipment No" value={form.equipmentNo} onChangeText={(t: string) => setForm({...form, equipmentNo: t})} />
          <CustomInput label="Manufacturer" value={form.manufacturer} onChangeText={(t: string) => setForm({...form, manufacturer: t})} />
          <CustomInput label="Model" value={form.model} onChangeText={(t: string) => setForm({...form, model: t})} />
          <CustomInput label="Serial No" value={form.serialNo} onChangeText={(t: string) => setForm({...form, serialNo: t})} />
          <CustomInput label="Location" value={form.location} onChangeText={(t: string) => setForm({...form, location: t})} />
        </FormSection>

        <View style={styles.buttonRow}>
          <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.flexBtn} textColor="#666">Close</Button>
          <Button mode="contained" onPress={handleSave} style={[styles.flexBtn, styles.saveBtn]}>Save Changes</Button>
        </View>
        <div style={{height: 50}} />
      </ScrollView>

      {/* BOTTOM SHEET MODAL */}
      <Modal visible={bottomSheet.visible} transparent animationType="slide" onRequestClose={() => setBottomSheet({...bottomSheet, visible: false})}>
        <TouchableWithoutFeedback onPress={() => setBottomSheet({...bottomSheet, visible: false})}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.sheetContainer}>
                <View style={styles.sheetHandle} />
                <Text style={styles.sheetTitle}>Select {bottomSheet.type === "equipment" ? "Equipment" : "Status"}</Text>
                <FlatList
                  data={bottomSheet.type === "equipment" ? equipmentOptions : statusOptions}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={styles.sheetItem} 
                      onPress={() => {
                        setForm({...form, [bottomSheet.type]: item});
                        setBottomSheet({...bottomSheet, visible: false});
                      }}
                    >
                      <Text style={[styles.sheetItemText, form[bottomSheet.type] === item && styles.activeText]}>{item}</Text>
                      {form[bottomSheet.type] === item && <MaterialCommunityIcons name="check" size={20} color="#0A9D8E" />}
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <Divider />}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};

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
  selectorButton: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CCC', borderRadius: 12,
    height: 55, paddingHorizontal: 15, marginBottom: 10
  },
  dateButton: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CCC', borderRadius: 12,
    height: 50, paddingHorizontal: 15,
  },
  dateButtonText: { fontSize: 14, color: '#333', fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheetContainer: { backgroundColor: '#FFF', borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingHorizontal: 20, paddingBottom: 40, maxHeight: '50%' },
  sheetHandle: { width: 40, height: 5, backgroundColor: '#DDD', borderRadius: 3, alignSelf: 'center', marginVertical: 12 },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#111', marginBottom: 20, textAlign: 'center' },
  sheetItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18 },
  sheetItemText: { fontSize: 16, color: '#444' },
  activeText: { color: '#0A9D8E', fontWeight: '700' },
  inputContainer: { marginBottom: 10 },
  bgWhite: { backgroundColor: '#FFF' },
  row: { flexDirection: 'row' },
  buttonRow: { flexDirection: 'row', gap: 12, marginTop: 10 },
  flexBtn: { flex: 1, height: 50, justifyContent: 'center', borderRadius: 12 },
  saveBtn: { backgroundColor: '#0A9D8E' }
});

export default AddFIRScreen;