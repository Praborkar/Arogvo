import { auth } from "@/config/firebase";
import { useGoogleAuth } from "@/services/googleAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
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

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { promptAsync, request } = useGoogleAuth();

  // Local Logo
  const loginLogo = require("../../assets/images/arogvo_logo1.png");

  // ========================= LOGIN USER =========================
  async function loginUser() {
    if (!email || !password) {
      setErrorMsg("Email & password required");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // 🔥 Save Remember Me flag
      if (remember) {
        await AsyncStorage.setItem("remember_me", "true");
      } else {
        await AsyncStorage.removeItem("remember_me");
      }

      router.replace("/(drawer)/home");
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  }
  // ===============================================================

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {/* HEADER WITH LOGO */}
      <LinearGradient colors={["#A1FFCE", "#FAFFD1"]} style={styles.gradient}>
        <Image source={loginLogo} style={styles.illustration} />
      </LinearGradient>

      {/* SIGN-IN CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Enter your details to proceed further</Text>

        {/* Email */}
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="email-outline" size={20} color="#4A7864" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#7BAA9A"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="lock-outline" size={22} color="#4A7864" />
          <TextInput
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#7BAA9A"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>

        {/* Remember me */}
        <TouchableOpacity
          onPress={() => setRemember(!remember)}
          style={styles.rememberRow}
        >
          <View style={[styles.checkbox, remember && styles.checkboxSelected]} />
          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>

        {/* ERROR MESSAGE */}
        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        {/* SIGN IN BUTTON */}
        <TouchableOpacity style={styles.loginBtn} onPress={loginUser}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        {/* GOOGLE */}
        <TouchableOpacity
          disabled={!request}
          onPress={() => promptAsync()}
          style={styles.socialBtn}
        >
          <MaterialCommunityIcons name="google" size={20} color="#4A7864" />
          <Text style={styles.socialText}>Sign In with Google</Text>
        </TouchableOpacity>

        {/* APPLE */}
        <TouchableOpacity style={styles.socialBtn}>
          <MaterialCommunityIcons name="apple" size={22} color="#4A7864" />
          <Text style={styles.socialText}>Sign In with Apple</Text>
        </TouchableOpacity>

        {/* SIGN UP NAV */}
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.signup}>
            Don't have an account?{" "}
            <Text style={{ fontWeight: "700", color: "#4A7864" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: 290,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 1,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  illustration: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: "contain",
  },

  card: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    padding: 22,
    borderRadius: 28,
    marginTop: -55,
    elevation: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2F4F41",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: "#6E8C7A",
    marginBottom: 20,
  },

  inputBox: {
    flexDirection: "row",
    backgroundColor: "#F3FBF8",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1E8DE",
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#2F4F41",
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 6,
    borderWidth: 1.4,
    borderColor: "#6AAC96",
    marginRight: 8,
  },

  checkboxSelected: {
    backgroundColor: "#6AAC96",
  },

  rememberText: {
    fontSize: 13,
    color: "#4A7864",
  },

  loginBtn: {
    backgroundColor: "#4A7864",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  orText: {
    textAlign: "center",
    color: "#6E8C7A",
    marginTop: 20,
    marginBottom: 10,
  },

  socialBtn: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D1E8DE",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },

  socialText: {
    color: "#4A7864",
    fontSize: 15,
  },

  signup: {
    marginTop: 10,
    textAlign: "center",
    color: "#6B908A",
    fontSize: 14,
  },

  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 13,
    textAlign: "center",
  },
});
