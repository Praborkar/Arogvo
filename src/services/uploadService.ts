import { auth, storage } from "@/config/firebase";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.canceled) return result.assets[0].uri;
  return null;
};

export const uploadProfileImage = async (uri: string) => {
  const uid = auth.currentUser?.uid;
  if (!uid) return null;

  const response = await fetch(uri);
  const blob = await response.blob();

  const imageRef = ref(storage, `profiles/${uid}.jpg`);
  await uploadBytes(imageRef, blob);

  return await getDownloadURL(imageRef);
};
