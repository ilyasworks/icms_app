import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from '../../component/header';

const VerifyScreen = () => {
  const [certificateNumber, setCertificateNumber] = useState('');

  const examples = [
    { id: 'CR-2026-001', label: 'Valid certificate' },
    { id: 'CR-2025-089', label: 'Valid certificate' },
    { id: 'CR-9999-999', label: 'Invalid certificate' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <AppHeader
        title="Check list"
        subtitle="Hello, Admin"
        showBack 
        showNotification={true}
      />
      
      <View style={styles.container}>
        {/* Consistent Title Style */}
        <View style={styles.headerBar}>
           <Text style={styles.headerTitle}>Verify Certificate</Text>
        </View>

        {/* Search Input Section */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Certificate Number / CR No</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter certificate number"
              placeholderTextColor="#999"
              value={certificateNumber}
              onChangeText={setCertificateNumber}
            />
            <TouchableOpacity style={styles.searchIconButton}>
              <Ionicons name={'search'} size={22} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* QR Scan Button - Brand Color */}
        <TouchableOpacity style={styles.qrButton}>
          <MaterialCommunityIcons name={'qrcode-scan'} size={22} color={'white'} style={{ marginRight: 12 }} />
          <Text style={styles.qrButtonText}>Scan QR Code</Text>
        </TouchableOpacity>

        {/* Examples Section - Consistent with "Badges" style */}
        <View style={styles.examplesBox}>
          <Text style={styles.examplesTitle}>Try these examples:</Text>
          {examples.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.exampleItem}
              onPress={() => setCertificateNumber(item.id)}
            >
              <MaterialCommunityIcons name="arrow-right-circle-outline" size={16} color="#0A9D8E" />
              <Text style={styles.exampleLink}> {item.id} </Text>
              <Text style={styles.exampleLabel}>({item.label})</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerBar: {
    paddingVertical: 15,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1C1E',
  },
  inputCard: {
    paddingVertical: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
    color: '#444',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#F2F4F7',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333',
  },
  searchIconButton: {
    width: 50,
    height: 48,
    backgroundColor: '#0A9D8E', // Matches Add New button
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEE',
  },
  orText: {
    marginHorizontal: 15,
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  qrButton: {
    flexDirection: 'row',
    backgroundColor: '#1A1C1E', // Dark style for high contrast secondary action
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  qrButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  examplesBox: {
    backgroundColor: '#F8F9FA', // Soft grey like your date/ID badges
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  examplesTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#444',
    marginBottom: 12,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  exampleLink: {
    color: '#0A9D8E',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  exampleLabel: {
    color: '#777',
    fontSize: 14,
  },
});

export default VerifyScreen;