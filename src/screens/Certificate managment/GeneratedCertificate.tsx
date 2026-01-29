import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Text, Searchbar, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native"; // Added useRoute
import AppHeader from "../../component/header";

const GeneratedCertificate = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>(); // Access parameters
  const [searchQuery, setSearchQuery] = useState("");
  
  const [generatedList, setGeneratedList] = useState([
    { 
        id: '1', crNo: 'IESRJ235555', stickNo: '474755888', equipment: 'BULLDOZER', 
        approvedBy: 'Saqlain Mushtaq', verifyBy: 'Admin', generatedAt: '26 Jan 2026 11:11 PM', 
        createdBy: 'Fawad Khan', status: 'Published' 
    },
  ]);

  // Dynamic Update Function
  const addGeneratedEntry = (newEntry: any) => {
    setGeneratedList((prev) => [newEntry, ...prev]);
  };

  const renderItem = ({ item }: any) => {
    return (
      <Surface style={styles.card} elevation={1}>
        <View style={styles.cardPadding}>
          <View style={styles.rowBetween}>
            <Text style={styles.crText}>CR No: {item.crNo}</Text>
            <View style={styles.statusToggleContainer}>
                <Text style={styles.publishedLabel}>{item.status}</Text>
                <View style={[styles.toggleSwitch, { alignSelf: item.status === 'Published' ? 'flex-end' : 'flex-start' }]} />
            </View>
          </View>

          <Text style={styles.equipmentName}>{item.equipment}</Text>
          
          <View style={styles.stickerRow}>
            <MaterialCommunityIcons name="tag-outline" size={14} color="#0A9D8E" />
            <Text style={styles.stickerText}>Sticker: {item.stickNo}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rolesGrid}>
            <View style={styles.roleBox}>
              <Text style={styles.roleLabel}>Approved By</Text>
              <Text style={styles.roleValue}>{item.approvedBy}</Text>
            </View>
            <View style={styles.roleBox}>
              <Text style={styles.roleLabel}>Verified By</Text>
              <Text style={styles.roleValue}>{item.verifyBy}</Text>
            </View>
          </View>

          <View style={styles.footerRow}>
             <View style={styles.timestampBox}>
                <MaterialCommunityIcons name="clock-outline" size={12} color="#888" />
                <Text style={styles.timestampText}>{item.generatedAt}</Text>
             </View>
             <Text style={styles.createdByText}>By: {item.createdBy}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.viewAction}
          onPress={() => navigation.navigate("CertificateDetail", { cert: item })}
        >
           <MaterialCommunityIcons name="eye-outline" size={18} color="#0A9D8E" />
           <Text style={styles.viewText}>View Detailed Certificate</Text>
        </TouchableOpacity>
      </Surface>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <AppHeader title="Generated List" subtitle="Finalized Records" showBack showNotification />
      
      <View style={styles.container}>
        {/* ADD BUTTON to trigger dynamic flow */}
        <TouchableOpacity 
           style={styles.addFloatingBtn} 
           onPress={() => navigation.navigate("AddCertificate", { addGeneratedEntry })}
        >
            <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
        </TouchableOpacity>

        <Searchbar
          placeholder="Search..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
        />

        <FlatList
          data={generatedList.filter(i => 
            i.equipment.toLowerCase().includes(searchQuery.toLowerCase()) || 
            i.crNo.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  searchBar: { 
    marginBottom: 15, backgroundColor: "#FFF", borderRadius: 10, 
    borderWidth: 1, borderColor: '#E0E0E0', height: 45 
  },
  card: { backgroundColor: '#FFF', borderRadius: 12, marginBottom: 16, overflow: 'hidden' },
  cardPadding: { padding: 16 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  crText: { fontSize: 11, fontWeight: '700', color: '#888' },
  
  // Custom Switch Look from Web UI
  statusToggleContainer: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1C1E', 
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 15 
  },
  publishedLabel: { color: '#FFF', fontSize: 10, fontWeight: '700', marginRight: 5 },
  toggleSwitch: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#FFF' },

  equipmentName: { fontSize: 18, fontWeight: '800', color: '#1A1C1E' },
  stickerRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  stickerText: { fontSize: 13, color: '#444', fontWeight: '500' },
  
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },
  
  rolesGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  roleBox: { flex: 1 },
  roleLabel: { fontSize: 10, color: '#999', textTransform: 'uppercase', fontWeight: '700' },
  roleValue: { fontSize: 13, color: '#1A1C1E', fontWeight: '600', marginTop: 2 },

  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timestampBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timestampText: { fontSize: 11, color: '#888' },
  createdByText: { fontSize: 11, fontWeight: '700', color: '#0A9D8E' },

  viewAction: { 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
    backgroundColor: '#F1F9F8', paddingVertical: 10, gap: 8, borderTopWidth: 1, borderTopColor: '#E8F2F1'
  },
  viewText: { fontSize: 13, fontWeight: '700', color: '#0A9D8E' },
  addFloatingBtn: {
    position: 'absolute', right: 0, top: -55, // Adjusted to sit near header
    backgroundColor: '#0A9D8E', width: 40, height: 40, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center', zIndex: 10
  },
});

export default GeneratedCertificate;