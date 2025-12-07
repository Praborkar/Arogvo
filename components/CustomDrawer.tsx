import { auth } from "@/config/firebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Link, usePathname, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { logout } from "../app/(auth)/logout";

/* ================= COLOR PALETTE ================= */
const COLORS = {
  primary: "#0C5D5F",
  primaryLight: "rgba(12, 93, 95, 0.1)", 
  bg: "#FFFFFF",
  textDark: "#1E293B",
  textMuted: "#64748B",
  border: "#F1F5F9",
  danger: "#EF4444",
  white: "#FFFFFF",
  whiteMuted: "rgba(255, 255, 255, 0.8)",
};

export default function CustomDrawer(props) {
  const user = auth.currentUser;
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    await logout();
    props.navigation.closeDrawer();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      
      {/* ================= HEADER SECTION ================= */}
      <View style={[styles.headerContainer, { paddingTop: insets.top + 20 }]}>
        
        <View style={styles.decorativeCircle} />

        <View style={styles.profileRow}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                user?.photoURL
                  ? { uri: user.photoURL }
                  : require("../assets/images/profile.png")
              }
              style={styles.avatar}
            />
            <Link href="/(drawer)/profile" asChild>
              <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
                <Ionicons name="pencil" size={12} color={COLORS.primary} />
              </TouchableOpacity>
            </Link>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>
              {user?.displayName || "Guest User"}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {user?.email || "home@gmail.com"}
            </Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active Member</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ================= MENU SECTION ================= */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuWrapper}>
          <Text style={styles.sectionTitle}>MAIN MENU</Text>

          {DrawerItem("/(drawer)/home", "Home", pathname, "grid-outline")}
          {DrawerItem("/(drawer)/explore", "Explore", pathname, "compass-outline")}
          {DrawerItem("/(drawer)/appointments", "Appointments", pathname, "calendar-clear-outline")}
          {DrawerItem("/(drawer)/reports", "Medical Reports", pathname, "clipboard-outline")}
        </View>

        <View style={styles.separator} />

        <View style={styles.menuWrapper}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>

          {DrawerItem("/(drawer)/settings", "Settings", pathname, "options-outline")}
          {DrawerItem("/(drawer)/modal", "Help & Support", pathname, "headset-outline")}
        </View>
      </DrawerContentScrollView>

      {/* ================= FOOTER ================= */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.9}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Arogvo v1.0.0</Text>
      </View>
    </View>
  );
}

/* ================= DRAWER ITEM COMPONENT ================= */
function DrawerItem(href, label, pathname, icon) {
  const active = pathname === href;

  return (
    <Link href={href} asChild key={href}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.menuItem,
          active && styles.menuItemActive,
          { marginBottom: 14 } // 🔥 ADD GLOBAL SPACING FOR EACH ITEM
        ]}
      >
        <View style={styles.menuItemRow}>
          <Ionicons
            name={icon}
            size={22}
            color={active ? COLORS.primary : COLORS.textMuted}
            style={styles.menuIcon}
          />
          <Text style={[styles.menuLabel, active && styles.menuLabelActive]}>
            {label}
          </Text>
        </View>

        {active && (
           <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
        )}
      </TouchableOpacity>
    </Link>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  /* HEADER */
  headerContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingBottom: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
    position: "relative",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  editBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.white,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.whiteMuted,
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: '600',
  },

  /* MENU ITEMS */
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  menuWrapper: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1.2,
    marginBottom: 10,
    paddingHorizontal: 12,
    marginTop: 8,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  menuItemActive: {
    backgroundColor: COLORS.primaryLight,
  },
  menuItemRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: COLORS.textMuted,
  },
  menuLabelActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  separator: {
    height: 10,
    backgroundColor: COLORS.border,
    marginHorizontal: 24,
    marginVertical: 16,
  },

  /* FOOTER */
  footer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: COLORS.bg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#e21010ff",
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: "#000000ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
    marginLeft: 8,
  },
  versionText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 15,
    color: "#000000ff",
  },
});
