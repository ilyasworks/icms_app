import { Text, View, StyleSheet } from 'react-native';
import AppHeader from '../component/header';

const FirScreen = () => {
  return (
    <>
      <AppHeader
        title="FIR"
        subtitle="Hello, Admin"
        onNotificationPress={() => alert("Notifications")}
      />
      <View style={styles.container}>
        <Text style={styles.text}>FIR Screen</Text>
      </View>
    </>
  );
};

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

export default FirScreen;