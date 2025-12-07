import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PRIMARY = "#0C5D5F";
const BG = "#F6F7FB";
const WHITE = "#FFFFFF";

/* -------------------- MOCK DATA -------------------- */

const SPECIALITIES = [
  { id: "derm", name: "Dermatology", icon: "color-palette-outline", color: "#FCE7F3" },
  { id: "cardio", name: "Cardiology", icon: "heart-outline", color: "#FEE2E2" },
  { id: "ortho", name: "Orthopedic", icon: "medkit-outline", color: "#DBEAFE" },
  { id: "pedia", name: "Pediatrics", icon: "happy-outline", color: "#FEF9C3" },
  { id: "neuro", name: "Neurology", icon: "brain-outline", color: "#EDE9FE" },
];

const DOCTORS = [
  {
    id: "1",
    specialityId: "derm",
    name: "Dr. Kavita Sharma",
    role: "Dermatologist",
    rating: 4.8,
    reviews: 120,
    experience: "8 yrs",
    img: require("../../assets/images/doctor.png"),
    fees: "₹700",
    type: "Video & In-clinic",
  },
  {
    id: "2",
    specialityId: "derm",
    name: "Dr. Aman Verma",
    role: "Cosmetic Dermatologist",
    rating: 4.7,
    reviews: 86,
    experience: "6 yrs",
    img: require("../../assets/images/doctor.png"),
    fees: "₹650",
    type: "Video only",
  },
  {
    id: "3",
    specialityId: "cardio",
    name: "Dr. Rohan Iyer",
    role: "Cardiologist",
    rating: 4.9,
    reviews: 204,
    experience: "10 yrs",
    img: require("../../assets/images/doctor.png"),
    fees: "₹900",
    type: "In-clinic",
  },
  {
    id: "4",
    specialityId: "ortho",
    name: "Dr. Sakshi Sinha",
    role: "Orthopedic Surgeon",
    rating: 4.8,
    reviews: 97,
    experience: "7 yrs",
    img: require("../../assets/images/doctor.png"),
    fees: "₹800",
    type: "Video & In-clinic",
  },
];

const TIME_SECTIONS: { label: string; slots: string[] }[] = [
  { label: "Morning", slots: ["8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM"] },
  { label: "Afternoon", slots: ["12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM"] },
  { label: "Evening", slots: ["4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"] },
];

/* -------------------- UTIL HELPERS -------------------- */

function getNext7Days() {
  const days: { key: string; day: string; date: string; fullLabel: string }[] = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const day = dayNames[d.getDay()];
    const dateNum = d.getDate();
    const month = monthNames[d.getMonth()];
    days.push({
      key: d.toISOString(),
      day,
      date: String(dateNum),
      fullLabel: `${day}, ${dateNum} ${month}`,
    });
  }
  return days;
}

/* -------------------- SCREEN -------------------- */

