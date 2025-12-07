import { auth } from "@/config/firebase";
import { useGoogleAuth } from "@/services/googleAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

export default function RegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { promptAsync, request } = useGoogleAuth();

  // ⭐ Local Illustration
  const registerIllustration = require("../../assets/images/arogvo_logo1.png");

  async function registerUser() {
    if (!fullName || !email || !password || !confirm) {
      setErrorMsg("All fields are required");
      return;
    }

    if (password !== confirm) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/(drawer)/home");
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  }

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <LinearGradient
        colors={["#A1FFCE", "#FAFFD1"]}
        style={styles.gradient}
      >
        <Image source={registerIllustration} style={styles.illustration} />
      </LinearGradient>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join Arogvo and begin your health journey
        </Text>

        {/* Full Name */}
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="account-outline" size={20} color="#4A7864" />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#7BAA9A"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
        </View>

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

        {/* Confirm Password */}
        <View style={styles.inputBox}>
          <MaterialCommunityIcons name="lock-check-outline" size={22} color="#4A7864" />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            placeholderTextColor="#7BAA9A"
            value={confirm}
            onChangeText={setConfirm}
            style={styles.input}
          />
        </View>

        {/* ERROR */}
        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        {/* SUBMIT BUTTON */}
        <TouchableOpacity style={styles.registerBtn} onPress={registerUser}>
          <Text style={styles.registerText}>Create Account</Text>
        </TouchableOpacity>

        {/* OR */}
        <Text style={styles.orText}>Or</Text>

        {/* GOOGLE BUTTON */}
        <TouchableOpacity
          disabled={!request}
          onPress={() => promptAsync()}
          style={styles.socialBtn}
        >
          <MaterialCommunityIcons name="google" size={20} color="#4A7864" />
          <Text style={styles.socialText}>Sign Up with Google</Text>
        </TouchableOpacity>

        {/* APPLE BUTTON */}
        <TouchableOpacity style={styles.socialBtn}>
          <MaterialCommunityIcons name="apple" size={22} color="#4A7864" />
          <Text style={styles.socialText}>Sign Up with Apple</Text>
        </TouchableOpacity>

        {/* LOGIN LINK */}
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text style={styles.loginLink}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "700", color: "#4A7864" }}>Sign In</Text>
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
    padding: 20,
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

  registerBtn: {
    backgroundColor: "#4A7864",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },

  registerText: {
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

  loginLink: {
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
