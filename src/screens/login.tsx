import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const handleLogin = () => {
    // later you can add API validation here
    navigation.replace("Main-tab"); 
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {/* Icon */}
      <View style={styles.iconWrapper}>
        <MaterialCommunityIcons
          name="shield-check"
          size={42}
          color="#1089c6"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Sign in to ICMS</Text>
      <Text style={styles.subtitle}>
        Manage inspections and certificates.
      </Text>

      {/* Card */}
      <View style={styles.card}>
        <TextInput
          label="Email Address"
          value={email}
          mode="outlined"
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          label="Password"
          value={password}
          mode="outlined"
          secureTextEntry={secure}
          onChangeText={setPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={secure ? "eye-off" : "eye"}
              onPress={() => setSecure(!secure)}
            />
          }
        />

        <TouchableOpacity style={styles.forgot}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          style={styles.button}
          contentStyle={{ height: 48 }}
          onPress={handleLogin}
        >
          Log In
        </Button>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        v1.0.2 © 2024 Inspection Corp
      </Text>

      <TouchableOpacity>
        <Text style={styles.helpText}>Need Help?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: "#e7f3fa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111618",
  },
  subtitle: {
    fontSize: 14,
    color: "#617c89",
    marginBottom: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 14,
  },
  forgot: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  forgotText: {
    color: "#1089c6",
    fontWeight: "600",
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#1089c6",
  },
  footerText: {
    marginTop: 24,
    fontSize: 12,
    color: "#617c89",
  },
  helpText: {
    marginTop: 10,
    color: "#1089c6",
    fontWeight: "600",
  },
});
