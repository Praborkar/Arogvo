import { auth } from "@/config/firebase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

const PRIMARY = "#0C5D5F";
const LIGHT = "#F6FAF9";
const WHITE = "#FFFFFF";
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Home() {
  const navigation = useNavigation();
  const user = auth.currentUser;

  const [activeTab, setActiveTab] = useState("Upcoming");
  const [tipsIndex, setTipsIndex] = useState(0);
  const scrollRef = useRef(null);

  /* ---------- Service Cards Data ---------- */
  const serviceCards = [
    { title: "General Checkup", subtitle: "Regular health scans & checkup", bg: "#EAF4FF", iconBg: "#D5E9FF", icon: "medkit-outline" },
    { title: "Doctor Consultation", subtitle: "Video call or in-clinic consult", bg: "#FFF5E4", iconBg: "#FFE7C6", icon: "chatbubble-ellipses-outline" },
    { title: "Lab Reports", subtitle: "Your test reports in one place", bg: "#F1E9FF", iconBg: "#E1D0FF", icon: "document-text-outline" },
    { title: "Fitness & Lifestyle", subtitle: "Workouts & healthy routines", bg: "#FFECEC", iconBg: "#FFD4D4", icon: "barbell-outline" },
  ];

  /* ---------- Health Tips Data ---------- */
  const tips = [
    {
      title: "Stay Hydrated",
      text: "Drink at least 8 glasses of water daily to stay energetic.",
      img: { uri: "https://images.pexels.com/photos/4425853/pexels-photo-4425853.jpeg" },
    },
    {
      title: "Boost Immunity",
      text: "Eat fruits rich in Vitamin C every morning.",
      img: { uri: "https://images.pexels.com/photos/4050290/pexels-photo-4050290.jpeg" },
    },
    {
      title: "Improve Sleep",
      text: "Avoid screens 1 hour before bedtime.",
      img: { uri: "https://images.pexels.com/photos/935933/pexels-photo-935933.jpeg" },
    },
  ];

  /* ---------- Auto-scroll Tips ---------- */
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (tipsIndex + 1) % tips.length;
      setTipsIndex(nextIndex);

      scrollRef.current?.scrollTo({
        x: nextIndex * (SCREEN_WIDTH - 60),
        animated: true,
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [tipsIndex]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ---------------- HEADER ---------------- */}
      <Animated.View entering={FadeInUp} style={styles.headerWrapper}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu-outline" size={32} color="white" />
          </TouchableOpacity>

          <View>
            <Text style={styles.headerWelcome}>Sehat simplified with</Text>
            <Text style={styles.headerBig}>    Arogvo</Text>
          </View>

          <Image
            source={user?.photoURL ? { uri: user.photoURL } : require("../../assets/images/profile.png")}
            style={styles.avatar}
          />
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#6B7B80" />
          <TextInput
            placeholder="Search health services..."
            placeholderTextColor="#7A8A8F"
            style={styles.searchInput}
          />
        </View>
      </Animated.View>

      {/* ---------------- GRADIENT BANNER ---------------- */}
      <Animated.View entering={FadeInUp.delay(80)} style={styles.gradientBanner}>
        <View style={styles.curve1} />
        <View style={styles.curve2} />

        <View style={{ flex: 1, zIndex: 3 }}>
          <Text style={styles.bannerTitle}>Your Health, One Tap Away!</Text>
          <Text style={styles.bannerSub}>Smart insights & wellness tracking.</Text>

          <TouchableOpacity style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>Explore</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../assets/images/doctor.png")}
          style={styles.bannerDoctor}
          resizeMode="contain"
        />
      </Animated.View>

      {/* ---------------- CATEGORY ---------------- */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Category</Text>
        <Text style={styles.viewAll}>See All</Text>
      </View>

      <View style={styles.serviceChips}>
        <Text style={styles.chip}>General</Text>
        <Text style={styles.chip}>Doctors</Text>
        <Text style={styles.chip}>Fitness</Text>
      </View>

      {/* ---------------- SERVICES GRID ---------------- */}
      <View style={styles.serviceCardGrid}>
        {serviceCards.map((s, i) => (
          <View key={i} style={[styles.serviceCardNew, { backgroundColor: s.bg }]}>
            <View style={[styles.serviceIconWrap, { backgroundColor: s.iconBg }]}>
              <Ionicons name={s.icon} size={26} color={PRIMARY} />
            </View>

            <Text style={styles.serviceTitle}>{s.title}</Text>
            <Text style={styles.serviceSubtitle}>{s.subtitle}</Text>

            <TouchableOpacity style={styles.serviceLearnBtn}>
              <Text style={styles.serviceLearnText}>Check Learn</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* ---------------- AI CONSULTATION (AFTER SERVICES) ---------------- */}
      <View style={styles.aiContainer}>
        <View style={styles.aiGradient}>

          {/* AI Avatar */}
          <View style={styles.aiAvatarWrap}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={styles.aiAvatar}
            />
          </View>

          {/* Text */}
          <Text style={styles.aiTitle}>How are you feeling today?</Text>
          <Text style={styles.aiSubTitle}>Tell Arogvo AI about your symptoms or mood</Text>

          {/* Small Input Box */}
          <View style={styles.aiSmallInput}>
            <TextInput
              placeholder="Type here..."
              placeholderTextColor="#A7B5B5"
              style={styles.aiInputText}
            />
            <Ionicons name="send" size={20} color={PRIMARY} />
          </View>

          {/* Suggestions */}
          <View style={styles.aiSuggestionRow}>
            {["Headache", "Fever", "Stress", "Cough"].map((s, i) => (
              <Text key={i} style={styles.aiChip}>{s}</Text>
            ))}
          </View>

          {/* Buttons */}
          <View style={styles.aiActionRow}>
            
            {/* 🔥 UPDATED MIC BUTTON */}
            <TouchableOpacity style={styles.aiMicBtn}>
              <Ionicons name="mic-outline" size={22} color={PRIMARY} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.aiCameraBtn}>
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

        </View>
      </View>

      {/* ---------------- HEALTH TIPS ---------------- */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Health Tips</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{ paddingLeft: 16 }}
      >
        {tips.map((tip, i) => (
          <View key={i} style={styles.tipCard}>
            <Image source={tip.img} style={styles.tipImage} />
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipText}>{tip.text}</Text>

            <TouchableOpacity style={styles.tipBtn}>
              <Text style={styles.tipBtnText}>Learn more</Text>
              <Ionicons name="chevron-forward" color={WHITE} size={16} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* ---------------- TABS ---------------- */}
      <View style={styles.tabsContainer}>
        {["Upcoming", "Completed", "Cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ---------------- APPOINTMENT LIST ---------------- */}
      {activeTab === "Upcoming" && (
        <>
          {renderAppointment("Dermatology Specialist", "Dr. Rakesh Sharma", "18 Nov 2025", "3:00 PM", "Confirmed")}
          {renderAppointment("Cardiology Specialist", "Dr. Mehta", "20 Nov 2025", "1:30 PM", "Confirmed")}
        </>
      )}

      {activeTab === "Completed" && (
        <>
          {renderAppointment("Physician", "Dr. Tiwari", "10 Nov 2025", "11:00 AM", "Completed")}
        </>
      )}

      {activeTab === "Cancelled" && (
        <>
          {renderAppointment("Orthopedic Specialist", "Dr. Neha Gupta", "12 Nov 2025", "4:00 PM", "Cancelled")}
        </>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

/* ------------------ APPOINTMENT CARD ------------------ */
const renderAppointment = (speciality, doctorName, date, time, status) => (
  <View style={styles.appointmentCard} key={doctorName}>
    <View style={styles.appTopRow}>
      <View>
        <Text style={styles.appSpeciality}>{speciality}</Text>
        <Text style={styles.appDoctor}>{doctorName}</Text>
      </View>

      <Image
        source={require("../../assets/images/doctor.png")}
        style={styles.appAvatar}
      />
    </View>

    <View style={styles.appInfoRow}>
      <Ionicons name="calendar-outline" size={18} color={PRIMARY} />
      <Text style={styles.appInfoText}>{date}</Text>

      <Ionicons name="time-outline" size={18} color={PRIMARY} style={{ marginLeft: 12 }} />
      <Text style={styles.appInfoText}>{time}</Text>

      <Ionicons
        name={status === "Cancelled" ? "close-circle" : "checkmark-circle"}
        size={18}
        color={status === "Cancelled" ? "#C0392B" : "#28A745"}
        style={{ marginLeft: 12 }}
      />

      <Text style={[styles.appConfirmed, status === "Cancelled" && { color: "#C0392B" }]}>
        {status}
      </Text>
    </View>

    <View style={styles.appBtnRow}>
      <TouchableOpacity style={styles.appCancelBtn}>
        <Text style={styles.appCancelText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appRescheduleBtn}>
        <Text style={styles.appRescheduleText}>Reschedule</Text>
      </TouchableOpacity>
    </View>
  </View>
);

/* ------------------ STYLES ------------------ */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT },

  headerWrapper: {
    backgroundColor: "#5b8c80ff",
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerWelcome: { color: "#BFE9E5", fontSize: 10 },
  headerBig: { color: WHITE, fontSize: 19, fontWeight: "800" },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: WHITE,
  },

  searchBar: {
    marginTop: 16,
    backgroundColor: WHITE,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 15,
    color: "#000",
  },

  /* BANNER */
  gradientBanner: {
    marginTop: -15,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 18,
    backgroundColor: "#0C5D5F",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    elevation: 5,
  },

  curve1: {
    position: "absolute",
    width: 180,
    height: 180,
    backgroundColor: "#0F6D72",
    borderRadius: 90,
    top: -40,
    right: -60,
    opacity: 0.5,
  },

  curve2: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#108A8F",
    borderRadius: 60,
    bottom: -30,
    right: -20,
    opacity: 0.4,
  },

  bannerDoctor: {
    width: 120,
    height: 120,
  },

  bannerTitle: { fontSize: 18, fontWeight: "700", color: WHITE },
  bannerSub: { color: "#D9F3F2", fontSize: 13, marginVertical: 8 },

  bannerBtn: {
    backgroundColor: WHITE,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  bannerBtnText: { color: PRIMARY, fontWeight: "700" },

  /* SECTION HEADER */
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginTop: 28,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: PRIMARY,
  },

  viewAll: { color: PRIMARY, fontWeight: "600" },

  /* SERVICE CHIPS */
  serviceChips: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 18,
    marginBottom: 14,
  },

  chip: {
    backgroundColor: "#F2F5F6",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    fontSize: 14,
    color: PRIMARY,
    fontWeight: "500",
  },

  /* SERVICE GRID */
  serviceCardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  serviceCardNew: {
    width: "48%",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },

  serviceIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  serviceTitle: { fontSize: 17, fontWeight: "700", color: PRIMARY },
  serviceSubtitle: { fontSize: 13, color: "#6C7A7A", marginTop: 4 },

  serviceLearnBtn: {
    backgroundColor: WHITE,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginTop: 12,
    elevation: 1,
  },

  serviceLearnText: { fontSize: 13, fontWeight: "700", color: PRIMARY },

  /* AI CONSULTATION */
  aiContainer: { paddingHorizontal: 16, marginTop: 20 },

  aiGradient: {
    borderRadius: 26,
    padding: 20,
    backgroundColor: "#E0F7F6",
    elevation: 3,
  },

  aiAvatarWrap: {
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },

  aiAvatar: { width: 50, height: 50, borderRadius: 25 },

  aiTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: PRIMARY,
    textAlign: "center",
    marginTop: 10,
  },

  aiSubTitle: {
    fontSize: 13,
    color: "#6A7E7E",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
  },

  aiSmallInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#D4E5E5",
  },

  aiInputText: { flex: 1, fontSize: 15, color: PRIMARY },

  aiSuggestionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 14,
    gap: 10,
  },

  aiChip: {
    backgroundColor: WHITE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CFE8E8",
    color: PRIMARY,
    fontSize: 13,
    fontWeight: "600",
  },

  aiActionRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 14,
    marginTop: 18,
  },

  aiMicBtn: {
    backgroundColor: WHITE,
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CFE8E8",
  },

  aiCameraBtn: {
    backgroundColor: PRIMARY,
    padding: 12,
    borderRadius: 14,
  },

  /* TIPS */
  tipCard: {
    width: SCREEN_WIDTH - 60,
    backgroundColor: WHITE,
    padding: 18,
    marginRight: 16,
    borderRadius: 20,
    elevation: 3,
  },

  tipImage: {
    width: "100%",
    height: 130,
    borderRadius: 16,
    marginBottom: 12,
  },

  tipTitle: { fontSize: 18, fontWeight: "700", color: PRIMARY },
  tipText: { fontSize: 14, color: "#6C7A7A", marginTop: 6 },

  tipBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    backgroundColor: PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
    borderRadius: 12,
  },

  tipBtnText: { color: WHITE, fontWeight: "700", marginRight: 4 },

  /* TABS */
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#E7F3F3",
    marginHorizontal: 16,
    padding: 6,
    borderRadius: 14,
    marginTop: 20,
    marginBottom: 10,
  },

  tabBtn: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  tabBtnActive: { backgroundColor: PRIMARY },
  tabText: { color: PRIMARY, fontSize: 15, fontWeight: "600" },
  tabTextActive: { color: WHITE, fontWeight: "700" },

  /* APPOINTMENTS */
  appointmentCard: {
    backgroundColor: WHITE,
    padding: 18,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
  },

  appTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },

  appSpeciality: { fontSize: 13, color: "#6C7A7A" },
  appDoctor: { fontSize: 18, fontWeight: "700", color: PRIMARY, marginTop: 3 },

  appAvatar: { width: 50, height: 50, borderRadius: 25 },

  appInfoRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },

  appInfoText: { fontSize: 14, fontWeight: "600", color: PRIMARY, marginLeft: 4 },

  appConfirmed: { fontSize: 14, fontWeight: "700", color: "#28A745", marginLeft: 4 },

  appBtnRow: { flexDirection: "row", marginTop: 16 },

  appCancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#D0D7D7",
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
  },

  appCancelText: { color: PRIMARY, fontSize: 15, fontWeight: "600" },

  appRescheduleBtn: {
    flex: 1,
    backgroundColor: PRIMARY,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 10,
  },

  appRescheduleText: { color: WHITE, fontSize: 15, fontWeight: "700" },
});
