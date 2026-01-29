import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Text, Divider, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../../component/header";

const FirDetails = ({ route, navigation }: any) => {
  const { firData } = route.params;

  const DetailRow = ({ label, value, icon }: any) => (
    <View style={styles.detailRow}>
      <View style={styles.labelContainer}>
        <MaterialCommunityIcons name={icon} size={18} color="#0A9D8E" />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value || "N/A"}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <AppHeader title="Report Details" showBack />
      
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* Header Section */}
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{firData.firName}</Text>
            <View style={[
              styles.statusBadge, 
              { backgroundColor: firData.status === 'Pass' ? '#E6F4EA' : '#FFEBEE' }
            ]}>
              <Text style={[
                styles.statusText, 
                { color: firData.status === 'Pass' ? '#2E7D32' : '#C62828' }
              ]}>
                {firData.status}
              </Text>
            </View>
          </View>
          
          <Text style={styles.desc}>{firData.description}</Text>
          <Divider style={styles.divider} />

          {/* Inspection Section */}
          <DetailRow label="Equipment" value={firData.equipment} icon="crane" />
          <DetailRow label="Checklist" value={firData.checklist || firData.equipment} icon="clipboard-check-outline" />
          <DetailRow label="Contractor" value={firData.contractor} icon="domain" />
          <DetailRow label="Inspected By" value={firData.inspectedBy} icon="account-outline" />
          <DetailRow label="Date" value={firData.date} icon="calendar" />
          <DetailRow label="Time" value={firData.time} icon="clock-outline" />
          <DetailRow label="Location" value={firData.location} icon="map-marker-outline" />
          
          <Divider style={styles.divider} />
          
          {/* Equipment Specs Section */}
          <Text style={styles.sectionTitle}>Equipment Specs</Text>
          <DetailRow label="Equipment No" value={firData.equipmentNo} icon="identifier" />
          <DetailRow label="Manufacturer" value={firData.manufacturer} icon="factory" />
          <DetailRow label="Model" value={firData.model} icon="tag-outline" />
          <DetailRow label="Serial No" value={firData.serialNo} icon="barcode-scan" />
        </View>

        <View style={styles.footerBtns}>
           <IconButton 
             icon="share-variant" 
             mode="contained" 
             containerColor="#EEE" 
             iconColor="#444" 
             size={24} 
             onPress={() => {}} 
           />
           <IconButton 
             icon="download" 
             mode="contained" 
             containerColor="#0A9D8E" 
             iconColor="#FFF" 
             size={24} 
             onPress={() => {}} 
           />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 16, padding: 20, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: '800', color: '#1A1C1E', flex: 1 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '800' },
  desc: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 15 },
  divider: { marginVertical: 15, height: 1, backgroundColor: '#EEE' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  label: { fontSize: 14, color: '#777', fontWeight: '600' },
  value: { fontSize: 14, color: '#1A1C1E', fontWeight: '700', textAlign: 'right', flex: 1, marginLeft: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1A1C1E', marginBottom: 15 },
  footerBtns: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginTop: 20 }
});

export default FirDetails;