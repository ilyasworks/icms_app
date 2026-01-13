import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Text, Searchbar, Button, IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppHeader from "../../component/header";

const Checklist = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const [checklists, setChecklists] = useState<any[]>([
    { id: "1", name: "Annual Inspection", type: "Scheduled", equipment: "Hydraulic Lift" },
    { id: "2", name: "Safety Check", type: "Pre-Use", equipment: "Pressure Vessel" },
  ]);

  useEffect(() => {
    if (route.params?.newChecklist) {
      setChecklists((prev) => [
        { id: Date.now().toString(), ...route.params.newChecklist },
        ...prev,
      ]);
    }
  }, [route.params?.newChecklist]);

  const renderItem = ({ item }: any) => (
    <View style={styles.listCard}>
      {/* Top Section */}
      <View style={styles.rowCenter}>
        <Text style={styles.typeLabel}>{item.type}</Text>
        <View style={styles.statusDot} />
      </View>

      <Text style={styles.checklistName}>{item.name}</Text>
      
      <View style={styles.equipmentContainer}>
         <Text style={styles.equipmentLabel}>Equipment: </Text>
         <Text style={styles.equipmentValue}>{item.equipment}</Text>
      </View>

      {/* Bottom Section: Footer with Icons */}
      <View style={styles.footerRow}>
        <View style={styles.idBadge}>
          <MaterialCommunityIcons name="clipboard-text-outline" size={14} color="#888" />
          <Text style={styles.idText}>ID: {item.id.slice(-4)}</Text>
        </View>

        <View style={styles.actionIcons}>
          <IconButton icon="eye-outline" size={18} style={styles.miniIcon} iconColor="#666" onPress={() => {}} />
          <IconButton icon="pencil-outline" size={18} style={styles.miniIcon} iconColor="#666" onPress={() => {}} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <AppHeader title="Check list" subtitle="Hello, Admin" showBack showNotification />

      <View style={styles.container}>
        {/* Top Header Bar */}
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>Checklists</Text>
          <Button
            mode="contained"
            icon="plus"
            onPress={() => navigation.navigate("AddChecklist")}
            style={styles.addBtn}
            contentStyle={{ height: 36 }}
            labelStyle={{ fontSize: 12, fontWeight: 'bold' }}
          >
            Add New
          </Button>
        </View>

        <Searchbar
          placeholder="Search checklists..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
          inputStyle={styles.searchInnerInput}
          iconColor="#888"
        />

        <FlatList
          data={checklists.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))}
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
  headerBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#1A1C1E' },
  addBtn: { borderRadius: 6, backgroundColor: '#0A9D8E' },
  searchBar: { marginBottom: 20, backgroundColor: "#F2F4F7", borderRadius: 8, height: 40 },
  searchInnerInput: { fontSize: 14, minHeight: 0, paddingVertical: 0, alignSelf: 'center' },
  listCard: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  rowCenter: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#0A9D8E', marginLeft: 6 },
  typeLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: '#666' },
  checklistName: { fontSize: 17, fontWeight: '700', color: '#1A1C1E', marginVertical: 2 },
  equipmentContainer: { flexDirection: 'row', marginTop: 2 },
  equipmentLabel: { fontSize: 13, color: '#999' },
  equipmentValue: { fontSize: 13, color: '#444', fontWeight: '500' },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  idBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  idText: { marginLeft: 6, fontSize: 11, color: '#666' },
  actionIcons: { flexDirection: 'row' },
  miniIcon: { margin: 0, padding: 0, width: 30, height: 30 },
});

export default Checklist;