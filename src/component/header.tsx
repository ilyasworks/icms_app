import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showNotification = true,
  onNotificationPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.profileRow}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {showNotification && (
        <TouchableOpacity
          style={styles.notification}
          onPress={onNotificationPress}
        >
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#111618"
          />
          <View style={styles.dot} />
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
    elevation: 2,
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
    borderColor: "rgba(16,137,198,0.2)",
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

  notification: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
  },
});
