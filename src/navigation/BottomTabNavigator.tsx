import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../tab/deshboardScreen";
import FirScreen from "../tab/firScreen";
import EquipmentScreen from "../tab/equipmentScreen";
import ChecklistScreen from "../tab/checkList";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#1589C9",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Dashboard":
              iconName = "home-outline";
              break;
            case "FIR":
              iconName = "document-text-outline";
              break;
            case "Equipment":
              iconName = "construct-outline";
              break;
            case "Checklist":
              iconName = "checkmark-done-outline";
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
      <Tab.Screen name="Equipment" component={EquipmentScreen} />
      <Tab.Screen name="Checklist" component={ChecklistScreen} />
    </Tab.Navigator>
  );
}
