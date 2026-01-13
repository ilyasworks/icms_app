import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showNotification?: boolean;
  onNotificationPress?: () => void;
  showBack?: boolean; // ✅ NEW
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showNotification = true,
  onNotificationPress,
  showBack = false,
}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <View style={styles.profileRow}>
        {/* BACK BUTTON */}
        {showBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color="#111618"
            />
          </TouchableOpacity>
        )}

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
    backgroundColor: "#ffffffff",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
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
  backButton: {
  marginRight: 6,
}

});
