import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const profileLocalImage = require("../../assets/images/profile.png");
const { width } = Dimensions.get("window");

/* ------------------- THEME PALETTE ------------------- */
const COLORS = {
  primary: "#0C5D5F",
  primaryDark: "#053032", // Slightly darker for better gradient contrast
  accent: "#16A3A3",
  bg: "#F8F9FA",
  card: "#FFFFFF",
  textDark: "#1E293B",
  textMuted: "#64748B",
  border: "#E2E8F0",
  danger: "#EF4444",
  dangerBg: "#FEF2F2",
  inputBg: "#F1F5F9",
};

const INITIAL_PROFILE = {
  name: "Prabor Kar",
  age: "22",
  gender: "Male",
  bloodGroup: "O+",
  height: "172 cm",
  weight: "68 kg",
  medicalId: "MED-8839-22-IN",
  phone: "+91 99999 99999",
  email: "prabork@gmail.com",
  allergies: "Peanuts, Penicillin",
  chronic: "None reported",
  medications: "None",
};

export default function ProfileScreenMedical() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(INITIAL_PROFILE);

  const toggleEdit = () => setEditing((prev) => !prev);
  
  const handleChange = (key, val) => {
    setData((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* ---------------- PREMIUM HEADER ---------------- */}
      <View style={styles.headerWrapper}>
        <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.header, { paddingTop: insets.top }]}
        >
            {/* Decorative Background Elements for Premium Feel */}
            <View style={styles.decoCircleLarge} />
            <View style={styles.decoCircleSmall} />

            {/* NAV BAR */}
            <View style={styles.navBar}>
                <TouchableOpacity 
                    onPress={() => router.back()} 
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} 
                    style={styles.iconButton}
                >
                    <Ionicons name="chevron-back" size={26} color="#FFF" />
                </TouchableOpacity>
                
                <Text style={styles.headerTitle}>Profile</Text>

                <TouchableOpacity 
                    onPress={toggleEdit} 
                    style={[styles.editBtn, editing && styles.editBtnActive]}
                >
                    <Text style={[styles.editBtnText, editing && styles.editBtnTextActive]}>
                    {editing ? "Done" : "Edit"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* IDENTITY SECTION */}
            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <Image source={profileLocalImage} style={styles.avatar} />
                    {editing && (
                    <View style={styles.cameraIcon}>
                        <Ionicons name="camera" size={12} color="#FFF" />
                    </View>
                    )}
                </View>
                
                <View style={styles.identityContent}>
                    <Text style={styles.userName}>{data.name}</Text>
                    <View style={styles.idBadge}>
                        <Ionicons name="qr-code-outline" size={12} color="rgba(255,255,255,0.8)" style={{marginRight: 4}}/>
                        <Text style={styles.idLabel}>{data.medicalId}</Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
      </View>

      {/* ---------------- SCROLLABLE CONTENT ---------------- */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        >
          
          {/* VITALS CARDS (Floating) */}
          <View style={styles.vitalsRow}>
            <VitalCard 
              icon="water" 
              label="Blood" 
              value={data.bloodGroup} 
              color={COLORS.danger} 
              editing={editing}
              onChange={(t) => handleChange("bloodGroup", t)}
            />
            <VitalCard 
              icon="body" 
              label="Height" 
              value={data.height} 
              color={COLORS.primary} 
              editing={editing}
              onChange={(t) => handleChange("height", t)}
            />
             <VitalCard 
              icon="barbell" 
              label="Weight" 
              value={data.weight} 
              color={COLORS.textDark} 
              editing={editing}
              onChange={(t) => handleChange("weight", t)}
            />
          </View>

          {/* PERSONAL INFO */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>CONTACT & PERSONAL</Text>
            <View style={styles.card}>
              <InfoRow 
                icon="call-outline" 
                label="Phone" 
                value={data.phone} 
                editing={editing}
                onChange={(t) => handleChange("phone", t)}
              />
              <Divider />
              <InfoRow 
                icon="mail-outline" 
                label="Email" 
                value={data.email} 
                editing={editing}
                onChange={(t) => handleChange("email", t)}
              />
              <Divider />
              <View style={styles.rowSplit}>
                <View style={{ flex: 1 }}>
                    <InfoRow 
                    icon="calendar-outline" 
                    label="Age" 
                    value={data.age} 
                    editing={editing}
                    onChange={(t) => handleChange("age", t)}
                    noBorder
                  />
                </View>
                <View style={{ width: 1, backgroundColor: COLORS.border, marginHorizontal: 10 }} />
                <View style={{ flex: 1 }}>
                  <InfoRow 
                    icon="person-outline" 
                    label="Gender" 
                    value={data.gender} 
                    editing={editing}
                    onChange={(t) => handleChange("gender", t)}
                    noBorder
                  />
                </View>
              </View>
            </View>
          </View>

          {/* MEDICAL CONDITIONS */}
          <View style={styles.sectionContainer}>
             <Text style={styles.sectionTitle}>MEDICAL HISTORY</Text>
             <View style={styles.card}>
                
                {/* Allergies (Highlighted) */}
                <View style={styles.allergyContainer}>
                    <View style={styles.allergyHeader}>
                        <Ionicons name="warning" size={18} color={COLORS.danger} />
                        <Text style={styles.allergyTitle}>ALLERGIES</Text>
                    </View>
                    {editing ? (
                        <TextInput 
                            style={styles.textArea} 
                            value={data.allergies}
                            onChangeText={(t) => handleChange("allergies", t)}
                            multiline
                        />
                    ) : (
                        <Text style={styles.allergyText}>{data.allergies}</Text>
                    )}
                </View>

                <Divider />

                <InfoRow 
                  icon="medkit-outline" 
                  label="Chronic Conditions" 
                  value={data.chronic} 
                  editing={editing}
                  onChange={(t) => handleChange("chronic", t)}
                />
                <Divider />
                <InfoRow 
                  icon="flask-outline" 
                  label="Current Medications" 
                  value={data.medications} 
                  editing={editing}
                  onChange={(t) => handleChange("medications", t)}
                  noBorder
                />
             </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

const Divider = () => <View style={styles.divider} />;

const VitalCard = ({ icon, label, value, color, editing, onChange }) => (
  <View style={styles.vitalCard}>
    <View style={[styles.vitalIconBox, { backgroundColor: color + "15" }]}>
      <Ionicons name={icon} size={18} color={color} />
    </View>
    <Text style={styles.vitalLabel}>{label}</Text>
    {editing ? (
        <TextInput 
            value={value} 
            onChangeText={onChange} 
            style={styles.vitalInput}
            textAlign="center"
        />
    ) : (
        <Text style={[styles.vitalValue, { color }]}>{value}</Text>
    )}
  </View>
);

const InfoRow = ({ icon, label, value, editing, onChange, noBorder }) => (
  <View style={[styles.infoRow, noBorder && { borderBottomWidth: 0 }]}>
    <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={20} color={COLORS.textMuted} />
    </View>
    <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        {editing ? (
            <TextInput 
                value={value} 
                onChangeText={onChange} 
                style={styles.inputField} 
            />
        ) : (
            <Text style={styles.infoValue}>{value}</Text>
        )}
    </View>
  </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  
  /* PREMIUM HEADER */
  headerWrapper: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden', // Ensures the gradient and circles clip correctly
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 40, // Extra space for floating cards overlap
    position: 'relative',
  },
  /* Decorative Circles for Glassy Effect */
  decoCircleLarge: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#FFFFFF',
    opacity: 0.08,
  },
  decoCircleSmall: {
    position: 'absolute',
    bottom: 40,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    opacity: 0.05,
  },

  /* NAV BAR */
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 10,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  editBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  editBtnActive: {
    backgroundColor: "#FFF",
    borderColor: "#FFF",
  },
  editBtnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 13,
  },
  editBtnTextActive: {
    color: COLORS.primary,
  },

  /* PROFILE INFO IN HEADER */
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: COLORS.textDark,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  identityContent: {
    marginLeft: 18,
    flex: 1,
  },
  userName: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  idBadge: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  idLabel: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  /* CONTENT */
  scrollContent: {
    paddingHorizontal: 20,
  },
  
  /* VITALS */
  vitalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5, // Pull up to overlap header (floating effect)
    marginBottom: 20,
  },
  vitalCard: {
    backgroundColor: COLORS.card,
    width: "31%",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#0B253A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  vitalIconBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  vitalLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  vitalValue: {
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  vitalInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textDark,
    padding: 0,
    minWidth: 40,
    textAlign: 'center',
  },

  /* SECTIONS */
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.textMuted,
    marginBottom: 12,
    marginLeft: 6,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  rowSplit: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* INFO ROWS */
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  iconWrapper: {
    width: 36,
    alignItems: "flex-start",
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 3,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  infoValue: {
    fontSize: 15,
    color: COLORS.textDark,
    fontWeight: "600",
  },
  inputField: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 4,
  },

  /* ALLERGIES */
  allergyContainer: {
    paddingBottom: 12,
  },
  allergyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  allergyTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.danger,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  allergyText: {
    fontSize: 15,
    color: COLORS.textDark,
    lineHeight: 22,
    fontWeight: "500",
  },
  textArea: {
    backgroundColor: COLORS.dangerBg,
    color: COLORS.danger,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    fontWeight: "500",
    minHeight: 70,
    textAlignVertical: 'top',
  },
});