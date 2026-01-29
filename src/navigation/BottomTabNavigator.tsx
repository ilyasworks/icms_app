import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../tab/deshboardScreen";
import FirScreen from "../screens/FIR/firScreen";
import EquipmentScreen from "../tab/equipmentScreen";
import ChecklistScreen from "../tab/checkList";
import UserProfileScreen from "../screens/UserManagment/UserManagement";
import VerifyScreen from "../screens/Verify/verify";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0A9D8E", // Updated Active Color
        tabBarInactiveTintColor: "#8E8E93",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Dashboard":
              iconName = "grid-outline"; // Updated Icon
              break;
            case "FIR":
              iconName = "document-text-outline";
              break;
            case "Profile":
              iconName = "person-outline"; // Updated Icon
              break;
            case "Verify":
              iconName = "checkmark-done"; // Updated Icon
              break;
            default:
              iconName = "ellipse-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="FIR" component={FirScreen} />
      <Tab.Screen name="Verify" component={VerifyScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}