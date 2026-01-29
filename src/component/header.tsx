import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { IMAGE_URL } from "../../Services/AxiosInstances";
import { storage } from "../../Store/Storage";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
}) => {
  const navigation = useNavigation<any>();
  const [userData, setUserData] = React.useState<any>(null);

  const getUserData = async () => {
    const data = await storage.get("user");
    setUserData(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.contentRow}>
        
        {/* LEFT SIDE: Navigation + Title Group */}
        <View style={styles.leftGroup}>
          {showBack && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Feather name="chevron-left" size={26} color="#1A1C1E" />
            </TouchableOpacity>
          )}
          
          <View style={styles.textWrapper}>
            <Text style={styles.titleText}>{title}</Text>
            {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
          </View>
        </View>

        {/* RIGHT SIDE: Profile Action-Ring */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          activeOpacity={0.8}
          style={styles.profileRing}
        >
          <Image
            source={
              userData?.profileImage
                ? { uri: IMAGE_URL + userData?.profileImage }
                : require("../assets/boy.png")
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "ios" ? 55 : 20,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F9FA",
    // Subtle lift
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textWrapper: {
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1C1E",
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0A9D8E", // Brand color for subtitle
    marginTop: -2,
  },
  profileRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 2,
    borderWidth: 1.5,
    borderColor: "#0A9D8E",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F5F9",
  },
});

export default AppHeader;