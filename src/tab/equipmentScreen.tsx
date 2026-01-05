import React from "react";
import { View, Text, StyleSheet } from "react-native";
import App from "../../App";
import AppHeader from "../component/header";

const EquipmentScreen = () => {
  return (
    <>
      <AppHeader
        title="Equipment"
        subtitle="Hello, Admin"
        onNotificationPress={() => alert("Notifications")}
      />
      <View style={styles.container}>
        <Text style={styles.text}>Equipment Screen</Text>
      </View>
    </>
  );
};

export default EquipmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
