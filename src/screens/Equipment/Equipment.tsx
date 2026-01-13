import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Text, Button, IconButton, Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppHeader from "../../component/header";

const Equipment = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const [equipmentList, setEquipmentList] = useState([
    { id: "1", name: "Caterpillar Excavator", category: "Heavy Machinery", description: "Model 320D, check hydraulic fluid levels.", status: "Active" },
    { id: "2", name: "Portable Generator", category: "Power Tools", description: "5kW diesel generator for site B.", status: "Maintenance" },
  ]);

  const addNewEquipment = useCallback((newItem: any) => {
    setEquipmentList((prev) => [
      { ...newItem, id: Math.random().toString(), status: "Active" },
      ...prev,
    ]);
  }, []);

  useEffect(() => {
    if (route.params?.newEquipment) {
      addNewEquipment(route.params.newEquipment);
      navigation.setParams({ newEquipment: undefined });
    }
  }, [route.params?.newEquipment, navigation, addNewEquipment]);

  const renderItem = ({ item }: any) => (
    <View style={styles.listCard}>
      <View style={styles.rowCenter}>
        <Text style={styles.categoryLabel}>{item.category}</Text>
        <Text style={[styles.statusText, { color: item.status === "Active" ? "#2E7D32" : "#E65100" }]}>
          {item.status}
        </Text>
      </View>

      <Text style={styles.equipmentName}>{item.name}</Text>
      <Text style={styles.descriptionText} numberOfLines={2}>{item.description}</Text>

      <View style={styles.footerRow}>
        <View style={styles.idBadge}>
          <MaterialCommunityIcons name="tag-outline" size={14} color="#888" />
          <Text style={styles.idText}>ID: {item.id.slice(-4)}</Text>
        </View>

        <View style={styles.actionIcons}>
          <IconButton icon="eye-outline" size={18} style={styles.miniIcon} iconColor="#666" />
          <IconButton icon="pencil-outline" size={18} style={styles.miniIcon} iconColor="#666" />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <AppHeader title="Check list" subtitle="Hello, Admin" showBack showNotification />
      
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>Equipment</Text>
          <Button 
            mode="contained" 
            icon="plus" 
            onPress={() => navigation.navigate("AddEquipment")} 
            style={styles.addBtn}
            contentStyle={{ height: 36 }}
            labelStyle={{ fontSize: 12, fontWeight: 'bold' }}
          >
            Add New
          </Button>
        </View>

        <Searchbar
          placeholder="Search equipment..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          elevation={0}
          inputStyle={styles.searchInnerInput}
          iconColor="#888"
        />

        <FlatList
          data={equipmentList.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()))}
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
  rowCenter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  categoryLabel: { fontSize: 11, fontWeight: '700', color: '#666', textTransform: 'uppercase' },
  statusText: { fontSize: 11, fontWeight: '800' },
  equipmentName: { fontSize: 17, fontWeight: '700', color: '#1A1C1E' },
  descriptionText: { fontSize: 13, color: '#777', marginTop: 4, lineHeight: 18 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  idBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  idText: { marginLeft: 6, fontSize: 11, color: '#666' },
  actionIcons: { flexDirection: 'row' },
  miniIcon: { margin: 0, padding: 0, width: 30, height: 30 },
});

export default Equipment;