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

  const handleValidate = () => {
    console.log("Validating Certificate:", certificateNumber);
    // Add your validation logic here
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <AppHeader
        title="Verify"
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
            {/* <TouchableOpacity style={styles.searchIconButton} onPress={handleValidate}>
              <Ionicons name={'search'} size={22} color={'white'} />
            </TouchableOpacity> */}
          </View>
          
        </View>
        {/* Updated Validate Button */}
        <TouchableOpacity style={styles.validateButton} onPress={handleValidate}>
          <Ionicons name={'search'} size={22} color={'white'}  style={{ marginRight: 12 }} />
          <Text style={styles.validateButtonText}>Validate</Text>
        </TouchableOpacity>
        {/* Examples Section */}
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

        {/* Spacer to push button down */}
        <View style={{ flex: 1 }} />


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    marginBottom: 20,
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
    backgroundColor: '#0A9D8E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  examplesBox: {
    backgroundColor: '#F8F9FA',
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
  validateButton: {
    flexDirection: 'row',
    backgroundColor: '#0A9D8E', // Changed to brand color for primary action
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  validateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default VerifyScreen;