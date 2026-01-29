import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../Services/AuthService";
import { storage } from "../../Store/Storage";

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const { mutate: loginUser, isPending } = useLogin();

  const handleLogin = async () => {
    await loginUser(
      { email, password },
      {
        onSuccess: async (res: any) => {
          console.log("Login Success:", res?.data);
          await storage.set("token", res?.data?.accessToken);
          await storage.set("user", res?.data?.user);
          navigation.replace("Main-tab");
        },
        onError: (err: any) => {
          alert("Invalid credentials!");
          console.log("Login Error:", err);
        },
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.inner}>
          <View style={styles.logoContainer}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons
                name="shield-check"
                size={48}
                color="#0A9D8E"
              />
            </View>
            <View style={styles.dotDecoration} />
          </View>

          <View style={styles.textSection}>
            <Text style={styles.title}>Welcome to ICMS</Text>
            <Text style={styles.subtitle}>
              Safety & Inspection Management System
            </Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              label="Email Address"
              value={email}
              mode="outlined"
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              outlineStyle={styles.outline}
              activeOutlineColor="#0A9D8E"
              placeholder="admin@inspection.com"
            />

            <TextInput
              label="Password"
              value={password}
              mode="outlined"
              secureTextEntry={secure}
              onChangeText={setPassword}
              style={styles.input}
              outlineStyle={styles.outline}
              activeOutlineColor="#0A9D8E"
              right={
                <TextInput.Icon
                  icon={secure ? "eye-off" : "eye"}
                  onPress={() => setSecure(!secure)}
                  color="#999"
                />
              }
            />

            <TouchableOpacity style={styles.forgot}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              mode="contained"
              style={styles.loginButton}
              contentStyle={{ height: 50 }}
              labelStyle={styles.buttonLabel}
              onPress={handleLogin}
              loading={isPending}
              disabled={isPending}
              elevation={0}
            >
              Sign In
            </Button>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>v1.0.2 © 2026 Inspection Corp</Text>
            <View style={styles.helpRow}>
              <Text style={styles.footerText}>Having trouble? </Text>
              <TouchableOpacity>
                <Text style={styles.helpLink}>Contact Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 25,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E6F5F4", // Very light teal
    justifyContent: "center",
    alignItems: "center",
  },
  dotDecoration: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#0A9D8E",
    borderWidth: 3,
    borderColor: "#FFF",
  },
  textSection: {
    alignItems: "center",
    marginBottom: 35,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1A1C1E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#FFF",
  },
  outline: {
    borderRadius: 12, // Consistent with your other screens
  },
  forgot: {
    alignItems: "flex-end",
    marginBottom: 25,
  },
  forgotText: {
    color: "#0A9D8E",
    fontWeight: "700",
    fontSize: 13,
  },
  loginButton: {
    borderRadius: 12,
    backgroundColor: "#0A9D8E",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
  helpRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  helpLink: {
    fontSize: 12,
    color: "#0A9D8E",
    fontWeight: "700",
  },
});

export default LoginScreen;