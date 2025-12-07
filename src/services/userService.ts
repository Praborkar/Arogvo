import { auth, db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const saveUserProfile = async (data: any) => {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  await setDoc(doc(db, "users", uid), data, { merge: true });
};

export const getUserProfile = async () => {
  const uid = auth.currentUser?.uid;
  if (!uid) return null;

  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
};
