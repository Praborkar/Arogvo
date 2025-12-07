import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import doctorImg from "../../assets/images/doctor.png";
import profilePic from "../../assets/images/profile.png";

/* ---------------------------------------------------
   FOLDER DATA (pastel theme)
--------------------------------------------------- */
const FOLDERS = [
  {
    id: 1,
    title: "X-Ray",
    files: "15 files",
    size: "20.3 MB",
    bg: "#E8F1FF",
    color: "#2563EB",
  },
  {
    id: 2,
    title: "Diagnostics",
    files: "5 files",
    size: "17.5 MB",
    bg: "#FFE8EA",
    color: "#E11D48",
  },
  {
    id: 3,
    title: "Med Reports",
    files: "27 files",
    size: "32.4 MB",
    bg: "#F2EAFE",
    color: "#8B5CF6",
  },
  {
    id: 4,
    title: "Blood Tests",
    files: "25 files",
    size: "25.6 MB",
    bg: "#FFF4D6",
    color: "#F59E0B",
  },
];

/* ---------------------------------------------------
   RECENT REPORTS
--------------------------------------------------- */
const RECENT = [
  {
    id: 1,
    title: "Cardiologist Consultation",
    doctor: "Dr. Omary Fahim",
    date: "Nov 03, 2023",
    color: "#FF7C7C",
  },
  {
    id: 2,
    title: "Neurologist Checkup",
    doctor: "Dr. Meera Khanna",
    date: "Oct 12, 2023",
    color: "#F97316",
  },
];

/* ---------------------------------------------------
   VITALS
--------------------------------------------------- */
const VITALS = [
  { label: "Heart Rate", value: "72", unit: "BPM", icon: "heart" },
  { label: "SpO2 Level", value: "99", unit: "%", icon: "water" },
  { label: "Blood Sugar", value: "150", unit: "mg/dL", icon: "analytics" },
  { label: "BMI Rate", value: "20.1", unit: "kg/m²", icon: "body" },
];

export default function ReportScreen() {
  const renderFolder = ({ item }) => (
    <View style={styles.folderCard}>
      <View style={[styles.folderIcon, { backgroundColor: item.bg }]}>
        <MaterialCommunityIcons name="folder" size={22} color={item.color} />
      </View>

      <Text style={styles.folderTitle}>{item.title}</Text>
      <Text style={styles.folderFiles}>{item.files}</Text>

      <View style={styles.folderFooter}>
        <Text style={styles.folderSize}>{item.size}</Text>
        <Ionicons name="ellipsis-vertical" size={16} color="#6B7775" />
      </View>
    </View>
  );

  const renderReport = (item) => (
    <View key={item.id} style={styles.reportRow}>
      <View style={[styles.reportIcon, { backgroundColor: item.color + "22" }]}>
        <Ionicons name="document-text" color={item.color} size={20} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <Text style={styles.reportDoctor}>{item.doctor}</Text>
        <Text style={styles.reportDate}>{item.date}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#0F6155" />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical Records</Text>
        <Image source={profilePic} style={styles.profileImg} />
      </View>

      {/* ---------------- SEARCH ---------------- */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#6B7775" />
        <TextInput
          placeholder="Search report…"
          placeholderTextColor="#6B7775"
          style={styles.searchInput}
        />
      </View>

      {/* ---------------- FOLDER SECTION ---------------- */}
      <Text style={styles.sectionTitle}>Record Categories</Text>

      <FlatList
        data={FOLDERS}
        renderItem={renderFolder}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.folderRow}
        scrollEnabled={false}
      />

      {/* ---------------- RECENT REPORTS ---------------- */}
      <Text style={styles.sectionTitle}>Recent Reports</Text>
      {RECENT.map(renderReport)}

      {/* ---------------- DOCTOR CARD ---------------- */}
      <Text style={styles.sectionTitle}>Consulting Doctor</Text>

      <View style={styles.doctorCard}>
        <Image source={doctorImg} style={styles.doctorImg} />
        <View>
          <Text style={styles.doctorName}>Dr. Omary Fahim</Text>
          <Text style={styles.doctorSpec}>Cardiologist Specialist</Text>
        </View>
      </View>

      {/* ---------------- VITAL SECTION ---------------- */}
      <Text style={styles.sectionTitle}>Health Summary</Text>

      <View style={styles.vitalGrid}>
        {VITALS.map((v) => (
          <View key={v.label} style={styles.vitalCard}>
            <Ionicons name={v.icon} size={22} color="#0F6155" />
            <Text style={styles.vitalLabel}>{v.label}</Text>
            <Text style={styles.vitalValue}>
              {v.value} <Text style={styles.vitalUnit}>{v.unit}</Text>
            </Text>
          </View>
        ))}
      </View>

      {/* ---------------- FOOTER SPACING ---------------- */}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF4F2", // premium mint background
  },

  /* ---------- HEADER ---------- */
  header: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    // Soft gradient effect illusion
    backgroundColor: "#2F7A6E",
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    shadowColor: "#1B4D47",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  profileImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  /* ---------- SEARCH ---------- */
  searchBox: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#2F7A6E",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,

    marginTop: -20, // pull upward like homepage
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
    color: "#06383A",
  },

  /* ---------- SECTION TITLE ---------- */
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#06383A",
    marginTop: 12,
    marginBottom: 14,
    marginHorizontal: 20,
  },

  /* ---------- FOLDER GRID ---------- */
  folderRow: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  folderCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,

    shadowColor: "#2F7A6E",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  folderIcon: {
    width: 48,
    height: 48,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  folderTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#06383A",
    marginBottom: 4,
  },
  folderFiles: {
    fontSize: 12,
    color: "#6B7775",
  },
  folderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  folderSize: {
    fontSize: 12,
    color: "#6B7775",
  },

  /* ---------- REPORT LIST ---------- */
  reportRow: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 22,
    marginHorizontal: 20,
    marginBottom: 16,

    shadowColor: "#2F7A6E",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,

    flexDirection: "row",
    alignItems: "center",
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  reportTitle: { fontSize: 15, fontWeight: "800", color: "#06383A" },
  reportDoctor: { fontSize: 12, color: "#6B7775", marginTop: 2 },
  reportDate: { fontSize: 12, color: "#0F6155", marginTop: 2 },

  /* ---------- DOCTOR CARD ---------- */
  doctorCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 22,
    marginHorizontal: 20,
    marginBottom: 20,

    shadowColor: "#2F7A6E",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,

    flexDirection: "row",
    alignItems: "center",
  },
  doctorImg: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 16,
  },
  doctorName: { fontSize: 16, fontWeight: "800", color: "#06383A" },
  doctorSpec: { fontSize: 12, color: "#6B7775", marginTop: 2 },

  /* ---------- VITALS ---------- */
  vitalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  vitalCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 18,

    shadowColor: "#2F7A6E",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  vitalLabel: {
    color: "#6B7775",
    marginTop: 6,
    fontSize: 12,
  },
  vitalValue: {
    color: "#06383A",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 4,
  },
  vitalUnit: {
    color: "#6B7775",
    fontSize: 12,
    fontWeight: "600",
  },
});

