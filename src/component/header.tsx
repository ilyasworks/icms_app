import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
  showBack?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showNotification = true,
  onNotificationPress,
  showBack = false,
}) => {
  const navigation = useNavigation<any>();

  const handleNotificationClick = () => {
    console.log("Notification Bell Pressed!"); // Check your terminal/metro bundler for this!
    
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      Alert.alert(
        "System Notifications",
        "You have no new alerts at this time.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.profileRow}>
        {showBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Makes it easier to click
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#111618" />
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          onPress={() => {
            console.log("Avatar Pressed");
            navigation.navigate("Profile");
          }}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {showNotification && (
        <TouchableOpacity
          style={styles.notificationTouchArea}
          onPress={handleNotificationClick}
          activeOpacity={0.6}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} // Expands the clickable area
        >
          <View pointerEvents="none"> 
            <MaterialCommunityIcons
              name="bell-outline"
              size={26}
              color="#111618"
            />
            <View style={styles.dot} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 45,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000, // Ensures header stays on top
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(10, 157, 142, 0.2)",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111618",
  },
  subtitle: {
    fontSize: 12,
    color: "#617c89",
    fontWeight: "500",
  },
  notificationTouchArea: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    // Adding a background color temporarily helps you see if it's clickable
    // backgroundColor: 'rgba(0,0,0,0.05)', 
    borderRadius: 22,
  },
  dot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: "#ef4444",
    borderWidth: 1.5,
    borderColor: "#FFF",
  },
  backButton: {
    marginRight: 6,
  }
});