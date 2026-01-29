import React, { useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Text, IconButton, Searchbar, Button, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../../component/header";

const CertificatesScreen = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const [certificates, setCertificates] = useState([
    { id: '1', code: '7788', status: 'Published', sticker: '787787', equipment: 'WHEEL LOADER', startDate: '01/01/2024', endDate: '01/01/2025' },
    { id: '2', code: '89', status: 'Not Published', sticker: '899', equipment: 'BULLDOZER', startDate: '10/10/2022', endDate: '10/10/2023' },
    { id: '3', code: '102', status: 'Published', sticker: '103', equipment: 'BACKHOE LOADER', startDate: '05/05/2023', endDate: '05/05/2024' },
  ]);

  const addCertificate = (newCert: any) => {
    setCertificates((prev) => [newCert, ...prev]);
  };

  const getStatusStyle = (status: string) => {
    const isPublished = status.toLowerCase() === 'published';
    return {
      bg: isPublished ? '#E6F4EA' : '#FDE7E9',
      text: isPublished ? '#0A9D8E' : '#D32F2F',
      icon: isPublished ? 'check-decagram' : 'alert-circle-outline'
    };
  };

  const renderItem = ({ item }: any) => {
    const status = getStatusStyle(item.status);

    return (
      <Surface style={styles.card} elevation={1}>
        <View style={styles.cardContent}>
          {/* Left Side: Icon based on Equipment */}
          <View style={[styles.iconBox, { backgroundColor: status.bg }]}>
            <MaterialCommunityIcons
              name={item.equipment.includes('LOADER') ? 'truck-cargo-container' : 'excavator'}
              size={26}
              color={status.text}
            />
          </View>

          {/* Center: Info Column */}
          <View style={styles.infoColumn}>
            <View style={styles.rowBetween}>
              <Text style={styles.crNoText}>CR No: {item.code}</Text>
              <View style={[styles.statusPill, { backgroundColor: status.bg }]}>
                <MaterialCommunityIcons name={status.icon as any} size={12} color={status.text} />
                <Text style={[styles.statusText, { color: status.text }]}>{item.status}</Text>
              </View>
            </View>

            <Text style={styles.equipmentName}>{item.equipment}</Text>

            <View style={styles.stickerRow}>
              <Text style={styles.stickerLabel}>Sticker: </Text>
              <Text style={styles.stickerValue}>{item.sticker}</Text>
            </View>

            <View style={styles.dateRow}>
              <MaterialCommunityIcons name="calendar-clock" size={14} color="#888" />
              <Text style={styles.dateText}>{item.startDate} — {item.endDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Action Bar - Consistent with FIR Layout */}
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => navigation.navigate("CertificateDetail", { certificate: item })}
          >
            <MaterialCommunityIcons name="eye-outline" size={18} color="#0A9D8E" />
            <Text style={styles.actionBtnText}>View</Text>
          </TouchableOpacity>

          <View style={styles.verticalDivider} />

          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="pencil-outline" size={18} color="#666" />
            <Text style={[styles.actionBtnText, { color: '#666' }]}>Edit</Text>
          </TouchableOpacity>

          <View style={styles.verticalDivider} />

          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="download-outline" size={18} color="#444" />
            <Text style={[styles.actionBtnText, { color: '#444' }]}>PDF</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <AppHeader title="Certificates" subtitle="Compliance Registry" showNotification />

      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.headerTitle}>Compliance List</Text>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate("AddCertificate", { addCertificate })}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Searchbar
          placeholder="Search CR No or Equipment..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
          inputStyle={styles.searchInnerInput}
        />

        <FlatList
          data={certificates.filter(c =>
            c.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.code.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1A1C1E' },
  fab: {
    backgroundColor: '#0A9D8E',
    width: 40, height: 40, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center', elevation: 2
  },
  searchBar: {
    marginBottom: 20, backgroundColor: "#FFF",
    borderRadius: 12, height: 48, borderWidth: 1, borderColor: '#E0E0E0'
  },
  searchInnerInput: { fontSize: 14 },
  card: {
    backgroundColor: '#FFF', borderRadius: 16, marginBottom: 16, overflow: 'hidden'
  },
  cardContent: { flexDirection: 'row', padding: 16 },
  iconBox: {
    width: 50, height: 50, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center'
  },
  infoColumn: { flex: 1, marginLeft: 15 },
  rowBetween: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 4
  },
  crNoText: { fontSize: 11, fontWeight: '700', color: '#888' },
  statusPill: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, gap: 4
  },
  statusText: { fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
  equipmentName: { fontSize: 16, fontWeight: '800', color: '#1A1C1E', marginBottom: 2 },
  stickerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  stickerLabel: { fontSize: 12, color: '#999' },
  stickerValue: { fontSize: 12, color: '#444', fontWeight: '600' },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dateText: { fontSize: 12, color: '#666' },
  divider: { height: 1, backgroundColor: '#F0F0F0' },
  cardActions: { flexDirection: 'row', height: 48, alignItems: 'center' },
  actionBtn: {
    flex: 1, flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', gap: 6
  },
  actionBtnText: { fontSize: 12, fontWeight: '700', color: '#0A9D8E' },
  verticalDivider: { width: 1, height: '50%', backgroundColor: '#F0F0F0' }
});

export default CertificatesScreen;