import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { Text, Button, TextInput, Divider } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../../component/header"; // Ensure correct path

export default function UserProfileScreen() {
  const [user, setUser] = useState({
    name: "Muhammad Ilyas",
    email: "ilyas@example.com",
    dob: "1999-01-01",
    phone: "+92-3485045494",
    bio: "Computer teacher and tech enthusiast.",
  });

  const [form, setForm] = useState(user);
  const [editVisible, setEditVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    setUser(form);
    setEditVisible(false);
  };

  const onChangeDOB = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, dob: selectedDate.toISOString().split("T")[0] });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <AppHeader title="Check list" subtitle="Hello, Admin" showBack showNotification />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarRing}>
              <Image
                source={require("../../assets/boy.png")}
                style={styles.avatar}
              />
            </View>
            <TouchableOpacity style={styles.badgeEdit}>
              <MaterialCommunityIcons name="camera" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* Info Section */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionHeading}>Personal Information</Text>
          
          <InfoRow label="Phone" value={user.phone} icon="phone-outline" />
          <InfoRow label="Birthday" value={user.dob} icon="calendar-outline" />
          <InfoRow label="Bio" value={user.bio} icon="information-outline" />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionArea}>
          <Button
            mode="contained"
            icon="account-edit-outline"
            onPress={() => { setForm(user); setEditVisible(true); }}
            style={styles.primaryBtn}
            contentStyle={styles.btnContent}
          >
            Edit Profile
          </Button>

          <Button
            mode="outlined"
            icon="logout"
            onPress={() => {}}
            style={styles.secondaryBtn}
            contentStyle={styles.btnContent}
            textColor="#D32F2F"
          >
            Logout
          </Button>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Profile</Text>
              <IconButton icon="close" onPress={() => setEditVisible(false)} />
            </View>
            <Divider style={{ marginBottom: 20 }} />

            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput label="Full Name" value={form.name} onChangeText={(t) => setForm({...form, name: t})} mode="outlined" style={styles.input} outlineStyle={styles.outline} />
              
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput label="Date of Birth" value={form.dob} editable={false} mode="outlined" right={<TextInput.Icon icon="calendar" />} style={styles.input} outlineStyle={styles.outline} />
              </TouchableOpacity>

              <TextInput label="Phone" value={form.phone} onChangeText={(t) => setForm({...form, phone: t})} mode="outlined" style={styles.input} outlineStyle={styles.outline} />
              
              <TextInput label="Bio" value={form.bio} multiline numberOfLines={3} onChangeText={(t) => setForm({...form, bio: t})} mode="outlined" style={styles.input} outlineStyle={styles.outline} />

              <View style={styles.modalFooter}>
                 <Button mode="contained" onPress={handleSave} style={styles.saveBtn}>Save Changes</Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {showDatePicker && (
        <DateTimePicker value={new Date(form.dob)} mode="date" onChange={onChangeDOB} />
      )}
    </SafeAreaView>
  );
}

// Small Component for Rows
const InfoRow = ({ label, value, icon }: any) => (
  <View style={styles.infoRow}>
    <View style={styles.iconBackground}>
      <MaterialCommunityIcons name={icon} size={20} color="#0A9D8E" />
    </View>
    <View style={styles.textData}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  </View>
);

const IconButton = ({ icon, onPress }: any) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialCommunityIcons name={icon} size={24} color="#666" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 40 },
  headerSection: { alignItems: "center", paddingVertical: 30 },
  avatarWrapper: { position: "relative" },
  avatarRing: {
    padding: 4,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "#0A9D8E",
  },
  avatar: { width: 110, height: 110, borderRadius: 55 },
  badgeEdit: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#0A9D8E",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  userName: { fontSize: 22, fontWeight: "800", color: "#1A1C1E", marginTop: 15 },
  userEmail: { fontSize: 14, color: "#666", marginTop: 2 },
  infoBox: { paddingHorizontal: 20, marginTop: 10 },
  sectionHeading: { fontSize: 16, fontWeight: "700", color: "#1A1C1E", marginBottom: 15 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  iconBackground: { width: 40, height: 40, borderRadius: 10, backgroundColor: "#E6F5F4", justifyContent: "center", alignItems: "center" },
  textData: { marginLeft: 15 },
  rowLabel: { fontSize: 12, color: "#999", fontWeight: "600" },
  rowValue: { fontSize: 15, color: "#333", fontWeight: "500", marginTop: 2 },
  actionArea: { paddingHorizontal: 20, marginTop: 20 },
  primaryBtn: { borderRadius: 12, backgroundColor: "#0A9D8E", marginBottom: 12 },
  secondaryBtn: { borderRadius: 12, borderColor: "#D32F2F" },
  btnContent: { height: 50 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 20 },
  modalContent: { backgroundColor: "#FFF", borderRadius: 20, padding: 20, maxHeight: "80%" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: "800", color: "#1A1C1E" },
  input: { marginBottom: 12, backgroundColor: "#FFF" },
  outline: { borderRadius: 10 },
  modalFooter: { marginTop: 10 },
  saveBtn: { borderRadius: 10, backgroundColor: "#0A9D8E", height: 48, justifyContent: 'center' }
});