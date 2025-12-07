import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PRIMARY = "#0C5D5F";
const PRIMARY_DARK = "#0A4A4C";
const CARD_BG = "#F4F7FB";
const LIGHT_BG = "#F8FAFA";
const WHITE = "#FFFFFF";
const MUTED = "#6C7A7A";

export default function SupportScreen() {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hi 👋 I'm Aro Assist. How can I help?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { id: Date.now(), from: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          from: "bot",
          text: "Thanks! Our care team will respond shortly 💚",
        },
      ]);
    }, 700);
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <LinearGradient colors={[PRIMARY, PRIMARY_DARK]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 30 }} />
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>

        {/* FROSTED INTRO CARD */}
        <BlurView intensity={85} tint="light" style={styles.glassHero}>
          <Text style={styles.heroTitle}>How can we help?</Text>
          <Text style={styles.heroSubtitle}>
            Explore support options or chat with Aro Assist.
          </Text>
        </BlurView>

        {/* SECTION: SUPPORT OPTIONS */}
        <Text style={styles.sectionTitle}>Support Options</Text>

        <SupportCard
          icon="help-circle-outline"
          title="FAQs"
          subtitle="Quick answers curated for your health & wellness"
        />

        <SupportCard
          icon="chatbubble-ellipses-outline"
          title="Live Chat"
          subtitle="Connect with our care team instantly"
        />

        <SupportCard
          icon="call-outline"
          title="Call Support"
          subtitle="+91 90876 43210"
        />

        <SupportCard
          icon="mail-outline"
          title="Email Us"
          subtitle="support@arogvo.com"
        />

        {/* DIVIDER */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Aro Assist Chat</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* CHAT WINDOW */}
        <BlurView tint="light" intensity={80} style={styles.chatBox}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.chatBubble,
                msg.from === "user" ? styles.userBubble : styles.botBubble,
              ]}
            >
              <Text
                style={{
                  color: msg.from === "user" ? WHITE : PRIMARY,
                  fontSize: 14,
                }}
              >
                {msg.text}
              </Text>
            </View>
          ))}
        </BlurView>

        {/* CHAT INPUT */}
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.inputRow}>
            <BlurView intensity={60} tint="light" style={styles.inputBlur}>
              <TextInput
                placeholder="Type your message..."
                placeholderTextColor="#8CA3A2"
                style={styles.input}
                value={input}
                onChangeText={setInput}
              />
            </BlurView>

            <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        {/* ABOUT AROGVO */}
        <BlurView tint="light" intensity={90} style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>About Arogvo</Text>
          <Text style={styles.aboutText}>
            Arogvo simplifies healthcare — connecting wellness, doctors,
            reports & preventive care into one seamless experience.
          </Text>

          <View style={styles.aboutRow}>
            <Ionicons name="leaf-outline" size={20} color={PRIMARY} />
            <Text style={styles.aboutRowText}>Smart Wellness Insights</Text>
          </View>

          <View style={styles.aboutRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color={PRIMARY} />
            <Text style={styles.aboutRowText}>Secure Medical Data</Text>
          </View>

          <Text style={styles.aboutContact}>📞 +91 98765 43210</Text>
          <Text style={styles.aboutContact}>📧 support@arogvo.com</Text>
        </BlurView>

      </ScrollView>
    </View>
  );
}

/* CARD COMPONENT */
function SupportCard({ icon, title, subtitle }) {
  return (
    <BlurView intensity={80} tint="light" style={styles.supportCard}>
      <View style={styles.supportIconBox}>
        <Ionicons name={icon} size={26} color={PRIMARY} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.supportTitle}>{title}</Text>
        <Text style={styles.supportSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color={PRIMARY} />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT_BG },

  header: {
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: WHITE, fontSize: 22, fontWeight: "800" },

  /* HERO CARD */
  glassHero: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginBottom: 25,
  },
  heroTitle: { fontSize: 20, fontWeight: "800", color: PRIMARY },
  heroSubtitle: { color: MUTED, marginTop: 5 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: PRIMARY_DARK,
    marginBottom: 14,
  },

  supportCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  supportIconBox: {
    backgroundColor: "#E0F2F1",
    padding: 12,
    borderRadius: 14,
    marginRight: 12,
  },
  supportTitle: { fontSize: 16, fontWeight: "700", color: PRIMARY_DARK },
  supportSubtitle: { fontSize: 12, color: MUTED, marginTop: 2 },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#C0D2D2" },
  dividerText: { marginHorizontal: 10, color: PRIMARY, fontWeight: "700" },

  /* CHAT */
  chatBox: {
    padding: 14,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginBottom: 20,
  },
  chatBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "78%",
  },
  userBubble: { backgroundColor: PRIMARY, alignSelf: "flex-end" },
  botBubble: { backgroundColor: "rgba(255,255,255,0.6)", alignSelf: "flex-start" },

  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 25 },

  inputBlur: {
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  input: { fontSize: 14, color: PRIMARY_DARK },

  sendBtn: {
    padding: 14,
    backgroundColor: PRIMARY,
    borderRadius: 14,
    marginLeft: 10,
  },

  aboutCard: {
    padding: 20,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginBottom: 60,
  },
  aboutTitle: { fontSize: 18, fontWeight: "800", color: PRIMARY_DARK },
  aboutText: { marginTop: 8, lineHeight: 20, color: MUTED },

  aboutRow: { flexDirection: "row", alignItems: "center", marginTop: 14 },
  aboutRowText: { marginLeft: 10, color: PRIMARY_DARK, fontWeight: "600" },

  aboutContact: { marginTop: 12, fontWeight: "700", color: PRIMARY },
});
