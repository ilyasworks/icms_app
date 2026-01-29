import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Text, Surface, Divider, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import AppHeader from "../../component/header";

const CertificateDetail = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  
  // Get the certificate data passed from the list
  const { certificate } = route.params || {};

  const isPublished = certificate?.status?.toLowerCase() === 'published';

  // Helper component for detail rows
  const DetailRow = ({ icon, label, value }: any) => (
    <View style={styles.infoRow}>
      <View style={styles.labelGroup}>
        <MaterialCommunityIcons name={icon} size={20} color="#0A9D8E" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value || "N/A"}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <AppHeader title="Certificate Info" showBack showNotification />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Top Status Card */}
        <View style={styles.headerSection}>
           <View style={[styles.statusBadge, { backgroundColor: isPublished ? '#E6F4EA' : '#FDE7E9' }]}>
             <MaterialCommunityIcons 
                name={isPublished ? "check-decagram" : "alert-circle-outline"} 
                size={16} 
                color={isPublished ? '#0A9D8E' : '#D32F2F'} 
             />
             <Text style={[styles.statusBadgeText, { color: isPublished ? '#0A9D8E' : '#D32F2F' }]}>
                {certificate?.status}
             </Text>
           </View>
           <Text style={styles.equipmentTitle}>{certificate?.equipment}</Text>
           <Text style={styles.crSubText}>Certificate No: {certificate?.code}</Text>
        </View>

        {/* Identification Details */}
        <Surface style={styles.detailCard} elevation={1}>
          <Text style={styles.cardHeader}>Identification</Text>
          <Divider style={styles.cardDivider} />
          
          <DetailRow icon="identifier" label="CR Number" value={certificate?.code} />
          <DetailRow icon="sticker-text-outline" label="Sticker Number" value={certificate?.sticker} />
          <DetailRow icon="crane" label="Equipment Type" value={certificate?.equipment} />
        </Surface>

        {/* Validity & Dates */}
        <Surface style={styles.detailCard} elevation={1}>
          <Text style={styles.cardHeader}>Validity Details</Text>
          <Divider style={styles.cardDivider} />
          
          <DetailRow icon="calendar-check" label="Issue Date" value={certificate?.startDate} />
          <DetailRow icon="calendar-remove" label="Expiry Date" value={certificate?.endDate} />
          <DetailRow icon="clock-outline" label="Duration" value="1 Year" />
        </Surface>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button 
            mode="contained" 
            icon="file-pdf-box" 
            onPress={() => {}} 
            style={[styles.btn, { backgroundColor: '#0A9D8E' }]}
          >
            Download Certificate
          </Button>
          
          <Button 
            mode="outlined" 
            icon="share-variant" 
            onPress={() => {}} 
            style={styles.btn}
            textColor="#555"
          >
            Share Details
          </Button>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { padding: 20 },
  headerSection: { alignItems: 'center', marginBottom: 25 },
  statusBadge: { 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, 
    paddingVertical: 6, borderRadius: 20, gap: 6, marginBottom: 12 
  },
  statusBadgeText: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  equipmentTitle: { fontSize: 24, fontWeight: '800', color: '#1A1C1E', textAlign: 'center' },
  crSubText: { fontSize: 14, color: '#666', marginTop: 4 },
  
  detailCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 18, marginBottom: 20 },
  cardHeader: { fontSize: 15, fontWeight: '800', color: '#0A9D8E', marginBottom: 10 },
  cardDivider: { marginBottom: 15, height: 1, backgroundColor: '#F0F0F0' },
  
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  labelGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoLabel: { fontSize: 14, color: '#777', fontWeight: '500' },
  infoValue: { fontSize: 14, fontWeight: '700', color: '#1A1C1E' },
  
  actionContainer: { gap: 12, marginTop: 10 },
  btn: { borderRadius: 10, paddingVertical: 4 }
});

export default CertificateDetail;