import React from "react";
import { Provider as PaperProvider, Portal } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/login";

import CertificatesScreen from "../screens/Certificate managment/CertificateScreen";
import Checklist from "../screens/Checklist/Checklist";
import Equipment from "../screens/Equipment/Equipment";
import VerifyScreen from "../screens/Verify/verify";
import AddEquipmentScreen from "../screens/Equipment/AddEquipement";
import AddChecklist from "../screens/Checklist/AddChecklist";
import AddCertificate from "../screens/Certificate managment/AddCertificate";
// import AddFIRScreen from "../tab/AddFirScreen";
import FIR from "../tab/firScreen";
import AddFIRScreen from "../tab/AddFirScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
     <PaperProvider>
      <Portal.Host>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Main Tabs */}
        <Stack.Screen name="Main-tab" component={BottomTabNavigator} />

        {/* Stack Screens */}
        <Stack.Screen name="Certificates" component={CertificatesScreen} />
        <Stack.Screen name="AddCertificate" component={AddCertificate} options={{ title: "Add Certificate" }} />
        <Stack.Screen name="Checklist" component={Checklist} />
        <Stack.Screen name="AddChecklist" component={AddChecklist}  />
        <Stack.Screen name="Equipment" component={Equipment} />
        <Stack.Screen name="AddEquipment" component={AddEquipmentScreen} />
        <Stack.Screen name="Verify" component={VerifyScreen} />
        <Stack.Screen name="AddFIR" component={AddFIRScreen} />
        <Stack.Screen name="FIR" component={FIR} />

      </Stack.Navigator>
    </NavigationContainer>
      </Portal.Host>
    </PaperProvider>
  );
}
