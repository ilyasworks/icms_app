import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Modal,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text, Card, Button, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEditProfile, useEditUser } from "../../../Services/UserService";
import { storage } from "../../../Store/Storage";
import { COLORS } from "../../../theme/colors";
import { IMAGE_URL } from "../../../Services/AxiosInstances";

export default function UserProfileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [user, setUser] = useState<any>({
    name: "Muhammad Ilyas",
    email: "ilyas@example.com",
    dob: "1999-01-01",
    phone: "+92-3485045494",
    bio: "Computer teacher and tech enthusiast.",
    // avatar: "https://avatar.iran.liara.run/public/boy",
  });

  const { mutateAsync: editUser, isPending } = useEditUser();
  const { mutateAsync: editProfile, isLoading: profileLoading } =
    useEditProfile();
  const [editVisible, setEditVisible] = useState(false);
  const [form, setForm] = useState(user);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const getUserData = async () => {
    const userData = await storage.get("user");
    if (userData) {
      setUser(userData);
      setForm(userData);
    }
  };
console.log(user,"userrrrr");
  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = async () => {
    await storage.clear();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const onChangeDOB = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setForm({ ...form, dob: formattedDate });
    }
  };
  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (result.canceled) return;

      const picked = result.assets[0];

      const formData = new FormData();
      formData.append("profile_image", {
        uri: picked.uri,
        type: "image/jpeg", // important
        name: picked.fileName || `upload_${Date.now()}.jpg`,
      });

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("dob", form.dob);
      formData.append("phone", form.phone);
      formData.append("bio", form.bio);
      formData.append("status", form.status);

      const response = await editProfile(formData);

      if (response?.data) {
        await storage.set("user", response.data);
        setUser(response.data);
        setForm(response.data);
      }
    } catch (err) {}
  };

  // ✅ Pick image from camera or gallery
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Camera roll permissions are needed.");
      return;
    }
    handleImagePick();

  };

  const saveChanges = async () => {
    const payload = {
      name: form.name,
      email: form.email,
      dob: form.dob,
      phone: form.phone,
      bio: form.bio,
      status: form.status,
    };
    try {
      const res = await editUser({ id: user?.id, data: payload });
      if (res?.data) {
        await storage.set("user", res.data);
        setUser(res.data);
        setForm(res.data);
      } else {
        await storage.set("user", form);
        setUser(form);
      }

      // 🔁 Notify UserManagementScreen
      navigation.navigate("UserManagement", { updatedUser: form });
      setEditVisible(false);
    } catch (error) {
      Alert.alert("Error", "Something went wrong while saving changes.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
 

        <View style={styles.profileSectionModal}>
          <View style={styles.profileSectionModal}>
            <View style={styles.avatarContainer}>
              {/* <Image
      source={{ uri: form?.avatar || "https://avatar.iran.liara.run/public/boy" }}
      style={styles.avatarModal}
    /> */}
              {profileLoading ? (
                <View style={styles.avatarModal}></View>
              ) : (
                <Image
                  source={
                    form?.profileImage
                      ? { uri: IMAGE_URL + form.profileImage } // user uploaded photo
                      : require("../../assets/boy.png") // fallback image
                  }
                  style={styles.avatarModal}
                />
              )}
              {/* Edit Icon Button */}

              <TouchableOpacity
                style={styles.editIconContainer}
                onPress={pickImage}
              >
                <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoContainer}>
          <Card style={styles.card}>
            <Card.Title
              title="Personal Information"
              titleStyle={styles.sectionTitle}
            />
            <Card.Content>
              <View style={styles.row}>
                <Text style={styles.label}>DOB:</Text>
                <Text style={styles.value}>{user?.dob}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{user.phone}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Bio:</Text>
                <Text style={styles.value}>{user.bio}</Text>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            icon="account-edit"
            onPress={() => setEditVisible(true)}
            style={styles.editButton}
            labelStyle={styles.buttonLabel}
          >
            Edit Profile
          </Button>

          <Button
            mode="contained"
            icon="logout"
            onPress={handleLogout}
            style={styles.logoutButton}
            labelStyle={styles.buttonLabel}
          >
            Logout
          </Button>
        </View>
      </ScrollView>

      {/* 🔹 Edit Modal */}
      <Modal visible={editVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditVisible(false)}>
                <Text style={{ fontSize: 18, color: "#555" }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              {/* <View style={styles.profileSectionModal}>
                <Image source={{ uri: form.avatar }} style={styles.avatarModal} />
                <Button
                  mode="outlined"
                  onPress={pickImage}
                  style={styles.uploadButton}
                  icon="camera"
                >
                  Upload Profile Picture
                </Button>
              </View> */}

              <TextInput
                label="Full Name"
                value={form.name}
                onChangeText={(t) => setForm({ ...form, name: t })}
                mode="outlined"
                style={styles.input}
              />

              {/* Disabled Email */}
              <TextInput
                label="Email"
                value={form.email}
                mode="outlined"
                // disabled
                editable={false}
                style={[styles.input, { opacity: 0.7 }]}
              />

              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                  label="Date of Birth"
                  value={form.dob}
                  mode="outlined"
                  editable={false}
                  right={<TextInput.Icon icon="calendar" />}
                  style={styles.input}
                />
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date(form.dob || "2000-01-01")}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChangeDOB}
                />
              )}

              <TextInput
                label="Phone"
                value={form.phone}
                onChangeText={(t) => setForm({ ...form, phone: t })}
                mode="outlined"
                keyboardType="phone-pad"
                style={styles.input}
              />

              <TextInput
                label="Bio"
                value={form.bio}
                multiline
                onChangeText={(t) => setForm({ ...form, bio: t })}
                mode="outlined"
                style={[styles.input, { height: 100 }]}
              />

              <Button
                mode="contained"
                onPress={saveChanges}
                style={styles.saveButton}
                buttonColor={COLORS.primary}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  profileSection: {
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "700", color: "#222" },
  email: { fontSize: 14, color: "#555" },
  infoContainer: { paddingHorizontal: 16 },
  card: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
  },
  sectionTitle: { fontWeight: "bold", color: COLORS.secondary },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  label: { fontWeight: "600", color: "#444" },
  value: { color: "#555", flexShrink: 1, textAlign: "right", maxWidth: "60%" },
  buttonContainer: { paddingHorizontal: 16, marginTop: 20 },
  editButton: {
    backgroundColor: COLORS.primary,
    marginBottom: 10,
    borderRadius: 8,
  },
  logoutButton: { backgroundColor: COLORS.secondary, borderRadius: 8 },
  buttonLabel: { fontWeight: "600", color: "#fff" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalContainer: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#1E293B" },
  profileSectionModal: { alignItems: "center", marginBottom: 20 },
  avatarModal: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 58,
    border: "1px solid",
  },
  uploadButton: {
    borderRadius: 8,
    borderColor: COLORS.secondary,
  },
  input: {
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  saveButton: { marginTop: 16, borderRadius: 8 },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editIcon: {
    fontSize: 18,
    color: "#fff",
  },
});