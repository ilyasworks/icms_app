import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, Platform, Alert } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function EditUserScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const user = route.params?.user;

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    dob: user?.dob || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "https://via.placeholder.com/120x120.png?text=User",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  // 📸 Handle Profile Image Upload
  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Denied", "Please allow access to gallery to upload image.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setForm({ ...form, avatar: selectedUri });
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      setForm({ ...form, dob: formattedDate });
    }
  };

  const saveChanges = () => {
    navigation.navigate("UserProfileScreen", { updatedUser: form });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: form.avatar }} style={styles.avatar} />
          {/* <Button
            mode="outlined"
            onPress={handleImagePick}
            style={styles.uploadButton}
            textColor="#0084D1"
          >
            Upload Profile Picture
          </Button> */}
          <Text style={styles.name}>{form.name || "User Name"}</Text>
        </View>

        {/* Input Fields */}
        <TextInput
          label="Full Name"
          value={form.name}
          onChangeText={(t) => setForm({ ...form, name: t })}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Email"
          value={form.email}
          editable={false}
          style={[styles.input, styles.disabledInput]}
          mode="outlined"
        />

        <TextInput
          label="Date of Birth"
          value={form.dob}
          onFocus={() => setShowDatePicker(true)}
          right={
            <TextInput.Icon
              icon="calendar"
              onPress={() => setShowDatePicker(true)}
            />
          }
          style={styles.input}
          mode="outlined"
        />

        {showDatePicker && (
          <DateTimePicker
            value={form.dob ? new Date(form.dob) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        <TextInput
          label="Phone"
          value={form.phone}
          onChangeText={(t) => setForm({ ...form, phone: t })}
          keyboardType="phone-pad"
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Bio"
          value={form.bio}
          multiline
          onChangeText={(t) => setForm({ ...form, bio: t })}
          style={styles.input}
          mode="outlined"
        />

        <Button
          mode="contained"
          onPress={saveChanges}
          style={styles.saveButton}
          buttonColor="#0084D1"
        >
          Save Changes
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  scroll: { padding: 16 },
  profileSection: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  uploadButton: {
    borderColor: "#0084D1",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  input: {
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  disabledInput: { opacity: 0.6 },
  saveButton: { marginTop: 20, borderRadius: 10 },
});
