import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { Text, Searchbar, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppHeader from "../../component/header";

const FIR = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const [firList, setFirList] = useState([
    { 
      id: "1", 
      firName: "Bulldozer Fir", 
      description: "FIR For Bulldozer Inspection",
      equipment: "BULLDOZER", 
      checklist: "BULLDOZER",
      date: "13/1/2026", 
      status: "Pass",
      contractor: "ABC Construction"
    },
  ]);

  // Handle incoming data dynamically
  useEffect(() => {
    if (route.params?.newFIR) {
      const newEntry = {
        ...route.params.newFIR, // This captures ALL fields (Manufacturer, Serial No, etc.)
        checklist: route.params.newFIR.equipment,
      };
      setFirList((prev) => [newEntry, ...prev]);
      
      // Clear params to prevent duplicate entries
      navigation.setParams({ newFIR: undefined });
    }
  }, [route.params?.newFIR]);

  const getStatusStyle = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'pass': return { bg: '#E8F5E9', text: '#2E7D32', icon: 'check-circle' };
      case 'fail': return { bg: '#FFEBEE', text: '#C62828', icon: 'close-circle' };
      case 'draft': return { bg: '#FFF3E0', text: '#EF6C00', icon: 'file-edit' };
      default: return { bg: '#F5F5F5', text: '#616161', icon: 'help-circle' };
    }
  };

  const renderItem = ({ item }: any) => {
    const status = getStatusStyle(item.status);

    return (
      <Surface style={styles.card} elevation={1}>
        <View style={styles.cardContent}>
          <View style={[styles.iconBox, { backgroundColor: status.bg }]}>
            <MaterialCommunityIcons 
              name={item.equipment.toUpperCase().includes('CRANE') ? 'crane' : 'excavator'} 
              size={28} 
              color={status.text} 
            />
          </View>

          <View style={styles.infoColumn}>
            <View style={styles.rowBetween}>
              <Text style={styles.idText}>FIR-{item.id.toString().substring(0,3)}</Text>
              <View style={[styles.statusPill, { backgroundColor: status.bg }]}>
                <MaterialCommunityIcons name={status.icon as any} size={12} color={status.text} />
                <Text style={[styles.statusText, { color: status.text }]}>{item.status}</Text>
              </View>
            </View>
            
            <Text style={styles.firName} numberOfLines={1}>{item.firName}</Text>
            
            <View style={styles.metaRow}>
              <MaterialCommunityIcons name="calendar-month" size={14} color="#999" />
              <Text style={styles.metaText}>{item.date}</Text>
              <View style={styles.dot} />
              <Text style={styles.metaText} numberOfLines={1}>{item.equipment}</Text>
            </View>
            
            {/* Displaying Contractor as a sub-detail */}
            {item.contractor ? (
                <Text style={[styles.metaText, {marginLeft: 0, marginTop: 4, fontSize: 11}]}>
                    Contr: {item.contractor}
                </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={styles.actionBtn} 
            onPress={() => navigation.navigate("FirDetails", { firData: item })}
          >
            <MaterialCommunityIcons name="eye-outline" size={18} color="#0A9D8E" />
            <Text style={styles.actionBtnText}>View Report</Text>
          </TouchableOpacity>
          
          <View style={styles.verticalDivider} />
          
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="pencil-outline" size={18} color="#666" />
            <Text style={[styles.actionBtnText, { color: '#666' }]}>Edit</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <AppHeader title="FIR Reports" subtitle="Inspection Management" showNotification />
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.headerTitle}>Recent Reports</Text>
          <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("AddFIR")}>
            <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Searchbar
          placeholder="Search by name..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
        />

        <FlatList
          data={firList.filter(f => f.firName.toLowerCase().includes(searchQuery.toLowerCase()))}
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
  topSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1A1C1E' },
  fab: { backgroundColor: '#0A9D8E', width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  searchBar: { marginBottom: 20, backgroundColor: "#FFF", borderRadius: 12, height: 50, borderWidth: 1, borderColor: '#E0E0E0' },
  card: { backgroundColor: '#FFF', borderRadius: 8, marginBottom: 16, overflow: 'hidden' },
  cardContent: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  iconBox: { width: 55, height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  infoColumn: { flex: 1, marginLeft: 16 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  idText: { fontSize: 12, fontWeight: '700', color: '#999' },
  statusPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 20, gap: 4 },
  statusText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  firName: { fontSize: 16, fontWeight: '700', color: '#1A1C1E', marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaText: { fontSize: 13, color: '#777', marginLeft: 4 },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: '#DDD', marginHorizontal: 8 },
  divider: { height: 1, backgroundColor: '#F0F0F0' },
  cardActions: { flexDirection: 'row', height: 45, alignItems: 'center' },
  actionBtn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  actionBtnText: { fontSize: 13, fontWeight: '700', color: '#0A9D8E' },
  verticalDivider: { width: 1, height: '60%', backgroundColor: '#F0F0F0' }
});

export default FIR;