import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Modal } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditUserScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const user = route.params?.user;

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    gender: user?.gender || '',
    password: user?.password || '',
    bio: user?.bio || '',
    avatar: user?.avatar || 'https://via.placeholder.com/120x120.png?text=User',
  });

  const saveChanges = () => {
    navigation.navigate('UserProfileScreen', { updatedUser: form });
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <Card style={styles.card}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.profileSection}>
              <Image source={{ uri: form.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{form.name || 'User Name'}</Text>
            </View>

            <TextInput
              label="Full Name"
              mode="outlined"
              outlineColor="#ddd"
              activeOutlineColor="#0084D1"
              value={form.name}
              onChangeText={(t) => setForm({ ...form, name: t })}
              style={styles.input}
            />

            <TextInput
              label="Email"
              mode="outlined"
              outlineColor="#ddd"
              activeOutlineColor="#0084D1"
              value={form.email}
              onChangeText={(t) => setForm({ ...form, email: t })}
              keyboardType="email-address"
              style={styles.input}
            />

            <TextInput
              label="Gender"
              mode="outlined"
              outlineColor="#ddd"
              activeOutlineColor="#0084D1"
              value={form.gender}
              onChangeText={(t) => setForm({ ...form, gender: t })}
              style={styles.input}
            />

            <TextInput
              label="Password"
              mode="outlined"
              outlineColor="#ddd"
              activeOutlineColor="#0084D1"
              value={form.password}
              secureTextEntry
              onChangeText={(t) => setForm({ ...form, password: t })}
              style={styles.input}
            />

            <TextInput
              label="Bio"
              mode="outlined"
              outlineColor="#ddd"
              activeOutlineColor="#0084D1"
              value={form.bio}
              multiline
              onChangeText={(t) => setForm({ ...form, bio: t })}
              style={[styles.input, { height: 90 }]}
            />

            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={saveChanges}
                style={styles.saveButton}
                buttonColor="#0084D1"
              >
                Save Changes
              </Button>
              <Button
                mode="outlined"
                textColor="#0084D1"
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
              >
                Cancel
              </Button>
            </View>
          </ScrollView>
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 20,
  },
  card: {
    borderRadius: 16,
    elevation: 5,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  scroll: { paddingHorizontal: 16 },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  input: {
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  saveButton: {
    flex: 1,
    marginRight: 6,
    borderRadius: 8,
  },
  cancelButton: {
    flex: 1,
    marginLeft: 6,
    borderRadius: 8,
    borderColor: '#0084D1',
  },
});
