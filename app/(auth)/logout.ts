import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.log("Logout Error:", error);
  }
};
