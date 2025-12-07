import { auth } from "@/config/firebase";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "423564587252-mij0t3q74qs8gbvbtb8rd6n8u0165m4d.apps.googleusercontent.com",
    androidClientId:
      "423564587252-mij0t3q74qs8gbvbtb8rd6n8u0165m4d.apps.googleusercontent.com",
    iosClientId:
      "423564587252-mij0t3q74qs8gbvbtb8rd6n8u0165m4d.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication!;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential).catch((e) =>
        console.log("Google login error:", e)
      );
    }
  }, [response]);

  return { promptAsync, request };
}
