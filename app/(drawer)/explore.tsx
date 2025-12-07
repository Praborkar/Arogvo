import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// ----------------------------------------------------
// DATA
// ----------------------------------------------------

const DOCTOR_APPOINTMENTS = [
  {
    id: 1,
    name: "Dr. Kavita Sharma",
    role: "Dermatologist",
    rating: 4.8,
    reviews: 87,
    nextSlot: "Today • 10:30 AM",
    featured: true,
    img: require("../../assets/images/doctor.png"),
  },
  {
    id: 2,
    name: "Dr. Aman Verma",
    role: "Orthopedic Surgeon",
    rating: 4.7,
    reviews: 65,
    nextSlot: "Today • 11:15 AM",
    featured: false,
    img: require("../../assets/images/doctor.png"),
  },
  {
    id: 3,
    name: "Dr. Tanvi Rao",
    role: "Cardiologist",
    rating: 4.9,
    reviews: 120,
    nextSlot: "Today • 12:00 PM",
    featured: false,
    img: require("../../assets/images/doctor.png"),
  },
  {
    id: 4,
    name: "Dr. Rohan Mehta",
    role: "General Physician",
    rating: 4.6,
    reviews: 54,
    nextSlot: "Tomorrow • 09:00 AM",
    featured: false,
    img: require("../../assets/images/doctor.png"),
  },
];

const HOSPITALS = [
  {
    id: 1,
    name: "Arogvo City Hospital",
    rating: 4.8,
    distance: "1.2 km",
    img: require("../../assets/images/hospital.png"),
  },
  {
    id: 2,
    name: "Sunrise Multi-Speciality",
    rating: 4.6,
    distance: "3.5 km",
    img: require("../../assets/images/hospital.png"),
  },
  {
    id: 3,
    name: "GreenLife Care Center",
    rating: 4.4,
    distance: "2.1 km",
    img: require("../../assets/images/hospital.png"),
  },
];

const NEWSLETTERS = [
  {
    id: 1,
    title: "5 science-backed ways to improve sleep",
    date: "2 days ago",
    img: require("../../assets/images/news.png"),
  },
  {
    id: 2,
    title: "How AI is changing medical diagnosis",
    date: "1 week ago",
    img: require("../../assets/images/news.png"),
  },
];

const TRENDS = [
  { title: "AI in Radiology", icon: "sparkles-outline" },
  { title: "Robotic Surgeries", icon: "hardware-chip-outline" },
  { title: "Wearable Diagnostics", icon: "watch-outline" },
  { title: "Telemedicine Growth", icon: "wifi-outline" },
  { title: "Smart Health Monitoring", icon: "pulse-outline" },
];

// ----------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------

