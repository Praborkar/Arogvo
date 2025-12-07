import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  primary: "#0C5D5F",
  primaryDark: "#083D40",
  white: "#FFFFFF",
  grey: "#8A8A8A",
  bg: "#F4F7F8",
};

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Settings</Text>
      </LinearGradient>

      {/* PROFILE CARD (Glass) */}
      <BlurView intensity={50} tint="light" style={styles.profileCard}>
        <Image
          source={require("../../assets/images/profile.png")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.profileName}>Prabor Kar</Text>
          <Text style={styles.profileEmail}>praborkar@example.com</Text>
        </View>
      </BlurView>

      {/* SECTION 1 */}
      <View style={styles.section}>
        <SettingRow
          icon="person-outline"
          title="Account"
        />
        <SettingRow
          icon="notifications-outline"
          title="Notifications"
          right={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ true: COLORS.primary, false: "#C8C8C8" }}
            />
          }
        />
        <SettingRow
          icon="moon-outline"
          title="Dark Mode"
          right={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ true: COLORS.primary, false: "#C8C8C8" }}
            />
          }
        />
        <SettingRow
          icon="eye-outline"
          title="Appearance"
        />
      </View>

      {/* SECTION 2 */}
      <View style={styles.section}>
        <SettingRow
          icon="lock-closed-outline"
          title="Privacy & Security"
        />
        <SettingRow
          icon="headset-outline"
          title="Help & Support"
        />
        <SettingRow
          icon="information-circle-outline"
          title="About"
        />
        <SettingRow
          icon="log-out-outline"
          title="Logout"
          color="#D64545"
        />
      </View>

    </View>
  );
}

/* ---------------- COMPONENT ---------------- */

const SettingRow = ({ title, icon, right, color }) => (
  <TouchableOpacity style={styles.row}>
    <View style={styles.rowLeft}>
      <Ionicons name={icon} size={21} color={color || "#1F2D2E"} />
      <Text style={[styles.rowText, color && { color }]}>{title}</Text>
    </View>

    {right ? (
      right
    ) : (
      <Ionicons name="chevron-forward" size={18} color="#999" />
    )}
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  /* HEADER */
  header: {
    paddingTop: 55,
    paddingBottom: 38,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.white,
  },

  /* PROFILE CARD */
  profileCard: {
    marginTop: -20,
    marginHorizontal: 18,
    padding: 34,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 1)",
    overflow: "hidden",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 30,
    marginRight: 12,
  },
  profileName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0C3A3C",
  },
  profileEmail: {
    fontSize: 13,
    color: COLORS.grey,
  },

  /* SECTION CARD */
  section: {
    marginTop: 20,
    marginHorizontal: 18,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  /* SETTING ROW */
  row: {
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  rowText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1F2D2E",
  },
});
