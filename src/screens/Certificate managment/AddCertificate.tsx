import React, { useState } from "react";
import { 
  View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, 
  TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, FlatList 
} from "react-native";
import { Text, Button, TextInput, Divider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const AddCertificate = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  // Destructure both possible callbacks (for the standard list or generated list)
  const { addCertificate, addGeneratedEntry } = route.params || {};

  const [form, setForm] = useState({
    cr_no: "",
    sticker_no: "",
    equipment: "Select Equipment",
    checklist: "Select Checklist",
    template: "Select Template",
    fir: "Select FIR",
    approval_by: "Select User",
    verify_by: "Select User",
  });

  const [issueDate, setIssueDate] = useState<Date | null>(null);
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<"issue" | "expiry" | null>(null);

  const [bottomSheet, setBottomSheet] = useState<{ visible: boolean; type: string; data: string[] }>({
    visible: false,
    type: "",
    data: []
  });

  const dataLists: any = {
    equipment: ["WHEEL LOADER", "BULLDOZER", "BACKHOE LOADER", "MOBILE CRANE", "CRAWLER EXCAVATOR"],
    checklist: ["Checklist A", "Checklist B"],
    template: ["Standard Template", "Detailed Template"],
    fir: ["FIR-2024-001", "FIR-2024-002"],
    users: ["Saqlain Mushtaq", "Admin", "Fawad Khan", "Inspector John"]
  };

  const openSheet = (type: string, list: string[]) => {
    setBottomSheet({ visible: true, type, data: list });
  };

  const formatDate = (date?: Date | null) => date ? date.toLocaleDateString("en-GB") : "Select Date";

  const handleSave = () => {
    if (!form.cr_no || !form.sticker_no || form.equipment === "Select Equipment" || !issueDate) {
      Alert.alert("Missing Information", "Please fill CR No, Sticker, Equipment, and Issue Date.");
      return;
    }

    // 1. Create the standard certificate object
    const cert = {
      id: Math.random().toString(36).substr(2, 9),
      code: form.cr_no,
      sticker: form.sticker_no,
      equipment: form.equipment,
      fir: form.fir,
      status: "Published",
      startDate: formatDate(issueDate),
      endDate: formatDate(expiryDate),
    };

    // 2. Create the dynamic entry for GeneratedCertificate.tsx
    const generatedEntry = {
      id: cert.id,
      crNo: form.cr_no,
      stickNo: form.sticker_no,
      equipment: form.equipment,
      approvedBy: form.approval_by === "Select User" ? "Admin" : form.approval_by,
      verifyBy: form.verify_by === "Select User" ? "Admin" : form.verify_by,
      generatedAt: new Date().toLocaleString('en-GB', { 
        day: '2-digit', month: 'short', year: 'numeric', 
        hour: '2-digit', minute: '2-digit', hour12: true 
      }),
      createdBy: "Admin", 
      status: "Published",
    };

    // Callback logic: Update standard list OR generated list depending on which screen opened this
    if (addGeneratedEntry) {
      addGeneratedEntry(generatedEntry);
      navigation.goBack();
    } else if (addCertificate) {
      addCertificate(cert);
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text variant="headlineSmall" style={styles.formTitle}>Add Certificate</Text>
        <Divider style={styles.divider} />

        <View style={styles.row}>
            <View style={{flex: 1, marginRight: 8}}>
                <FormField label="CR No *">
                    <TextInput mode="outlined" placeholder="CR No" value={form.cr_no} onChangeText={(t) => setForm({...form, cr_no: t})} outlineStyle={styles.outline} dense />
                </FormField>
            </View>
            <View style={{flex: 1}}>
                <FormField label="Sticker No *">
                    <TextInput mode="outlined" placeholder="Sticker" value={form.sticker_no} onChangeText={(t) => setForm({...form, sticker_no: t})} outlineStyle={styles.outline} dense />
                </FormField>
            </View>
        </View>

        <FormField label="Select Equipment *">
          <SheetSelector value={form.equipment} onPress={() => openSheet("equipment", dataLists.equipment)} />
        </FormField>

        <FormField label="FIRs *">
          <SheetSelector value={form.fir} onPress={() => openSheet("fir", dataLists.fir)} />
        </FormField>

        <View style={styles.row}>
            <View style={{flex: 1, marginRight: 8}}>
                <FormField label="Approved By *">
                    <SheetSelector value={form.approval_by} onPress={() => openSheet("approval_by", dataLists.users)} />
                </FormField>
            </View>
            <View style={{flex: 1}}>
                <FormField label="Verified By *">
                    <SheetSelector value={form.verify_by} onPress={() => openSheet("verify_by", dataLists.users)} />
                </FormField>
            </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <FormField label="Issue Date *">
              <DateButton value={formatDate(issueDate)} onPress={() => setShowPicker("issue")} />
            </FormField>
          </View>
          <View style={{ flex: 1 }}>
            <FormField label="Expiry Date *">
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
          <Button mode="contained" onPress={() => navigation.goBack()} style={[styles.btn, styles.cancelBtn]} textColor="#666">Close</Button>
          <Button mode="contained" onPress={handleSave} style={[styles.btn, styles.saveBtn]}>Publish Certificate</Button>
        </View>
        <View style={{height: 40}} />
      </ScrollView>

      {/* REUSABLE BOTTOM SHEET */}
      <Modal visible={bottomSheet.visible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setBottomSheet({...bottomSheet, visible: false})}>
          <View style={styles.modalOverlay}>
            <View style={styles.sheetContainer}>
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>Select {bottomSheet.type.replace('_', ' ').toUpperCase()}</Text>
              <FlatList
                data={bottomSheet.data}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.sheetItem} 
                    onPress={() => {
                      setForm({...form, [bottomSheet.type]: item});
                      setBottomSheet({...bottomSheet, visible: false});
                    }}
                  >
                    <Text style={styles.sheetItemText}>{item}</Text>
                    {form[bottomSheet.type as keyof typeof form] === item && <MaterialCommunityIcons name="check" size={20} color="#0A9D8E" />}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};

// ... Rest of your FormField, SheetSelector, DateButton components and styles stay the same ...

// Reusable Internal Components
const FormField = ({ label, children }: any) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {children}
  </View>
);

