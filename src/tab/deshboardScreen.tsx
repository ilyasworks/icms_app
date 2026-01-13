import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Text, Surface } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../component/header";

const metrics = [
  { icon: "clipboard-check-outline", label: "Inspections", value: "1,240", color: "#0A9D8E" },
  { icon: "certificate-outline", label: "Certificates", value: "850", color: "#6366F1" },
  { icon: "account-group-outline", label: "Inspectors", value: "12", color: "#F59E0B" },
  { icon: "crane", label: "Equipment", value: "340", color: "#EC4899" },
];

const quickActions = [
  { icon: "crane", label: "Equipment", screen: "Equipment" },
  { icon: "file-certificate-outline", label: "Certificates", screen: "Certificates" },
  { icon: "format-list-checks", label: "Checklist", screen: "Checklist" },
  { icon: "shield-search", label: "Verify", screen: "Verify" },
  { icon: "qrcode-scan", label: "FIR Scan", screen: "FIR" }
];

const activities = [
  { icon: "clock-fast", title: "Inspection #1024", subtitle: "A. Smith • 2m ago", status: "Pending", color: "#F59E0B" },
  { icon: "check-decagram", title: "Certificate #884", subtitle: "B. Jones • 1h ago", status: "Approved", color: "#0A9D8E" },
  { icon: "alert-circle-outline", title: "Inspection #992", subtitle: "Admin • 5h ago", status: "Rejected", color: "#EF4444" },
];

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="Check list"
        subtitle="Hello, Admin"
        showNotification={true}
        onNotificationPress={() => {}}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        
        {/* ===== WELCOME SECTION ===== */}
        {/* <View style={styles.welcomeSection}>
           <Text style={styles.headerTitle}>System Overview</Text>
           <Text style={styles.headerSubtitle}>Real-time monitoring & management</Text>
        </View> */}

        {/* ===== METRICS GRID ===== */}
        <View style={styles.grid}>
          {metrics.map(item => (
            <Surface key={item.label} style={styles.metricCard} elevation={1}>
              <View style={[styles.metricIconBox, { backgroundColor: `${item.color}15` }]}>
                <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
              </View>
              <View>
                <Text style={styles.metricValue}>{item.value}</Text>
                <Text style={styles.metricLabel}>{item.label}</Text>
              </View>
            </Surface>
          ))}
        </View>

        {/* ===== QUICK ACTIONS (Horizontal) ===== */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.quickActionsContainer}
        >
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionItem}
              onPress={() => navigation.navigate(action.screen)}
            >
              <Surface style={styles.actionSurface} elevation={2}>
                <MaterialCommunityIcons name={action.icon as any} size={26} color="#0A9D8E" />
              </Surface>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ===== RECENT ACTIVITY ===== */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Certificates")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityList}>
          {activities.map((item, i) => (
            <TouchableOpacity key={i} style={styles.activityCard}>
              <View style={[styles.activityIconCircle, { backgroundColor: `${item.color}15` }]}>
                <MaterialCommunityIcons name={item.icon as any} size={20} color={item.color} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: `${item.color}15` }]}>
                 <Text style={[styles.statusText, { color: item.color }]}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  welcomeSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A1C1E",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  metricIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "800",
    color: '#1A1C1E',
  },
  metricLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1A1C1E",
  },
  viewAllText: {
    color: "#0A9D8E",
    fontWeight: "700",
    fontSize: 14,
  },
  quickActionsContainer: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  actionItem: {
    alignItems: "center",
    marginRight: 20,
  },
  actionSurface: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444",
  },
  activityList: {
    paddingHorizontal: 20,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  activityIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: '#1A1C1E',
  },
  activitySubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: 'uppercase',
  },
});