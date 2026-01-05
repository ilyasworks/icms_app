import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppHeader from "../component/header";

const ChecklistScreen = () => {
  return (
    <>
      <AppHeader
        title="Check list"
        subtitle="Hello, Admin"
        onNotificationPress={() => alert("Notifications")}
      />
      <View style={styles.container}>

        <Text style={styles.text}>Checklist Screen</Text>
      </View>
    </>
  );
};

export default ChecklistScreen;

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