const SheetSelector = ({ value, onPress }: any) => (
  <TouchableOpacity style={styles.sheetTrigger} onPress={onPress}>
    <Text style={{ color: value.includes("Select") ? "#999" : "#333", fontSize: 13 }}>{value}</Text>
    <MaterialCommunityIcons name="chevron-down" size={20} color="#0A9D8E" />
  </TouchableOpacity>
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
  divider: { marginVertical: 20, height: 1 },
  fieldContainer: { marginBottom: 14 },
  label: { fontWeight: "700", marginBottom: 6, fontSize: 12, color: '#444' },
  outline: { borderRadius: 8 },
  sheetTrigger: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: "#CCC", borderRadius: 8, padding: 12, backgroundColor: '#FAFAFA', height: 48
  },
  dateInput: { 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: "#CCC", borderRadius: 8, padding: 12, backgroundColor: '#FAFAFA' 
  },
  row: { flexDirection: 'row' },
  buttonRow: { flexDirection: 'row', marginTop: 25, gap: 12 },
  btn: { flex: 1, borderRadius: 8, height: 48, justifyContent: 'center' },
  saveBtn: { backgroundColor: "#0A9D8E" },
  cancelBtn: { backgroundColor: "#F1F1F1" },
  
  // Sheet Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheetContainer: { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '60%' },
  sheetHandle: { width: 40, height: 5, backgroundColor: '#DDD', borderRadius: 3, alignSelf: 'center', marginBottom: 15 },
  sheetTitle: { fontSize: 16, fontWeight: '800', marginBottom: 15, textAlign: 'center' },
  sheetItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  sheetItemText: { fontSize: 14, color: '#333' }
});

export default AddCertificate;