export default function Explore() {
  return (
    <LinearGradient colors={["#2F7A6E", "#2F7A6E"]} style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ---------------- HEADER ---------------- */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.menuBtn}>
              <Ionicons name="menu" size={26} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Explore</Text>

            <TouchableOpacity style={styles.profileBtn}>
              <Image
                source={require("../../assets/images/profile.png")}
                style={styles.profileImg}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ---------------- MAIN CONTENT AREA ---------------- */}
        <View style={styles.bodyArea}>

          {/* ==================================== */}
          {/*              DOCTORS GRID            */}
          {/* ==================================== */}

          <Text style={styles.sectionTitle}>Doctors & Appointments</Text>

          <View style={styles.doctorGrid}>
            {DOCTOR_APPOINTMENTS.map((doc) => (
              <View
                key={doc.id}
                style={[styles.docCard, doc.featured && styles.docCardFeatured]}
              >
                <View style={styles.docTopRow}>
                  <Image source={doc.img} style={styles.docAvatar} />

                  <View style={styles.docInfo}>
                    <Text
                      numberOfLines={1}
                      style={[styles.docName, doc.featured && styles.docNameFeatured]}
                    >
                      {doc.name}
                    </Text>

                    <Text
                      numberOfLines={1}
                      style={[styles.docRole, doc.featured && styles.docRoleFeatured]}
                    >
                      {doc.role}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.docArrowCircle,
                      doc.featured && styles.docArrowCircleFeatured,
                    ]}
                  >
                    <Ionicons name="chevron-forward" size={18} color="#0F6155" />
                  </View>
                </View>

                <View style={styles.docRatingRow}>
                  <View style={styles.docRatingLeft}>
                    <Ionicons
                      name="star"
                      size={14}
                      color={doc.featured ? "#FFE58B" : "#FFC65C"}
                    />
                    <Text
                      style={[styles.docRatingText, doc.featured && styles.docRatingTextFeatured]}
                    >
                      {doc.rating}
                    </Text>
                  </View>

                  <Text
                    style={[styles.docReviewText, doc.featured && styles.docReviewTextFeatured]}
                  >
                    {doc.reviews} reviews
                  </Text>
                </View>

                <View
                  style={[styles.nextSlotPill, doc.featured && styles.nextSlotPillFeatured]}
                >
                  <Ionicons name="time-outline" size={14} color="#0F6155" />
                  <Text
                    numberOfLines={1}
                    style={[styles.nextSlotText, doc.featured && styles.nextSlotTextFeatured]}
                  >
                    {doc.nextSlot}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* ==================================== */}
          {/*              HOSPITALS               */}
          {/* ==================================== */}

          <Text style={styles.sectionTitle}>Hospitals Near You</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {HOSPITALS.map((h) => (
              <View key={h.id} style={styles.hospitalCard}>
                <Image source={h.img} style={styles.hospitalImg} />

                <Text numberOfLines={1} style={styles.hospitalName}>
                  {h.name}
                </Text>

                <View style={styles.hospitalMeta}>
                  <Ionicons name="star" size={14} color="#FFCB3B" />
                  <Text style={styles.hospitalText}>{h.rating}</Text>

                  <Ionicons name="location-outline" size={14} color="#0F6155" />
                  <Text style={styles.hospitalText}>{h.distance}</Text>
                </View>

                <TouchableOpacity style={styles.hospitalBtn}>
                  <Text style={styles.hospitalBtnText}>View Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* ==================================== */}
          {/*         PREMIUM NEWSLETTER           */}
          {/* ==================================== */}

          <Text style={styles.sectionTitle}>Medical Newsletter</Text>

          {NEWSLETTERS.map((n) => (
            <View key={n.id} style={styles.newsCardPremium}>
              <Image source={n.img} style={styles.newsImgPremium} />

              <View style={{ flex: 1 }}>
                <Text numberOfLines={2} style={styles.newsTitlePremium}>
                  {n.title}
                </Text>

                <Text style={styles.newsDatePremium}>{n.date}</Text>

                <TouchableOpacity style={styles.readMorePill}>
                  <Text style={styles.readMorePillText}>Read More →</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* ==================================== */}
          {/*      PREMIUM MEDICATION REMINDER     */}
          {/* ==================================== */}

          <Text style={styles.sectionTitle}>Medication Reminder</Text>

          <LinearGradient
            colors={["#C8FFF0", "#92E6D5"]}
            style={styles.medCardPremium}
          >
            <View style={styles.medLeftIcon}>
              <Ionicons name="alarm-outline" size={26} color="#0F6155" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.medTitlePremium}>Morning Medicines</Text>
              <Text style={styles.medSubtitlePremium}>
                Vitamin D & BP tablet • 8:00 AM daily
              </Text>
            </View>

            <TouchableOpacity style={styles.medEditBtn}>
              <Text style={styles.medEditText}>Edit</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* ==================================== */}
          {/*       PREMIUM EMERGENCY CARD         */}
          {/* ==================================== */}

          <Text style={styles.sectionTitle}>Emergency Helpline</Text>

          <LinearGradient
            colors={["#FF7B7B", "#FF4D4D"]}
            style={styles.emergencyPremium}
          >
            <View style={styles.emIconBadge}>
              <Ionicons name="alert-outline" size={22} color="#FF4D4D" />
            </View>

            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.emTitlePremium}>Need urgent help?</Text>
              <Text style={styles.emSubPremium}>
                Call 108 or Arogvo emergency line
              </Text>
            </View>

            <TouchableOpacity style={styles.emCallBtn}>
              <Text style={styles.emCallText}>Call Now</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* ==================================== */}
          {/*         PREMIUM ABOUT SECTION        */}
          {/* ==================================== */}

          <View style={styles.footerPremium}>
            <View style={styles.footerBadge}>
              <Ionicons name="leaf-outline" size={22} color="#0F6155" />
            </View>

            <Text style={styles.footerTitlePremium}>About Arogvo App</Text>

            <Text style={styles.footerDescPremium}>
              Arogvo simplifies healthcare with doctor bookings, reminders,
              trusted content, and organised wellness tracking — all in one
              clean, modern experience.
            </Text>

            <Text style={styles.footerBrandPremium}>
              Sehat Simplified • Team Arogvo
            </Text>
          </View>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// ----------------------------------------------------
// STYLES
// ----------------------------------------------------

const CARD_GAP = 14;
const DOC_CARD_WIDTH = (width - 20 * 2 - CARD_GAP) / 2;

