
  import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Text, Button, IconButton, Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppHeader from "../component/header";

const FIR = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const [firList, setFirList] = useState([
    { 
      id: "FIR-2024-001", 
      firName: "Site Safety Check", 
      equipment: "Excavator CAT-320", 
      date: "2024-05-12", 
      status: "Open" 
    },
    { 
      id: "FIR-2024-002", 
      firName: "Monthly Drill Inspection", 
      equipment: "Drilling Rig X1", 
      date: "2024-05-10", 
      status: "Closed" 
    },
  ]);

  // Handle dynamic data from Add FIR screen
  useEffect(() => {
    if (route.params?.newFIR) {
      const newEntry = {
        ...route.params.newFIR,
        id: `FIR-${new Date().getFullYear()}-00${firList.length + 1}`,
        status: "Open"
      };
      setFirList((prev) => [newEntry, ...prev]);
      navigation.setParams({ newFIR: undefined });
    }
  }, [route.params?.newFIR]);

  const renderItem = ({ item }: any) => (
    <View style={styles.listCard}>
      <View style={styles.rowCenter}>
        <Text style={styles.idLabel}>{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Open' ? '#E6F4EA' : '#F1F1F1' }]}>
           <Text style={[styles.statusText, { color: item.status === 'Open' ? '#0A9D8E' : '#666' }]}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.firName}>{item.firName}</Text>
      <View style={styles.infoRow}>
         <MaterialCommunityIcons name="crane" size={14} color="#888" />
         <Text style={styles.infoText}>{item.equipment}</Text>
         <MaterialCommunityIcons name="calendar-range" size={14} color="#888" style={{marginLeft: 15}} />
         <Text style={styles.infoText}>{item.date}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.actionIcons}>
          <IconButton icon="eye-outline" size={18} iconColor="#666" style={styles.miniIcon} />
          <IconButton icon="pencil-outline" size={18} iconColor="#666" style={styles.miniIcon} />
        </View>
        <Button mode="text" labelStyle={styles.viewDetails} onPress={() => {}}>View Full Report</Button>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <AppHeader title="FIR Reports" subtitle="Hello, Admin" showNotification />
      
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>Field Reports</Text>
          <Button 
            mode="contained" 
            icon="plus" 
            onPress={() => navigation.navigate("AddFIR")} 
            style={styles.addBtn}
          >
            Add FIR
          </Button>
        </View>

        <Searchbar
          placeholder="Search by FIR name or ID..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
          inputStyle={styles.searchInnerInput}
        />

        <FlatList
          data={firList.filter(f => f.firName.toLowerCase().includes(searchQuery.toLowerCase()))}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  headerBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1A1C1E' },
  addBtn: { borderRadius: 8, backgroundColor: '#0A9D8E' },
  searchBar: { marginBottom: 20, backgroundColor: "#F2F4F7", borderRadius: 10, height: 45 },
  searchInnerInput: { fontSize: 14, minHeight: 0, alignSelf: 'center' },
  listCard: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  rowCenter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  idLabel: { fontSize: 12, fontWeight: '700', color: '#0A9D8E' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  statusText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  firName: { fontSize: 17, fontWeight: '700', color: '#1A1C1E' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  infoText: { fontSize: 13, color: '#777', marginLeft: 5 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  actionIcons: { flexDirection: 'row' },
  miniIcon: { margin: 0, padding: 0 },
  viewDetails: { fontSize: 12, fontWeight: '700', color: '#0A9D8E' }
});

export default FIR;