export default function DoctorBookingScreen() {
  const [selectedSpeciality, setSelectedSpeciality] = useState("derm");
  const [selectedDoctorId, setSelectedDoctorId] = useState("1");
  const [selectedDayKey, setSelectedDayKey] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const days = useMemo(() => getNext7Days(), []);
  const doctors = useMemo(
    () => DOCTORS.filter((d) => d.specialityId === selectedSpeciality),
    [selectedSpeciality]
  );
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  // ensure selected doctor matches speciality
  React.useEffect(() => {
    if (!doctors.find((d) => d.id === selectedDoctorId) && doctors[0]) {
      setSelectedDoctorId(doctors[0].id);
    }
  }, [doctors]);

  const selectedDayLabel =
    days.find((d) => d.key === selectedDayKey)?.fullLabel || "Select date";
  const canBook = selectedDoctor && selectedDayKey && selectedSlot;

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <View style={styles.headerWrapper}>
        <Text style={styles.headerTitle}>Appointment</Text>
        <Text style={styles.headerSubtitle}>
          Choose a specialist, pick a doctor, then select your date & time.
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* SPECIALITIES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialities</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 6 }}
          >
            {SPECIALITIES.map((sp) => {
              const active = sp.id === selectedSpeciality;
              return (
                <TouchableOpacity
                  key={sp.id}
                  style={[
                    styles.specialityChip,
                    { backgroundColor: sp.color },
                    active && styles.specialityChipActive,
                  ]}
                  onPress={() => setSelectedSpeciality(sp.id)}
                >
                  <View style={styles.specialityIconCircle}>
                    <Ionicons
                      name={sp.icon as any}
                      size={18}
                      color={active ? PRIMARY : "#4B5563"}
                    />
                  </View>
                  <Text
                    style={[
                      styles.specialityText,
                      active && { color: PRIMARY, fontWeight: "700" },
                    ]}
                  >
                    {sp.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* DOCTORS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doctors</Text>
          {doctors.map((doc) => {
            const active = doc.id === selectedDoctorId;
            return (
              <TouchableOpacity
                key={doc.id}
                style={[styles.docCard, active && styles.docCardActive]}
                onPress={() => setSelectedDoctorId(doc.id)}
              >
                <View style={styles.docLeft}>
                  <Image source={doc.img} style={styles.docImage} />
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={styles.docName}>{doc.name}</Text>
                    <Text style={styles.docRole}>{doc.role}</Text>

                    <View style={styles.docMetaRow}>
                      <Ionicons name="star" size={14} color="#F59E0B" />
                      <Text style={styles.docMetaText}>
                        {doc.rating} • {doc.reviews} reviews
                      </Text>
                    </View>
                    <View style={styles.docMetaRow}>
                      <Ionicons name="briefcase-outline" size={14} color="#6B7280" />
                      <Text style={styles.docMetaText}>{doc.experience} experience</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.docRight}>
                  <Text style={styles.feeText}>{doc.fees}</Text>
                  <Text style={styles.feeSubText}>{doc.type}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DATE PICKER */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 6 }}
          >
            {days.map((d) => {
              const active = d.key === selectedDayKey;
              return (
                <TouchableOpacity
                  key={d.key}
                  style={[styles.dayCard, active && styles.dayCardActive]}
                  onPress={() => setSelectedDayKey(d.key)}
                >
                  <Text
                    style={[
                      styles.dayName,
                      active && { color: PRIMARY, fontWeight: "700" },
                    ]}
                  >
                    {d.day}
                  </Text>
                  <Text
                    style={[
                      styles.dayDate,
                      active && { color: PRIMARY, fontWeight: "700" },
                    ]}
                  >
                    {d.date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* TIME SLOTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          {TIME_SECTIONS.map((sec) => (
            <View key={sec.label} style={{ marginBottom: 14 }}>
              <Text style={styles.timeSectionLabel}>{sec.label}</Text>
              <View style={styles.slotRow}>
                {sec.slots.map((slot) => {
                  const active = slot === selectedSlot;
                  return (
                    <TouchableOpacity
                      key={slot}
                      style={[styles.slotChip, active && styles.slotChipActive]}
                      onPress={() => setSelectedSlot(slot)}
                    >
                      <Text
                        style={[
                          styles.slotText,
                          active && { color: PRIMARY, fontWeight: "700" },
                        ]}
                      >
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM SUMMARY & CTA */}
      <View style={styles.bottomBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bottomTitle}>
            {selectedDoctor ? selectedDoctor.name : "Select a doctor"}
          </Text>
          <Text style={styles.bottomSub}>
            {selectedDayLabel} • {selectedSlot || "Select time"}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.bookBtnMain, !canBook && { opacity: 0.5 }]}
          disabled={!canBook}
          onPress={() => {
            // TODO: integrate booking API / Firestore here
            console.log("Book:", {
              doctor: selectedDoctor?.name,
              date: selectedDayLabel,
              slot: selectedSlot,
            });
          }}
        >
          <Text style={styles.bookBtnMainText}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F9F7",
  },

  /* HEADER */
  headerWrapper: {
    paddingTop: Platform.OS === "android" ? 55 : 70,
    paddingBottom: 22,
    paddingHorizontal: 20,
    backgroundColor: "#0C5D5F",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.4,
  },
  headerSubtitle: {
    marginTop: 8,
    color: "#E4F4F3",
    fontSize: 14,
    opacity: 0.85,
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 22,
  },

  /* SECTION TITLES */
  section: { marginBottom: 26 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#163D3B",
    marginBottom: 10,
    letterSpacing: 0.2,
  },

  /* SPECIALITY CHIPS */
  specialityChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  specialityChipActive: {
    borderWidth: 1.8,
    borderColor: PRIMARY,
    backgroundColor: "#E8F7F7",
    shadowColor: PRIMARY,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  specialityIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 50,
    backgroundColor: "#FFFFFFCC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  specialityText: {
    fontSize: 14,
    color: "#4A5F5C",
    fontWeight: "600",
  },

  /* DOCTOR CARDS */
  docCard: {
    backgroundColor: WHITE,
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  docCardActive: {
    borderWidth: 2,
    borderColor: "#0C5D5F",
    backgroundColor: "#F0FBFA",
    shadowColor: "#0C5D5F",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 7,
  },
  docLeft: { flexDirection: "row", flex: 1 },

  docImage: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: "#EAF3F2",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  docName: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0C5D5F",
  },
  docRole: {
    fontSize: 13,
    color: "#6B7E7A",
    marginTop: 3,
  },

  /* META ROW */
  docMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  docMetaText: {
    marginLeft: 6,
    fontSize: 12.5,
    color: "#4A5F5C",
    fontWeight: "600",
  },

  /* RIGHT SIDE */
  docRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  feeText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0C5D5F",
  },
  feeSubText: {
    fontSize: 12,
    color: "#7C8F8C",
    marginTop: 4,
    maxWidth: 100,
    textAlign: "right",
  },

  /* DATE PICKER */
  dayCard: {
    width: 62,
    height: 78,
    borderRadius: 18,
    backgroundColor: WHITE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  dayCardActive: {
    borderWidth: 2,
    borderColor: PRIMARY,
    backgroundColor: "#E6F8F8",
    shadowColor: PRIMARY,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 6,
  },
  dayName: {
    fontSize: 13,
    color: "#6C7E7C",
  },
  dayDate: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "900",
    color: "#1B3C3A",
  },

  /* TIME SLOTS */
  timeSectionLabel: {
    fontSize: 14,
    color: "#6C7E7C",
    marginBottom: 8,
    fontWeight: "600",
  },
  slotRow: { flexDirection: "row", flexWrap: "wrap" },

  slotChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: WHITE,
    marginRight: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  slotChipActive: {
    borderWidth: 2,
    borderColor: PRIMARY,
    backgroundColor: "#E8F7F7",
    shadowColor: PRIMARY,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  slotText: {
    fontSize: 14,
    color: "#4A5F5C",
    fontWeight: "600",
  },

  /* BOTTOM BAR */
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: WHITE,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  bottomTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#143634",
  },
  bottomSub: {
    marginTop: 4,
    fontSize: 13,
    color: "#6C7E7C",
    fontWeight: "500",
  },

  bookBtnMain: {
    marginLeft: 16,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 50,
    backgroundColor: PRIMARY,
    shadowColor: PRIMARY,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  bookBtnMainText: {
    color: WHITE,
    fontWeight: "800",
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
