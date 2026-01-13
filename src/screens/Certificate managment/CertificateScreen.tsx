import React, { useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Text, IconButton, Searchbar, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../../component/header";

const CertificatesScreen = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [certificates, setCertificates] = useState([
    { id: '1', code: 'CERT-9901', status: 'Active', sticker: 'S-2024-X', equipment: 'Hydraulic Lift', startDate: '01/01/2024', endDate: '01/01/2025' },
    { id: '2', code: 'CERT-4402', status: 'Expired', sticker: 'S-2023-Y', equipment: 'Pressure Vessel', startDate: '10/10/2022', endDate: '10/10/2023' },
  ]);

  // Function passed to the Add screen to update this state
  const addCertificate = (newCert: any) => {
    setCertificates((prev) => [newCert, ...prev]);
  };

  const renderItem = ({ item }: any) => {
    const isActive = item.status === "Active";

    return (
      <View style={styles.listCard}>
        <View style={styles.rowCenter}>
          <Text style={styles.codeLabel}>{item.code}</Text>
          <Text style={[styles.statusText, { color: isActive ? "#2E7D32" : "#D32F2F" }]}>
            {item.status}
          </Text>
        </View>
        
        <Text style={styles.equipmentName}>{item.equipment}</Text>
        <Text style={styles.stickerLabel}>Sticker: {item.sticker}</Text>

        <View style={styles.footerRow}>
          <View style={styles.dateContainer}>
            <MaterialCommunityIcons name="calendar-month-outline" size={14} color="#888" />
            <Text style={styles.dateRange}>{item.startDate} — {item.endDate}</Text>
          </View>

          <View style={styles.actionIcons}>
            <IconButton icon="eye-outline" size={18} style={styles.miniIcon} iconColor="#666" />
            <IconButton icon="pencil-outline" size={18} style={styles.miniIcon} iconColor="#666" />
            <IconButton icon="download-outline" size={18} style={styles.miniIcon} iconColor="#666" />
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <AppHeader title="Check list" subtitle="Hello, Admin" showBack showNotification />
      
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>Certificates</Text>
          <Button 
            mode="contained" 
            icon="plus" 
            // FIXED: Key name 'addCertificate' matches lowercase in child screen
            onPress={() => navigation.navigate("AddCertificate", { addCertificate })} 
            style={styles.addBtn}
            contentStyle={{ height: 36 }}
            labelStyle={{ fontSize: 12, fontWeight: 'bold' }}
          >
            Add New
          </Button>
        </View>

        <Searchbar
          placeholder="Search by CR No or Equipment..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
          // FIXED: Centering logic for internal text and icon
          inputStyle={styles.searchInnerInput}
          iconColor="#888"
        />

        <FlatList
          data={certificates.filter(c => 
            c.equipment.toLowerCase().includes(searchQuery.toLowerCase()) || 
            c.code.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  headerBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 15 
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1A1C1E' },
  addBtn: { borderRadius: 6, backgroundColor: '#0A9D8E' },
  searchBar: { 
    marginBottom: 20, 
    backgroundColor: "#F2F4F7", 
    borderRadius: 8,
    height: 40,
  },
  searchInnerInput: {
    fontSize: 14,
    minHeight: 0,
    paddingVertical: 0,
    alignSelf: 'center',
  },
  listCard: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  rowCenter: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 2, 
    justifyContent: 'space-between' 
  },
  statusText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  codeLabel: { fontSize: 13, color: '#666', fontWeight: '500' },
  equipmentName: { fontSize: 16, fontWeight: '700', color: '#1A1C1E' },
  stickerLabel: { fontSize: 13, color: '#999', marginTop: 2 },
  footerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 12 
  },
  dateContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  dateRange: { marginLeft: 6, fontSize: 11, color: '#666' },
  actionIcons: { flexDirection: 'row' },
  miniIcon: { margin: 0, padding: 0, width: 30, height: 30 },
});

export default CertificatesScreen;