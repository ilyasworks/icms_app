import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../component/header";

const metricData = [
  {
    icon: "clipboard-check",
    label: "Total Inspections",
    value: "1,240",
    color: "#1089c6",
  },
  {
    icon: "certificate",
    label: "Certificates Issued",
    value: "850",
    color: "#7c3aed",
  },
  {
    icon: "account-group",
    label: "Inspectors",
    value: "12",
    color: "#f97316",
  },
  {
    icon: "tools",
    label: "Equipment",
    value: "340",
    color: "#14b8a6",
  },
];

const quickActions = [
  { icon: "account-plus", label: "Add User"
    , primary: false
   },
  { icon: "plus-circle", label: "Equipment" },
  { icon: "file-document", label: "Template" },
  { icon: "chart-bar", label: "Reports" },
  { icon: "shield-check", label: "Verify" },
];

const activities = [
  {
    icon: "clock-outline",
    title: "Inspection #1024",
    subtitle: "Submitted by A. Smith • 2m ago",
    status: "Pending",
    color: "#f59e0b",
  },
  {
    icon: "check-circle",
    title: "Certificate #884",
    subtitle: "Verified by B. Jones • 1h ago",
    status: "Approved",
    color: "#22c55e",
  },
  {
    icon: "close-circle",
    title: "Inspection #992",
    subtitle: "Reviewed by Admin • 5h ago",
    status: "Rejected",
    color: "#ef4444",
  },
];

const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
        <AppHeader
    title="Dashboard"
    subtitle="Hello, Admin"
    onNotificationPress={() => alert("Notifications")}
  />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= METRICS ================= */}
        <View style={styles.grid}>
          {metricData.map((item) => (
            <View key={item.label} style={styles.metricCard}>
              <View
                style={[
                  styles.metricIcon,
                  { backgroundColor: `${item.color}20` },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>
              <Text style={styles.metricValue}>{item.value}</Text>
              <Text style={styles.metricLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* ================= QUICK ACTIONS ================= */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActions}
        >
          {quickActions.map((item) => (
            <TouchableOpacity key={item.label} style={styles.action}>
              <View
                style={[
                  styles.actionCircle,
                  item.primary && styles.primaryAction,
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color={item.primary ? "#fff" : "#1089c6"}
                />
              </View>
              <Text style={styles.actionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ================= RECENT ACTIVITY ================= */}
        <View style={styles.activityHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>

        <View style={styles.activityList}>
          {activities.map((item, index) => (
            <View key={index} style={styles.activityCard}>
              <View
                style={[
                  styles.activityIcon,
                  { backgroundColor: `${item.color}20` },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={20}
                  color={item.color}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySubtitle}>
                  {item.subtitle}
                </Text>
              </View>

              <Text
                style={[
                  styles.activityStatus,
                  { color: item.color },
                ]}
              >
                {item.status}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },

  metricCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  metricValue: {
    fontSize: 20,
    fontWeight: "700",
  },

  metricLabel: {
    fontSize: 13,
    color: "#617c89",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 12,
  },

  quickActions: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  action: {
    alignItems: "center",
    marginRight: 18,
  },

  actionCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  primaryAction: {
    backgroundColor: "#1089c6",
  },

  actionText: {
    fontSize: 12,
  },

  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
  },

  viewAll: {
    color: "#1089c6",
    fontWeight: "600",
    fontSize: 13,
  },

  activityList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  activitySubtitle: {
    fontSize: 12,
    color: "#617c89",
  },

  activityStatus: {
    fontSize: 11,
    fontWeight: "700",
  },
});