const styles = StyleSheet.create({

  screen: { flex: 1 },

  // ---------------- HEADER ----------------
  headerContainer: {
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#2F7A6E",
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  profileBtn: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.18)",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  profileImg: { width: "100%", height: "100%", borderRadius: 16 },

  // ---------------- BODY ----------------
  bodyArea: {
    backgroundColor: "#F5FAF8",
    paddingHorizontal: 20,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#06383A",
    marginBottom: 12,
  },

  // ----------------------------------------------------
  // DOCTOR GRID
  // ----------------------------------------------------

  doctorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  docCard: {
    width: DOC_CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 12,
    marginBottom: CARD_GAP,
  },

  docCardFeatured: {
    backgroundColor: "#0AA189",
  },

  docTopRow: { flexDirection: "row", alignItems: "center" },

  docAvatar: { width: 40, height: 40, borderRadius: 16 },

  docInfo: { flex: 1, marginLeft: 8 },

  docName: { fontSize: 13, fontWeight: "800", color: "#062A2F" },

  docNameFeatured: { color: "#FFFFFF" },

  docRole: { fontSize: 11, color: "#066B71", marginTop: 2 },

  docRoleFeatured: { color: "rgba(255,255,255,0.9)" },

  docArrowCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#E5F4F0",
    alignItems: "center",
    justifyContent: "center",
  },

  docArrowCircleFeatured: { backgroundColor: "#FFFFFF" },

  docRatingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },

  docRatingLeft: { flexDirection: "row", alignItems: "center" },

  docRatingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "700",
    color: "#0F6155",
  },

  docRatingTextFeatured: { color: "#FFFFFF" },

  docReviewText: { fontSize: 11, color: "#7A8B88" },

  docReviewTextFeatured: { color: "rgba(255,255,255,0.9)" },

  nextSlotPill: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: "#E4F3EF",
    paddingVertical: 6,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  nextSlotPillFeatured: { backgroundColor: "#FFFFFF" },

  nextSlotText: {
    marginLeft: 6,
    fontSize: 11,
    fontWeight: "600",
    color: "#0F6155",
  },

  nextSlotTextFeatured: { color: "#0F6155" },

  // ----------------------------------------------------
  // HOSPITALS
  // ----------------------------------------------------

  hospitalCard: {
    width: 210,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    marginRight: 14,
  },

  hospitalImg: { width: "100%", height: 110, borderRadius: 16 },

  hospitalName: {
    fontWeight: "800",
    fontSize: 14,
    color: "#062A2F",
    marginTop: 10,
  },

  hospitalMeta: { flexDirection: "row", alignItems: "center", marginTop: 6 },

  hospitalText: {
    marginRight: 10,
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#0F6155",
  },

  hospitalBtn: {
    marginTop: 10,
    backgroundColor: "#0F6155",
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: "center",
  },

  hospitalBtnText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },

  // ----------------------------------------------------
  // PREMIUM NEWSLETTER
  // ----------------------------------------------------

  newsCardPremium: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#C8EDE5",
    shadowColor: "#0F6155",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },

  newsImgPremium: {
    width: 85,
    height: 85,
    borderRadius: 16,
    marginRight: 12,
  },

  newsTitlePremium: {
    fontSize: 16,
    fontWeight: "800",
    color: "#06383A",
  },

  newsDatePremium: {
    marginTop: 4,
    fontSize: 12,
    color: "#5A6A67",
  },

  readMorePill: {
    marginTop: 8,
    backgroundColor: "#DFF7F1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  readMorePillText: {
    color: "#0F6155",
    fontWeight: "700",
    fontSize: 12,
  },

  // ----------------------------------------------------
  // PREMIUM TRENDS
  // ----------------------------------------------------

  trendGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },

  trendPremiumCard: {
    width: "48%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    marginRight: "4%",
    flexDirection: "row",
    alignItems: "center",
  },

  trendPremiumText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#0F6155",
  },

  // ----------------------------------------------------
  // PREMIUM MEDICATION REMINDER
  // ----------------------------------------------------

  medCardPremium: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 22,
    marginBottom: 20,
    shadowColor: "#0F6155",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  medLeftIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  medTitlePremium: {
    fontWeight: "800",
    fontSize: 16,
    color: "#06383A",
  },

  medSubtitlePremium: {
    marginTop: 4,
    fontSize: 12,
    color: "#0F6155",
    opacity: 0.85,
  },

  medEditBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#06483C",
    borderRadius: 14,
  },

  medEditText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },

  // ----------------------------------------------------
  // PREMIUM EMERGENCY
  // ----------------------------------------------------

  emergencyPremium: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 22,
    marginBottom: 20,
    shadowColor: "#FF4D4D",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 4,
  },

  emIconBadge: {
    width: 45,
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  emTitlePremium: {
    fontWeight: "800",
    fontSize: 17,
    color: "#FFFFFF",
  },

  emSubPremium: {
    fontSize: 13,
    color: "#FFFFFF",
    opacity: 0.9,
    marginTop: 3,
  },

  emCallBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
  },

  emCallText: {
    color: "#FF3B3B",
    fontWeight: "800",
    fontSize: 13,
  },

  // ----------------------------------------------------
  // PREMIUM FOOTER
  // ----------------------------------------------------

  footerPremium: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 20,
    borderRadius: 22,
    marginTop: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CFEDE5",
  },

  footerBadge: {
    width: 50,
    height: 50,
    backgroundColor: "#E7F7F2",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  footerTitlePremium: {
    fontSize: 18,
    fontWeight: "800",
    color: "#06383A",
  },

  footerDescPremium: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
    color: "#0F6155",
    lineHeight: 20,
  },

  footerBrandPremium: {
    marginTop: 12,
    fontWeight: "700",
    fontSize: 13,
    color: "#0F6155",
  },
});
